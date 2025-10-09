"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SmartDataCollection } from "@/components/smart-data-collection"
import { CampaignHeader } from "@/components/campaign-header"
import { ModernStepIndicator } from "@/components/modern-step-indicator"

export default function DataCollectionPage() {
  const router = useRouter()
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [aiTeam, setAiTeam] = useState<any[]>([])

  useEffect(() => {
    const storedGoal = sessionStorage.getItem('selectedGoal')
    const storedTeam = sessionStorage.getItem('aiTeam')
    
    if (storedGoal && storedTeam) {
      setSelectedGoal(JSON.parse(storedGoal))
      setAiTeam(JSON.parse(storedTeam))
    } else {
      router.push('/campaign/goal')
    }
  }, [router])

  const handleDataComplete = (data: any) => {
    sessionStorage.setItem('collectedData', JSON.stringify(data))
    router.push('/campaign/process')
  }

  if (!selectedGoal || aiTeam.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CampaignHeader currentStep={3} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <ModernStepIndicator currentStep={1} />
          
          <div className="mt-16">
            <SmartDataCollection 
              selectedGoal={selectedGoal}
              aiTeam={aiTeam}
              onComplete={handleDataComplete}
            />
          </div>
        </div>
      </main>
    </div>
  )
}