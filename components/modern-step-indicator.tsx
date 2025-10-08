"use client"

import { Check, Upload, Brain, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModernStepIndicatorProps {
  currentStep: number
}

const steps = [
  {
    id: 1,
    title: "Upload",
    description: "Product details",
    icon: Upload
  },
  {
    id: 2,
    title: "Process",
    description: "AI analysis",
    icon: Brain
  },
  {
    id: 3,
    title: "Results",
    description: "Your campaigns",
    icon: Rocket
  }
]

export function ModernStepIndicator({ currentStep }: ModernStepIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-200 -z-10">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id
          const isPending = currentStep < step.id

          return (
            <div key={step.id} className="flex flex-col items-center relative">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-lg",
                  isCompleted
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-500 text-white"
                    : isCurrent
                      ? "bg-white border-indigo-500 text-indigo-600 shadow-indigo-200"
                      : "bg-white border-slate-200 text-slate-400"
                )}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>
              
              <div className="mt-4 text-center">
                <div
                  className={cn(
                    "font-semibold text-sm transition-colors",
                    isCompleted || isCurrent ? "text-slate-900" : "text-slate-400"
                  )}
                >
                  {step.title}
                </div>
                <div
                  className={cn(
                    "text-xs mt-1 transition-colors",
                    isCompleted || isCurrent ? "text-slate-600" : "text-slate-400"
                  )}
                >
                  {step.description}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}