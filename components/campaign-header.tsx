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
      case 1: return "Upload Your Product"
      case 2: return "AI Processing"
      case 3: return "Your Campaigns"
      default: return "Create Campaign"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Upload product images and provide details to get started"
      case 2: return "Our AI is analyzing your product and creating campaigns"
      case 3: return "Your personalized marketing campaigns are ready"
      default: return "Transform your product into viral campaigns"
    }
  }

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 right-20 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-bounce"></div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            AI E-Commerce Growth Agent
          </Link>
          <Button variant="ghost" asChild className="text-white hover:bg-white/10">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Step {currentStep} of 3</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
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