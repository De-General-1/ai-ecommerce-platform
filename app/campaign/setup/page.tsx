"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { SmartDataCollection } from "@/components/smart-data-collection"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { fileStorage } from "@/lib/file-storage"

function CampaignSetupContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [aiTeam, setAiTeam] = useState<any[]>([])

  useEffect(() => {
    const goalData = searchParams.get('goal')
    const teamData = searchParams.get('team')
    
    if (goalData) {
      setSelectedGoal(JSON.parse(decodeURIComponent(goalData)))
    }
    if (teamData) {
      setAiTeam(JSON.parse(decodeURIComponent(teamData)))
    }
  }, [searchParams])

  const handleComplete = (data: any) => {
    // Store files using file storage utility
    if (data.files && data.files.length > 0) {
      fileStorage.storeFiles('campaign', data.files)
    }
    
    localStorage.setItem('campaignData', JSON.stringify({
      goal: selectedGoal,
      team: aiTeam,
      ...data,
      hasFiles: data.files && data.files.length > 0
    }))
    router.push('/campaign/processing')
  }

  const handleBack = () => {
    router.push('/campaign')
  }

  if (!selectedGoal) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-900">Loading Setup</h3>
            <p className="text-slate-600">Preparing your campaign setup...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-6 hover:bg-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Goals
        </Button>
        
        <SmartDataCollection 
          selectedGoal={selectedGoal}
          aiTeam={aiTeam}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}

export default function CampaignSetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-900">Loading Setup</h3>
            <p className="text-slate-600">Preparing your campaign setup...</p>
          </div>
        </div>
      </div>
    }>
      <CampaignSetupContent />
    </Suspense>
  )
}