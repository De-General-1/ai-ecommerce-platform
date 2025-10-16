"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Upload, Brain, Sparkles, BarChart3, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"


interface ProcessingStepProps {
  isLoading?: boolean
  selectedGoal?: any
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

export function ProcessingStep({ isLoading, selectedGoal }: ProcessingStepProps) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 500)
      return () => clearInterval(interval)
    } else {
      setProgress(100)
    }
  }, [isLoading])
  

  




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
              {selectedGoal?.title || "Creating your viral marketing campaign"}
            </p>
          </div>
        </div>
        <CardContent className="p-8 space-y-8">

          {/* Simple Loading Display */}
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Generating Campaign</h3>
            <p className="text-slate-600 mb-6">Our AI agents are creating your viral marketing strategy...</p>
            <div className="max-w-md mx-auto">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-slate-500 mt-2">{Math.round(progress)}% complete</p>
            </div>
          </div>


        </CardContent>
      </Card>
    </div>
  )
}
