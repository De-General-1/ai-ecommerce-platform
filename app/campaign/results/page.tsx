"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { EnhancedResults } from "@/components/enhanced-results"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CampaignResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<any>(null)
  const [campaignData, setCampaignData] = useState<any>(null)

  useEffect(() => {
    const resultsData = localStorage.getItem('campaignResults')
    const campaignInfo = localStorage.getItem('campaignData')
    
    if (resultsData && campaignInfo) {
      setResults(JSON.parse(resultsData))
      setCampaignData(JSON.parse(campaignInfo))
    } else {
      router.push('/campaign')
    }
  }, [router])

  const handleReset = () => {
    localStorage.removeItem('campaignData')
    localStorage.removeItem('campaignResults')
    router.push('/campaign')
  }

  const handleBack = () => {
    router.push('/campaign/processing')
  }

  if (!results || !campaignData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-900">Loading Results</h3>
            <p className="text-slate-600">Preparing your campaign results...</p>
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
          Back to Processing
        </Button>
        
        <EnhancedResults
          results={results}
          selectedGoal={campaignData.goal}
          aiTeam={campaignData.team}
          onReset={handleReset}
        />
      </div>
    </div>
  )
}