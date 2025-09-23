"use client"

import { useState, useEffect } from "react"
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

  const processFilesMutation = useProcessFiles()
  const statusQuery = useStatusPolling(primaryHash, !!primaryHash)
  const productDataQuery = useProductData(primaryHash, statusQuery.data?.pipeline_status === 'completed')

  // Start file upload on mount
  useEffect(() => {
    processFilesMutation.mutate({
      files,
      description,
      category,
      platform,
      onProgress: (step: string, stepProgress: number) => {
        const stepIndex = processingSteps.findIndex((s) => s.id === step)
        if (stepIndex !== -1) {
          setCurrentStepIndex(stepIndex)
          setProgress(stepProgress)
          if (stepProgress === 100) {
            setCompletedSteps((prev) => [...prev, step])
            setProgress(0)
          }
        }
      }
    })
  }, [])

  // Handle upload success
  useEffect(() => {
    if (processFilesMutation.isSuccess) {
      setPrimaryHash(processFilesMutation.data.primaryHash)
    }
  }, [processFilesMutation.isSuccess, processFilesMutation.data])

  // Handle status updates
  useEffect(() => {
    if (statusQuery.data) {
      const { next_step, pipeline_status } = statusQuery.data
      
      if (pipeline_status === 'completed') {
        setCurrentStepIndex(3)
        setProgress(100)
        setCompletedSteps(['upload', 'analysis', 'generation', 'optimization'])
        return
      }
      
      switch (next_step) {
        case 'content_generation':
          if (!completedSteps.includes('analysis')) {
            setCurrentStepIndex(2)
            setCompletedSteps(prev => [...prev, 'analysis'])
            setProgress(0)
          }
          break
        case 'optimization':
          if (!completedSteps.includes('generation')) {
            setCurrentStepIndex(3)
            setCompletedSteps(prev => [...prev, 'generation'])
            setProgress(0)
          }
          break
        default:
          setProgress(50)
      }
    }
  }, [statusQuery.data, completedSteps])

  // Handle completion
  useEffect(() => {
    if (productDataQuery.isSuccess && productDataQuery.data) {
      onComplete(productDataQuery.data)
    }
  }, [productDataQuery.isSuccess, productDataQuery.data, onComplete])

  const error = processFilesMutation.error || statusQuery.error || productDataQuery.error
  const isProcessing = processFilesMutation.isPending || statusQuery.isFetching || productDataQuery.isFetching

  const handleRetry = () => {
    setCurrentStepIndex(0)
    setProgress(0)
    setCompletedSteps([])
    setPrimaryHash(null)
    processFilesMutation.reset()
    
    processFilesMutation.mutate({
      files,
      description,
      category,
      platform,
      onProgress: (step: string, stepProgress: number) => {
        const stepIndex = processingSteps.findIndex((s) => s.id === step)
        if (stepIndex !== -1) {
          setCurrentStepIndex(stepIndex)
          setProgress(stepProgress)
          if (stepProgress === 100) {
            setCompletedSteps((prev) => [...prev, step])
            setProgress(0)
          }
        }
      }
    })
  }

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
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
