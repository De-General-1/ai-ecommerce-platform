"use client"

import { useState } from "react"
import { UploadStep } from "@/components/upload-step"
import { ProcessingStep } from "@/components/processing-step"
import { ResultsStep } from "@/components/results-step"
import { StepIndicator } from "@/components/step-indicator"
import { ErrorBoundary } from "@/components/error-boundary"
import Link from "next/link"

export default function CampaignPage() {
  const [currentStep, setCurrentStep] = useState(1) // 1 = upload, 2 = processing, 3 = results
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [productDescription, setProductDescription] = useState("")
  const [category, setCategory] = useState("")
  const [targetPlatform, setTargetPlatform] = useState("")
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleUploadComplete = (files: File[], description: string, cat: string, platform: string) => {
    setUploadedFiles(files)
    setProductDescription(description)
    setCategory(cat)
    setTargetPlatform(platform)
    setCurrentStep(2)
  }

  const handleProcessingComplete = (results: any) => {
    setAnalysisResults(results)
    setCurrentStep(3)
  }

  const resetWorkflow = () => {
    setCurrentStep(1)
    setUploadedFiles([])
    setProductDescription("")
    setCategory("")
    setTargetPlatform("")
    setAnalysisResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-elegant">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5"></div>
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI E-Commerce Growth Agent
            </Link>
            <Link 
              href="/"
              className="text-slate-600 hover:text-slate-900 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <StepIndicator currentStep={currentStep} />

          <div className="mt-12">
            <ErrorBoundary>
              {currentStep === 1 && <UploadStep onComplete={handleUploadComplete} />}

              {currentStep === 2 && (
                <ProcessingStep
                  files={uploadedFiles}
                  description={productDescription}
                  category={category}
                  platform={targetPlatform}
                  onComplete={handleProcessingComplete}
                />
              )}

              {currentStep === 3 && <ResultsStep results={analysisResults} onReset={resetWorkflow} />}
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  )
}