"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EnhancedResults } from "@/components/enhanced-results"
import { CampaignHeader } from "@/components/campaign-header"
import { ModernStepIndicator } from "@/components/modern-step-indicator"

export default function ResultsPage() {
  const router = useRouter()
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [aiTeam, setAiTeam] = useState<any[]>([])
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  useEffect(() => {
    const storedGoal = sessionStorage.getItem('selectedGoal')
    const storedTeam = sessionStorage.getItem('aiTeam')
    const storedResults = sessionStorage.getItem('analysisResults')
    
    if (storedGoal && storedTeam && storedResults) {
      setSelectedGoal(JSON.parse(storedGoal))
      setAiTeam(JSON.parse(storedTeam))
      setAnalysisResults(JSON.parse(storedResults))
    } else {
      router.push('/campaign/goal')
    }
  }, [router])

  const handleReset = () => {
    // Clear all session storage
    sessionStorage.removeItem('selectedGoal')
    sessionStorage.removeItem('aiTeam')
    sessionStorage.removeItem('collectedData')
    sessionStorage.removeItem('analysisResults')
    
    router.push('/campaign/goal')
  }

  if (!selectedGoal || aiTeam.length === 0 || !analysisResults) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <CampaignHeader currentStep={5} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <ModernStepIndicator currentStep={3} />
          
          <div className="mt-16">
            <EnhancedResults 
              results={analysisResults} 
              selectedGoal={selectedGoal}
              aiTeam={aiTeam}
              onReset={handleReset} 
            />
          </div>
        </div>
      </main>
    </div>
  )
}