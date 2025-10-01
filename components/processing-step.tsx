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
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Processing Your Marketing Campaign</CardTitle>
          <p className="text-center text-muted-foreground">
            Our AI is analyzing your products and creating personalized marketing strategies
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <h4 className="font-medium text-destructive">Processing Failed</h4>
              </div>
              <p className="text-sm text-destructive/80 mb-4">{error?.message || 'An error occurred'}</p>
              <Button onClick={handleRetry} variant="outline" size="sm">
                Try Again
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
                <div key={step.id} className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isCurrent
                          ? "bg-primary/10 border-primary text-primary animate-pulse"
                          : error && index === currentStepIndex
                            ? "bg-destructive/10 border-destructive text-destructive"
                            : "bg-muted border-border text-muted-foreground",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : isCurrent ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : error && index === currentStepIndex ? (
                      <AlertCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={cn(
                          "font-medium transition-colors",
                          isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </h3>
                      {isCompleted && <span className="text-sm text-primary font-medium">Complete</span>}
                      {isCurrent && <span className="text-sm text-primary font-medium">Processing...</span>}
                      {error && index === currentStepIndex && (
                        <span className="text-sm text-destructive font-medium">Failed</span>
                      )}
                    </div>
                    <p
                      className={cn(
                        "text-sm mt-1 transition-colors",
                        isCompleted || isCurrent ? "text-muted-foreground" : "text-muted-foreground/60",
                      )}
                    >
                      {step.description}
                    </p>

                    {isCurrent && !error && (
                      <div className="mt-3">
                        <Progress value={index === 0 ? progress : simulatedProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round(index === 0 ? progress : simulatedProgress)}% complete
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Processing Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Processing Details</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <div>
                <span className="text-muted-foreground">Images:</span>
                <p className="font-medium">{files.length} files</p>
              </div>
              <div>
                <span className="text-muted-foreground">Category:</span>
                <p className="font-medium capitalize">{category}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Platform:</span>
                <p className="font-medium capitalize">{platform}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p
                  className={cn(
                    "font-medium",
                    error
                      ? "text-destructive"
                      : completedSteps.length === processingSteps.length
                        ? "text-primary"
                        : "text-primary",
                  )}
                >
                  {error ? "Error" : completedSteps.length === processingSteps.length ? "Complete" : "Processing"}
                </p>
              </div>
            </div>
            
            {/* Show detected content when available */}
            {statusQuery.data?.originalData?.raw_analysis?.detected_text && (
              <div className="border-t pt-3">
                <h5 className="font-medium text-sm mb-2">Detected Content:</h5>
                <div className="flex flex-wrap gap-1">
                  {statusQuery.data.originalData.raw_analysis.detected_text
                    .filter((item: any) => item.confidence > 95)
                    .slice(0, 8)
                    .map((item: any, index: number) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
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
