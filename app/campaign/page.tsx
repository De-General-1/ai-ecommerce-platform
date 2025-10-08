"use client"

import { useState } from "react"
import { UploadStep } from "@/components/upload-step"
import { ProcessingStep } from "@/components/processing-step"
import { ResultsStep } from "@/components/results-step"
import { ModernStepIndicator } from "@/components/modern-step-indicator"
import { CampaignHeader } from "@/components/campaign-header"
import { ErrorBoundary } from "@/components/error-boundary"

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
      <CampaignHeader currentStep={currentStep} />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <ModernStepIndicator currentStep={currentStep} />

          <div className="mt-16">
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