"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { GoalSelection } from "@/components/goal-selection"
import { ModernStepIndicator } from "@/components/modern-step-indicator"
import { CampaignHeader } from "@/components/campaign-header"
import { ErrorBoundary } from "@/components/error-boundary"

// Dynamic imports for heavy components
const AITeamAssembly = dynamic(() => import("@/components/ai-team-assembly").then(mod => ({ default: mod.AITeamAssembly })), {
  loading: () => <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
})

const SmartDataCollection = dynamic(() => import("@/components/smart-data-collection").then(mod => ({ default: mod.SmartDataCollection })), {
  loading: () => <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
})

const AICollaborationProcessing = dynamic(() => import("@/components/ai-collaboration-processing").then(mod => ({ default: mod.AICollaborationProcessing })), {
  loading: () => <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
})

const EnhancedResults = dynamic(() => import("@/components/enhanced-results").then(mod => ({ default: mod.EnhancedResults })), {
  loading: () => <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
})

export default function CampaignPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [aiTeam, setAiTeam] = useState<any[]>([])
  const [collectedData, setCollectedData] = useState<any>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleGoalSelect = (goal: any) => {
    setSelectedGoal(goal)
    setCurrentStep(2)
  }

  const handleTeamReady = (team: any[]) => {
    setAiTeam(team)
    setCurrentStep(3)
  }

  const handleDataComplete = (data: any) => {
    setCollectedData(data)
    setCurrentStep(4)
  }

  const handleProcessingComplete = (results: any) => {
    setAnalysisResults(results)
    setCurrentStep(5)
  }

  const resetWorkflow = () => {
    setCurrentStep(1)
    setSelectedGoal(null)
    setAiTeam([])
    setCollectedData(null)
    setAnalysisResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CampaignHeader currentStep={currentStep} />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {currentStep > 1 && <ModernStepIndicator currentStep={currentStep - 1} />}

          <div className="mt-16">
            <ErrorBoundary>
              {currentStep === 1 && <GoalSelection onGoalSelect={handleGoalSelect} />}
              
              {currentStep === 2 && selectedGoal && (
                <AITeamAssembly 
                  selectedGoal={selectedGoal} 
                  onTeamReady={handleTeamReady} 
                />
              )}
              
              {currentStep === 3 && selectedGoal && aiTeam.length > 0 && (
                <SmartDataCollection 
                  selectedGoal={selectedGoal}
                  aiTeam={aiTeam}
                  onComplete={handleDataComplete}
                />
              )}

              {currentStep === 4 && collectedData && (
                <AICollaborationProcessing
                  files={collectedData.files}
                  description={collectedData.productDescription}
                  category={collectedData.category}
                  platform={collectedData.targetPlatform}
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
                />
              )}
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  )
}