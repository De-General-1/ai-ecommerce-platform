"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AICollaborationProcessing } from "@/components/ai-collaboration-processing"
import { CampaignHeader } from "@/components/campaign-header"
import { ModernStepIndicator } from "@/components/modern-step-indicator"

export default function ProcessingPage() {
  const router = useRouter()
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [aiTeam, setAiTeam] = useState<any[]>([])
  const [collectedData, setCollectedData] = useState<any>(null)

  useEffect(() => {
    const storedGoal = sessionStorage.getItem('selectedGoal')
    const storedTeam = sessionStorage.getItem('aiTeam')
    const storedData = sessionStorage.getItem('collectedData')
    
    if (storedGoal && storedTeam && storedData) {
      setSelectedGoal(JSON.parse(storedGoal))
      setAiTeam(JSON.parse(storedTeam))
      setCollectedData(JSON.parse(storedData))
    } else {
      router.push('/campaign/goal')
    }
  }, [router])

  const handleProcessingComplete = (results: any) => {
    sessionStorage.setItem('analysisResults', JSON.stringify(results))
    router.push('/campaign/results')
  }

  if (!selectedGoal || aiTeam.length === 0 || !collectedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CampaignHeader currentStep={4} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <ModernStepIndicator currentStep={2} />
          
          <div className="mt-16">
            <AICollaborationProcessing
              files={collectedData.files}
              description={collectedData.productDescription}
              category={collectedData.category}
              platform={collectedData.targetPlatform}
              selectedGoal={selectedGoal}
              aiTeam={aiTeam}
              onComplete={handleProcessingComplete}
            />
          </div>
        </div>
      </main>
    </div>
  )
}