"use client"

import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CampaignHeaderProps {
  currentStep: number
}

export function CampaignHeader({ currentStep }: CampaignHeaderProps) {
  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Choose Your Goal"
      case 2: return "Team Assembly"
      case 3: return "Smart Data Collection"
      case 4: return "Team Collaboration"
      case 5: return "Your Campaigns"
      default: return "Create Campaign"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Select your marketing objective to get started"
      case 2: return "Your marketing specialists are being assembled"
      case 3: return "Provide details for your marketing team to work with"
      case 4: return "Your marketing team is collaborating to create campaigns"
      case 5: return "Your personalized marketing campaigns are ready"
      default: return "Transform your product into viral campaigns"
    }
  }

  return (
    <header className="bg-slate-900 text-white">

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-2xl font-bold text-white">
            Marketing Growth Platform
          </Link>
          <Button variant="ghost" asChild className="text-white hover:bg-white/10">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium">Step {currentStep} of 5</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            {getStepTitle()}
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            {getStepDescription()}
          </p>
        </div>
      </div>
    </header>
  )
}