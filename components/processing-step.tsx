"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Upload, Brain, Sparkles, BarChart3, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProcessFiles, useStatusPolling, useProductData } from "@/lib/queries"

interface ProcessingStepProps {
  files: File[]
  description: string
  category: string
  platform: string
  onComplete: (results: any) => void
}

const processingSteps = [
  {
    id: "upload",
    title: "Uploading Images",
    description: "Securely uploading your product images to cloud storage",
    icon: Upload,
  },
  {
    id: "analysis",
    title: "AI Image Analysis",
    description: "Analyzing visual elements, colors, and composition",
    icon: Brain,
  },
  {
    id: "generation",
    title: "Generating Campaigns",
    description: "Creating platform-specific marketing content and strategies",
    icon: Sparkles,
  },
  {
    id: "optimization",
    title: "Optimizing Results",
    description: "Fine-tuning campaigns for maximum engagement",
    icon: BarChart3,
  },
]

export function ProcessingStep({ files, description, category, platform, onComplete }: ProcessingStepProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [primaryHash, setPrimaryHash] = useState<string | null>(null)
  const [pollingHash, setPollingHash] = useState<string | null>(null)
  const [simulatedProgress, setSimulatedProgress] = useState(0)
  const hasStarted = useRef(false)

  const processFilesMutation = useProcessFiles({
    onSuccess: (data) => {
      setPrimaryHash(data.primaryHash)
      setCurrentStepIndex(1)
      setCompletedSteps(['upload'])
      // Delay status polling to allow backend to create record
      setTimeout(() => {
        setPollingHash(data.primaryHash)
      }, 2000)
    }
  })
  const statusQuery = useStatusPolling(pollingHash, !!pollingHash)
  const productDataQuery = useProductData(pollingHash, statusQuery.data?.pipeline_status === 'completed')
  

  


  const handleProgress = useCallback((step: string, stepProgress: number) => {
    const stepIndex = processingSteps.findIndex((s) => s.id === step)
    if (stepIndex !== -1) {
      setCurrentStepIndex(stepIndex)
      setProgress(stepProgress)
      if (stepProgress === 100) {
        setCompletedSteps((prev) => [...prev, step])
        setProgress(0)
      }
    }
  }, [])
  
  // Simulate smooth progress for analysis and generation steps
  useEffect(() => {
    if (currentStepIndex > 0 && currentStepIndex < 3 && !completedSteps.includes(processingSteps[currentStepIndex].id)) {
      const interval = setInterval(() => {
        setSimulatedProgress(prev => {
          const increment = Math.random() * 3 + 1 // 1-4% increments
          const newProgress = Math.min(prev + increment, 85) // Cap at 85% until real completion
          return newProgress
        })
      }, 200 + Math.random() * 300) // Vary interval timing
      
      return () => clearInterval(interval)
    }
  }, [currentStepIndex, completedSteps])

  // Start file upload on mount
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true
      processFilesMutation.mutate({
        files,
        description,
        category,
        platform,
        onProgress: handleProgress
      })
    }
  }, [])



  // Handle status updates
  useEffect(() => {
    if (statusQuery.data) {
      const { next_step, pipeline_status } = statusQuery.data
      
      if (pipeline_status === 'completed') {
        setCurrentStepIndex(3)
        setProgress(100)
        setSimulatedProgress(100)
        setCompletedSteps(['upload', 'analysis', 'generation', 'optimization'])
        return
      }
      
      if (pipeline_status === 'enriched') {
        setCurrentStepIndex(2)
        setProgress(0)
        setSimulatedProgress(0)
        setCompletedSteps(['upload', 'analysis'])
        return
      }
      
      if (next_step === 'content_generation') {
        setCurrentStepIndex(1)
        setProgress(100)
        setSimulatedProgress(100)
        setCompletedSteps(['upload', 'analysis'])
        setTimeout(() => {
          setCurrentStepIndex(2)
          setProgress(0)
          setSimulatedProgress(0)
        }, 1000)
      }
    }
  }, [statusQuery.data])

  // Handle completion
  useEffect(() => {
    if (productDataQuery.isSuccess && productDataQuery.data) {
      onComplete(productDataQuery.data)
    }
  }, [productDataQuery.isSuccess, productDataQuery.data, onComplete])

  const error = processFilesMutation.error || statusQuery.error || productDataQuery.error
  const isProcessing = processFilesMutation.isPending || statusQuery.isFetching || productDataQuery.isFetching

  const handleRetry = useCallback(() => {
    setCurrentStepIndex(0)
    setProgress(0)
    setSimulatedProgress(0)
    setCompletedSteps([])
    setPrimaryHash(null)
    setPollingHash(null)
    hasStarted.current = false
    processFilesMutation.reset()
    
    setTimeout(() => {
      hasStarted.current = true
      processFilesMutation.mutate({
        files,
        description,
        category,
        platform,
        onProgress: handleProgress
      })
    }, 100)
  }, [files, description, category, platform, handleProgress, processFilesMutation])

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">AI Processing Your Campaign</CardTitle>
            <p className="text-blue-100 text-lg">
              Our advanced AI is analyzing your product and creating personalized marketing strategies
            </p>
          </div>
        </div>
        <CardContent className="p-8 space-y-8">
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-900 text-lg">Processing Failed</h4>
                  <p className="text-red-700">Something went wrong during the AI analysis</p>
                </div>
              </div>
              <p className="text-red-800 mb-6 bg-red-100 p-4 rounded-xl">
                {error?.message || "An unexpected error occurred"}
              </p>
              <Button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
              >
                <Loader2 className="w-4 h-4 mr-2" />
                Retry Processing
              </Button>
            </div>
          )}

          {/* Processing Steps */}
          <div className="space-y-6">
            {processingSteps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = completedSteps.includes(step.id)
              const isCurrent = index === currentStepIndex && !isCompleted && isProcessing
              const isPending = index > currentStepIndex && !isCompleted

              return (
                <div key={step.id} className="relative">
                  {/* Connection line */}
                  {index < processingSteps.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-slate-200 to-transparent"></div>
                  )}

                  <div className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/50 hover:shadow-lg transition-all duration-300">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 relative z-10",
                        isCompleted
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white scale-110"
                          : isCurrent
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white animate-pulse scale-105"
                          : error && index === currentStepIndex
                          ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
                          : "bg-white border-2 border-slate-200 text-slate-400"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-7 h-7" />
                      ) : isCurrent ? (
                        <Loader2 className="w-7 h-7 animate-spin" />
                      ) : error && index === currentStepIndex ? (
                        <AlertCircle className="w-7 h-7" />
                      ) : (
                        <Icon className="w-7 h-7" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className={cn(
                            "text-xl font-bold transition-colors",
                            isCompleted || isCurrent ? "text-slate-900" : "text-slate-500"
                          )}
                        >
                          {step.title}
                        </h3>
                        {isCompleted && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            <Check className="w-4 h-4" />
                            Complete
                          </div>
                        )}
                        {isCurrent && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </div>
                        )}
                        {error && index === currentStepIndex && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                            <AlertCircle className="w-4 h-4" />
                            Failed
                          </div>
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-base transition-colors mb-4",
                          isCompleted || isCurrent ? "text-slate-600" : "text-slate-400"
                        )}
                      >
                        {step.description}
                      </p>

                      {isCurrent && !error && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 font-medium">Progress</span>
                            <span className="text-indigo-600 font-bold">
                              {Math.round(index === 0 ? progress : simulatedProgress)}%
                            </span>
                          </div>
                          <div className="relative">
                            <Progress
                              value={index === 0 ? progress : simulatedProgress}
                              className="h-3 bg-slate-200"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Processing Summary */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Processing Details
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-slate-900 mb-1">{files.length}</div>
                <div className="text-sm text-slate-600 font-medium">Images</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-lg font-bold text-slate-900 mb-1 capitalize">{category}</div>
                <div className="text-sm text-slate-600 font-medium">Category</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-lg font-bold text-slate-900 mb-1 capitalize">{platform}</div>
                <div className="text-sm text-slate-600 font-medium">Platform</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div
                  className={cn(
                    "text-lg font-bold mb-1",
                    error
                      ? "text-red-600"
                      : completedSteps.length === processingSteps.length
                      ? "text-green-600"
                      : "text-indigo-600"
                  )}
                >
                  {error
                    ? "Error"
                    : completedSteps.length === processingSteps.length
                    ? "Complete"
                    : "Processing"}
                </div>
                <div className="text-sm text-slate-600 font-medium">Status</div>
              </div>
            </div>

            {/* Show detected content when available */}
            {statusQuery.data?.originalData?.raw_analysis?.detected_text && (
              <div className="border-t border-slate-200 pt-4">
                <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  AI Detected Content
                </h5>
                <div className="flex flex-wrap gap-2">
                  {statusQuery.data.originalData.raw_analysis.detected_text
                    .filter((item: any) => item.confidence > 95)
                    .slice(0, 8)
                    .map((item: any, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full border border-indigo-200"
                      >
                        {item.text}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
