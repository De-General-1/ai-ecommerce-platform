"use client"

import { useState, useEffect, useCallback, useRef, SetStateAction } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2, AlertCircle, MessageSquare, Brain, Users, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
<<<<<<< Updated upstream
import { useProcessCampaign, useCampaignStatus, useCampaignResults } from "@/lib/queries"
=======
import { useFullCampaignFlow } from "@/lib/queries"
>>>>>>> Stashed changes

interface AICollaborationProcessingProps {
  files: File[]
  description: string
  category: string
  platform: string
  selectedGoal: any
  aiTeam: any[]
  onComplete: (results: any) => void
}

export function AICollaborationProcessing({ 
  files, 
  description,
  category,
  platform,
  selectedGoal,
  aiTeam,
  onComplete 
}: AICollaborationProcessingProps) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [agentStates, setAgentStates] = useState<Record<string, any>>({})
  const [agentMessages, setAgentMessages] = useState<any[]>([])
<<<<<<< Updated upstream
  const [campaignId, setCampaignId] = useState<string | null>(null)
=======
  const [progress, setProgress] = useState(0)
>>>>>>> Stashed changes
  const hasStarted = useRef(false)
  const isProcessing = useRef(false)

<<<<<<< Updated upstream
  const processCampaignMutation = useProcessCampaign()
  const statusQuery = useCampaignStatus(campaignId, !!campaignId)
  const resultsQuery = useCampaignResults(campaignId, statusQuery.data?.status === 'completed')
=======
  const campaignMutation = useFullCampaignFlow()
>>>>>>> Stashed changes

  const phases = [
    {
      title: "Initializing AI Team",
      description: "Setting up secure collaboration environment",
      duration: 2000
    },
    {
      title: "Image Analysis Phase",
      description: "AI agents analyzing your product images",
      duration: 5000
    },
    {
      title: "Market Research Phase", 
      description: "Gathering competitive intelligence and trends",
      duration: 8000
    },
    {
      title: "Cultural Intelligence",
      description: "Applying cultural adaptations for target markets",
      duration: 4000
    },
    {
      title: "Visual Asset Generation",
      description: "Creating video scripts, images, and ad creatives",
      duration: 25000
    },
    {
      title: "Campaign Strategy",
      description: "Finalizing comprehensive campaign strategy",
      duration: 10000
    }
  ]

  // Simulate agent messages and collaboration
  const agentMessageTemplates = {
    "campaign-strategist": [
      "Analyzing product positioning and brand messaging...",
      "Identifying key value propositions for your audience...",
      "Developing creative campaign concepts...",
      "Finalizing strategic recommendations..."
    ],
    "cultural-expert": [
      "Researching cultural preferences for target markets...",
      "Adapting messaging for local audiences...",
      "Ensuring cultural sensitivity across campaigns...",
      "Optimizing for regional preferences..."
    ],
    "market-researcher": [
      "Scanning competitor landscape and trends...",
      "Analyzing audience behavior patterns...",
      "Identifying market opportunities...",
      "Compiling actionable market insights..."
    ],
    "creative-director": [
      "Generating engaging content concepts...",
      "Optimizing for platform-specific formats...",
      "Creating viral-worthy content ideas...",
      "Finalizing creative assets..."
    ],
    "performance-analyst": [
      "Setting up performance tracking metrics...",
      "Analyzing optimization opportunities...",
      "Configuring A/B testing strategies...",
      "Preparing performance forecasts..."
    ]
  }

  useEffect(() => {
    if (!hasStarted.current && !isProcessing.current) {
      hasStarted.current = true
      isProcessing.current = true
      
      // Initialize agent states
      const initialStates = aiTeam.reduce((acc, agent) => ({
        ...acc,
        [agent.id]: { status: 'initializing', progress: 0, currentTask: 'Preparing...' }
      }), {})
      setAgentStates(initialStates)

<<<<<<< Updated upstream
      // Start campaign processing with real data from form
      const campaignData = JSON.parse(localStorage.getItem('campaignData') || '{}')
      
      processCampaignMutation.mutate({
        files,
        description,
        category,
        platform,
        selectedRegions: campaignData.selectedRegions || [],
        competitorUrls: campaignData.competitorUrls || [],
        finalPrice: campaignData.finalPrice || 29
      }, {
        onSuccess: (data) => {
          setCampaignId(data.campaignId)
        },
        onError: (error) => {
          console.error('Campaign processing failed:', error)
        }
      })

      // Start UI simulation for better UX
      simulateAgentCollaboration()
    }
  }, [])

  const simulateAgentCollaboration = () => {
    let phaseIndex = 0
    let totalTime = 0

    const runPhase = () => {
      if (phaseIndex >= phases.length) return

      const phase = phases[phaseIndex]
      setCurrentPhase(phaseIndex)

      // Update agent states for this phase
      aiTeam.forEach((agent, agentIndex) => {
        setTimeout(() => {
          setAgentStates(prev => ({
            ...prev,
            [agent.id]: {
              status: 'active',
              progress: 0,
              currentTask: (agentMessageTemplates as any)[agent.id]?.[Math.min(phaseIndex, (agentMessageTemplates as any)[agent.id]?.length - 1)] || 'Working...'
            }
          }))

          // Add agent message
          setAgentMessages(prev => [...prev, {
            id: Date.now() + agentIndex,
            agentId: agent.id,
            agentName: agent.name,
            message: (agentMessageTemplates as any)[agent.id]?.[Math.min(phaseIndex, (agentMessageTemplates as any)[agent.id]?.length - 1)] || 'Working on your campaign...',
            timestamp: new Date(),
            gradient: agent.gradient,
            icon: agent.icon
          }])
        }, agentIndex * 800)
=======
      // Start real campaign generation
      const product = {
        name: description.split(' ').slice(0, 3).join(' ') || 'Product',
        category: category,
        description: description
      }
      
      const target_markets = [platform || 'global']
      const campaign_goals = [selectedGoal.id === 'viral-content' ? 'engagement' : 'brand_awareness']
      const useComprehensive = files.length > 0
      
      console.log('Starting real API campaign generation:', {
        product,
        target_markets,
        campaign_goals,
        useComprehensive,
        filesCount: files.length
>>>>>>> Stashed changes
      })
      
      // Debug files array
      console.log('Files received in processing:', files, 'Length:', files?.length)
      if (files && files.length > 0) {
        console.log('First file details:', {
          name: files[0]?.name,
          type: files[0]?.type,
          size: files[0]?.size
        })
      }
      
      // Ensure we have files array, even if empty
      const safeFiles = files || []
      
      campaignMutation.mutate({
        files: safeFiles,
        product,
        target_markets,
        campaign_goals,
        useComprehensive,
        onProgress: (step: string, progressValue: number) => {
          console.log('Progress update:', step, progressValue + '%')
          setProgress(progressValue)
          // Update current phase based on progress
          const phaseIndex = Math.floor((progressValue / 100) * phases.length)
          setCurrentPhase(Math.min(phaseIndex, phases.length - 1))
          
          // Update agent states based on progress
          aiTeam.forEach(agent => {
            setAgentStates(prev => ({
              ...prev,
              [agent.id]: {
                status: progressValue === 100 ? 'complete' : 'active',
                progress: progressValue,
                currentTask: step
              }
            }))
          })
        }
      })
    }
  }, [])

  // Add agent messages during real API processing
  useEffect(() => {
    if (campaignMutation.isPending && progress > 0) {
      const phaseIndex = Math.floor((progress / 100) * phases.length)
      const currentPhase = phases[phaseIndex] || phases[phases.length - 1]
      
      // Add agent message based on current progress
      const randomAgent = aiTeam[Math.floor(Math.random() * aiTeam.length)]
      if (randomAgent) {
        const message = (agentMessageTemplates as any)[randomAgent.id]?.[Math.min(phaseIndex, (agentMessageTemplates as any)[randomAgent.id]?.length - 1)] || 'Processing your campaign...'
        
        setAgentMessages(prev => {
          // Avoid duplicate messages
          const lastMessage = prev[prev.length - 1]
          if (lastMessage?.message === message) return prev
          
          return [...prev, {
            id: Date.now(),
            agentId: randomAgent.id,
            agentName: randomAgent.name,
            message,
            timestamp: new Date(),
            gradient: randomAgent.gradient,
            icon: randomAgent.icon
          }]
        })
      }
    }
  }, [progress, campaignMutation.isPending])

  // Handle completion with real API results
  useEffect(() => {
    if (resultsQuery.isSuccess && resultsQuery.data) {
      onComplete(resultsQuery.data)
    }
  }, [resultsQuery.isSuccess, resultsQuery.data, onComplete])

  // Update phases based on API status
  useEffect(() => {
<<<<<<< Updated upstream
    if (statusQuery.data?.currentPhase) {
      const phaseIndex = phases.findIndex(p => p.title.toLowerCase().includes(statusQuery.data.currentPhase.toLowerCase()))
      if (phaseIndex >= 0) {
        setCurrentPhase(phaseIndex)
      }
    }
  }, [statusQuery.data?.currentPhase, phases])

  const error = processCampaignMutation.error || statusQuery.error || resultsQuery.error
=======
    if (campaignMutation.isSuccess && campaignMutation.data) {
      console.log('Campaign generation successful:', campaignMutation.data)
      onComplete(campaignMutation.data)
    }
  }, [campaignMutation.isSuccess, campaignMutation.data, onComplete])

  // Handle errors
  useEffect(() => {
    if (campaignMutation.error) {
      console.error('Campaign generation failed:', campaignMutation.error)
    }
  }, [campaignMutation.error])

  const error = campaignMutation.error
>>>>>>> Stashed changes

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          <Users className="w-4 h-4" />
          Team Collaboration
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
          Your Marketing Team Is
          <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Collaborating
          </span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Watch your marketing specialists work together to create the perfect campaign for "{selectedGoal.title}"
        </p>
      </div>

      {/* Current Phase */}
      <Card className="border-0 shadow-xl bg-blue-50">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 rounded-full shadow-lg">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900">{phases[currentPhase]?.title}</span>
            </div>
            <p className="text-lg text-slate-600">{phases[currentPhase]?.description}</p>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">Phase {currentPhase + 1} of {phases.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Team Status */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Team Status
          </h3>
          
          <div className="space-y-4">
            {aiTeam.map((agent, index) => {
              const Icon = agent.icon
              const state = agentStates[agent.id] || { status: 'initializing', progress: 0, currentTask: 'Preparing...' }
              
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg ${
                        state.status === 'active' ? 'animate-pulse' : ''
                      }`}>
                        {Icon && <Icon className="w-7 h-7 text-white" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-900">{agent.name}</h4>
                          <Badge className={cn(
                            state.status === 'complete' ? 'bg-green-100 text-green-700 border-green-200' :
                            state.status === 'active' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            'bg-slate-100 text-slate-600 border-slate-200'
                          )}>
                            {state.status === 'complete' && <Check className="w-3 h-3 mr-1" />}
                            {state.status === 'active' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                            {state.status === 'complete' ? 'Complete' : 
                             state.status === 'active' ? 'Working' : 'Preparing'}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-slate-600 mb-3">{state.currentTask}</p>
                        
                        {state.status !== 'initializing' && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600">Progress</span>
                              <span className="font-medium text-slate-900">{Math.round(state.progress)}%</span>
                            </div>
                            <Progress value={state.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Agent Messages */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Team Communication
          </h3>
          
          <Card className="border-0 shadow-lg h-96 overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="h-full overflow-y-auto p-4 space-y-3">
                {agentMessages.map((message) => {
                  const Icon = message.icon
                  return (
                    <div key={message.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0`}>
                        {Icon && <Icon className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-900 text-sm">{message.agentName}</span>
                          <span className="text-xs text-slate-500">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{message.message}</p>
                      </div>
                    </div>
                  )
                })}
                
                {agentMessages.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Team communication will appear here...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-0 shadow-xl bg-red-50 border-red-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-red-900 text-lg">Collaboration Error</h4>
                <p className="text-red-700">Something went wrong during the AI team collaboration</p>
              </div>
            </div>
            <p className="text-red-800 mb-6 bg-red-100 p-4 rounded-xl">{error || 'An unexpected error occurred'}</p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Loader2 className="w-4 h-4 mr-2" />
              Restart Collaboration
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}