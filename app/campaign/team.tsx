"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AITeamAssembly } from "@/components/ai-team-assembly"
import { CampaignHeader } from "@/components/campaign-header"

export default function TeamAssemblyPage() {
  const router = useRouter()
  const [selectedGoal, setSelectedGoal] = useState<any>(null)

  useEffect(() => {
    const storedGoal = sessionStorage.getItem('selectedGoal')
    if (storedGoal) {
      setSelectedGoal(JSON.parse(storedGoal))
    } else {
      router.push('/campaign/goal')
    }
  }, [router])

  const handleTeamReady = (team: any[]) => {
    sessionStorage.setItem('aiTeam', JSON.stringify(team))
    router.push('/campaign/collect')
  }

  if (!selectedGoal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CampaignHeader currentStep={2} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <AITeamAssembly 
            selectedGoal={selectedGoal} 
            onTeamReady={handleTeamReady} 
          />
        </div>
      </main>
    </div>
  )
}