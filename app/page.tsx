"use client"

import { useState } from "react"
import { UploadStep } from "@/components/upload-step"
import { ProcessingStep } from "@/components/processing-step"
import { ResultsStep } from "@/components/results-step"
import { StepIndicator } from "@/components/step-indicator"
import { ErrorBoundary } from "@/components/error-boundary"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [productDescription, setProductDescription] = useState("")
  const [category, setCategory] = useState("")
  const [targetPlatform, setTargetPlatform] = useState("")
  const [analysisResults, setAnalysisResults] = useState(null)

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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">AI E-Commerce Growth Agent</h1>
          <p className="text-muted-foreground mt-2">Transform your products into trending marketing campaigns</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} />

        <div className="mt-8">
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
      </main>
    </div>
  )
}
