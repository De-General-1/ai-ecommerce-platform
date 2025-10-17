"use client"

import { useState } from "react"
import { GoalSelection } from "@/components/goal-selection"
import { UploadStep } from "@/components/upload-step"
import { ProcessingStep } from "@/components/processing-step"
import { ResultsStep } from "@/components/results-step"
import { ModernStepIndicator } from "@/components/modern-step-indicator"
import { CampaignHeader } from "@/components/campaign-header"
import { ErrorBoundary } from "@/components/error-boundary"
import { toast } from "sonner"

// Dynamic imports for heavy components
// const AITeamAssembly = dynamic(() => import("@/components/ai-team-assembly").then(mod => ({ default: mod.AITeamAssembly })), {
//   loading: () => <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
// })

// const SmartDataCollection = dynamic(() => import("@/components/smart-data-collection").then(mod => ({ default: mod.SmartDataCollection })), {
//   loading: () => <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
// })

// const AICollaborationProcessing = dynamic(() => import("@/components/ai-collaboration-processing").then(mod => ({ default: mod.AICollaborationProcessing })), {
//   loading: () => <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
// })

// const EnhancedResults = dynamic(() => import("@/components/enhanced-results").then(mod => ({ default: mod.EnhancedResults })), {
//   loading: () => <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
// })

export default function CampaignPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [productData, setProductData] = useState<any>(null)
  const [campaignResults, setCampaignResults] = useState<any>(null)
  
  // const createCampaign = useCreateCampaign() // Removed - using new routing system

  const handleGoalSelect = (goal: any) => {
    setSelectedGoal(goal)
    setCurrentStep(2)
  }

  const handleProductSubmit = async (data: any) => {
    setProductData(data)
    setCurrentStep(3)
    
    try {
      const campaignParams = {
        product: {
          name: data.name,
          description: data.description,
          category: data.category
        },
        target_markets: ["Global"],
        campaign_objectives: ["awareness", "engagement"],
        budget_range: "medium",
        timeline: "Q1 2025"
      }
      
      // const result = await createCampaign.mutateAsync(campaignParams)
      const result = { status: 'success' } // Mock for old page
      setCampaignResults(result)
      setCurrentStep(4)
      toast.success("Campaign generated successfully!")
    } catch (error) {
      toast.error("Failed to generate campaign")
      console.error(error)
    }
  }

  const resetWorkflow = () => {
    setCurrentStep(1)
    setSelectedGoal(null)
    setProductData(null)
    setCampaignResults(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <CampaignHeader currentStep={currentStep} />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {currentStep > 1 && <ModernStepIndicator currentStep={currentStep - 1} />}

          <div className="mt-16">
            <ErrorBoundary>
              {currentStep === 1 && <GoalSelection onGoalSelect={handleGoalSelect} />}
              
              {currentStep === 2 && selectedGoal && (
                <UploadStep onComplete={handleProductSubmit} />
              )}
              
              {currentStep === 3 && (
                <ProcessingStep 
                  isLoading={false}
                  selectedGoal={selectedGoal}
                />
              )}

<<<<<<< Updated upstream
              {currentStep === 4 && campaignResults && (
                <ResultsStep 
                  results={campaignResults}
                  onReset={resetWorkflow}
=======
              {currentStep === 4 && collectedData && (
                <AICollaborationProcessing
                  files={collectedData.files}
                  product={collectedData.product}
                  target_markets={collectedData.target_markets}
                  campaign_goals={collectedData.campaign_goals}
                  useComprehensive={collectedData.useComprehensive}
                  selectedGoal={selectedGoal}
                  aiTeam={aiTeam}
                  onComplete={handleProcessingComplete}
                />
              )}

              {currentStep === 5 && (
                <EnhancedResults 
                  results={analysisResults} 
                  selectedGoal={selectedGoal}
                  aiTeam={aiTeam}
                  onReset={resetWorkflow} 
>>>>>>> Stashed changes
                />
              )}
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  )
}