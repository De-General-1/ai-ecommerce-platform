"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Target, Rocket, Brain, TrendingUp } from "lucide-react"

interface EnthusiasticProcessingProps {
  onComplete: (results: any) => void
  selectedGoal: any
  files?: File[]
  description?: string
  category?: string
  platform?: string
}

export function EnthusiasticProcessing({ onComplete, selectedGoal, files, description, category, platform }: EnthusiasticProcessingProps) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("")
  const [sparklePositions, setSparklePositions] = useState<Array<{x: number, y: number, delay: number}>>([])
  const [apiCompleted, setApiCompleted] = useState(false)
  const [apiResult, setApiResult] = useState<any>(null)

  const phases = [
    {
      title: "Launching AI Agents",
      message: "Your elite marketing team is assembling...",
      icon: Rocket,
      color: "from-blue-500 to-indigo-600",
      duration: 3000
    },
    {
      title: "Analyzing Your Product", 
      message: "AI is discovering your product's unique selling points...",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
      duration: 4000
    },
    {
      title: "Market Intelligence",
      message: "Scanning global trends and competitor strategies...",
      icon: Target,
      color: "from-green-500 to-emerald-600", 
      duration: 3500
    },
    {
      title: "Content Generation",
      message: "Creating viral-worthy content across all platforms...",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
      duration: 4500
    },
    {
      title: "Strategy Optimization",
      message: "Fine-tuning campaigns for maximum impact...",
      icon: TrendingUp,
      color: "from-red-500 to-pink-600",
      duration: 3000
    }
  ]

  const excitementMessages = [
    "This is going to be AMAZING!",
    "Your campaigns are looking incredible!", 
    "AI agents are working their magic!",
    "Get ready for viral success!",
    "Something special is being created!",
    "Your brand is about to shine!"
  ]

  useEffect(() => {
    // Generate random sparkle positions
    const sparkles = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.2
    }))
    setSparklePositions(sparkles)

    let phaseTimer: NodeJS.Timeout
    let progressTimer: NodeJS.Timeout
    let messageTimer: NodeJS.Timeout

    const makeAPICall = async () => {
      try {
        const campaignDataStr = localStorage.getItem("campaignData")
        if (!campaignDataStr) throw new Error("No campaign data found")
        
        const campaignData = JSON.parse(campaignDataStr)
        const file = campaignData.files?.[0]
        
        // Create mock file if lost in localStorage
        let actualFile = file
        if (!file || !file.name || !file.type) {
          const canvas = document.createElement('canvas')
          canvas.width = 100
          canvas.height = 100
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.fillStyle = '#4F46E5'
            ctx.fillRect(0, 0, 100, 100)
            ctx.fillStyle = '#FFFFFF'
            ctx.font = '16px Arial'
            ctx.fillText('TEST', 30, 55)
          }
          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.8)
          })
          actualFile = new File([blob], "test-product.jpg", { type: "image/jpeg" })
        }

        // Step 1: Get presigned URL
        const presignedResponse = await fetch(
          "https://u4xf9rvuwj.execute-api.eu-west-1.amazonaws.com/dev/api/uploads/get-presigned-url",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileName: actualFile.name, fileType: actualFile.type })
          }
        )
        
        if (!presignedResponse.ok) throw new Error("Failed to get presigned URL")
        const { uploadUrl, imageKey } = await presignedResponse.json()

        // Step 2: Upload to S3
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": actualFile.type },
          body: actualFile
        })

        if (!uploadResponse.ok) throw new Error("S3 upload failed")

        // Step 3: Create campaign
        const goalTitle = selectedGoal?.title?.trim()
        const endpoint = goalTitle === "Go Viral Globally" 
          ? "https://u4xf9rvuwj.execute-api.eu-west-1.amazonaws.com/dev/api/comprehensive-campaign"
          : "https://u4xf9rvuwj.execute-api.eu-west-1.amazonaws.com/dev/api/simple-campaign"

        const apiData = {
          product_info: {
            name: campaignData.productDescription || "Product",
            description: campaignData.productDescription || "Amazing product",
            category: campaignData.category?.toLowerCase() || "general",
            price: "$299.99",
            key_features: ["High-quality", "Premium design", "Great performance"]
          },
          s3_info: { bucket: "degenerals-mi-dev-images", key: imageKey },
          target_markets: { markets: ["North America", "Europe", "Asia"] },
          campaign_objectives: {
            target_audience: "Tech enthusiasts, professionals",
            target_age_range: "25-55",
            platform_preferences: ["Instagram", "TikTok", "YouTube"],
            campaign_duration: "30 days",
            budget: "$50,000",
            primary_goal: selectedGoal?.title || "Increase brand awareness"
          }
        }

        const campaignResponse = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData)
        })

        if (!campaignResponse.ok) {
          const errorText = await campaignResponse.text()
          throw new Error(`Campaign creation failed: ${campaignResponse.status} - ${errorText}`)
        }
        
        const result = await campaignResponse.json()
        setApiResult(result)
        setApiCompleted(true)
        
        // If animation is still running, let it complete naturally
        // Otherwise complete immediately
        if (currentPhase >= phases.length - 1) {
          onComplete(result)
        }
      } catch (error) {
        console.error("API call failed:", error)
        const fallbackResult = { success: true, campaign: { content_ideas: [], campaigns: [], generated_assets: {} } }
        setApiResult(fallbackResult)
        setApiCompleted(true)
        
        if (currentPhase >= phases.length - 1) {
          onComplete(fallbackResult)
        }
      }
    }

    const startPhase = (phaseIndex: number) => {
      if (phaseIndex >= phases.length || apiCompleted) {
        // If API is done, complete immediately
        if (apiCompleted && apiResult) {
          onComplete(apiResult)
        }
        return
      }

      setCurrentPhase(phaseIndex)
      setProgress(0)
      setCurrentMessage(phases[phaseIndex].message)

      // Progress animation
      const progressIncrement = 100 / (phases[phaseIndex].duration / 50)
      progressTimer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + progressIncrement
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 50)

      // Random excitement messages
      messageTimer = setInterval(() => {
        const randomMessage = excitementMessages[Math.floor(Math.random() * excitementMessages.length)]
        setCurrentMessage(randomMessage)
        setTimeout(() => {
          setCurrentMessage(phases[phaseIndex].message)
        }, 2000)
      }, 5000)

      // Move to next phase
      phaseTimer = setTimeout(() => {
        clearInterval(progressTimer)
        clearInterval(messageTimer)
        startPhase(phaseIndex + 1)
      }, phases[phaseIndex].duration)
    }

    // Start API call immediately in parallel
    makeAPICall()
    
    // Start animation phases
    startPhase(0)

    return () => {
      clearTimeout(phaseTimer)
      clearInterval(progressTimer) 
      clearInterval(messageTimer)
    }
  }, [onComplete])

  // Handle API completion during animation
  useEffect(() => {
    if (apiCompleted && apiResult) {
      // Add a small delay to show completion, then navigate
      setTimeout(() => {
        onComplete(apiResult)
      }, 1000)
    }
  }, [apiCompleted, apiResult, onComplete])

  const currentPhaseData = phases[currentPhase]
  const Icon = currentPhaseData?.icon || Sparkles

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Sparkles */}
      {sparklePositions.map((sparkle, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`
          }}
        >
          <Sparkles className="w-4 h-4 text-indigo-300 animate-bounce" />
        </div>
      ))}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-200 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-indigo-900">AI Agents Working</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Creating Your
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {selectedGoal?.title || "Marketing Campaign"}
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our AI team is working at lightning speed to craft the perfect campaign strategy just for you!
            </p>
          </div>

          {/* Main Processing Card */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden">
            <CardContent className="p-12">
              
              {/* Current Phase */}
              <div className="space-y-8">
                <div className="flex items-center justify-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentPhaseData?.color} flex items-center justify-center shadow-lg animate-pulse`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-slate-900">{currentPhaseData?.title}</h3>
                    <Badge variant="secondary" className="mt-1">
                      Phase {currentPhase + 1} of {phases.length}
                    </Badge>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <Progress value={progress} className="h-3 bg-slate-200" />
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>{Math.round(progress)}% Complete</span>
                    <span>{Math.round((currentPhase / phases.length) * 100)}% Overall</span>
                  </div>
                </div>

                {/* Current Message */}
                <div className={`rounded-xl p-6 border transition-all duration-500 ${
                  apiCompleted 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                    : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
                }`}>
                  <p className="text-lg font-medium text-slate-800 animate-pulse">
                    {apiCompleted ? "🎉 Campaign Ready! Finalizing results..." : currentMessage}
                  </p>
                </div>

                {/* Phase Timeline */}
                <div className="grid grid-cols-5 gap-2 mt-8">
                  {phases.map((phase, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index < currentPhase 
                          ? 'bg-green-500' 
                          : index === currentPhase 
                          ? 'bg-indigo-500 animate-pulse' 
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Excitement Footer */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-indigo-600">
              <Zap className="w-5 h-5 animate-bounce" />
              <Zap className="w-5 h-5 animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-slate-500">
              Hang tight! We're crafting something extraordinary for your brand...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}