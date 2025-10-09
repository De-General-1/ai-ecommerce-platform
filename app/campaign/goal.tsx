"use client"

import { useRouter } from "next/navigation"
import { GoalSelection } from "@/components/goal-selection"
import { CampaignHeader } from "@/components/campaign-header"

export default function GoalSelectionPage() {
  const router = useRouter()

  const handleGoalSelect = (goal: any) => {
    sessionStorage.setItem('selectedGoal', JSON.stringify(goal))
    router.push('/campaign/team')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CampaignHeader currentStep={1} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <GoalSelection onGoalSelect={handleGoalSelect} />
        </div>
      </main>
    </div>
  )
}