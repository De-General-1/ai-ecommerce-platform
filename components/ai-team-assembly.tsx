"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Brain, Globe, Search, Palette, BarChart3, CheckCircle, Loader2, ArrowRight } from "lucide-react"

interface Agent {
  id: string
  name: string
  role: string
  description: string
  icon: any
  gradient: string
  status: "assembling" | "ready" | "active"
  expertise: string[]
}

const iconMap = {
  Brain,
  Globe,
  Search,
  Palette,
  BarChart3
} as const

interface AITeamAssemblyProps {
  selectedGoal: any
  onTeamReady: (team: Agent[]) => void
}

export function AITeamAssembly({ selectedGoal, onTeamReady }: AITeamAssemblyProps) {
  const [assemblyProgress, setAssemblyProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState("Analyzing your goal...")
  const [teamAgents, setTeamAgents] = useState<Agent[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [agentProfiles, setAgentProfiles] = useState<Record<string, Agent>>({})

  const phases = [
    "Analyzing your marketing goal...",
    "Selecting optimal marketing specialists...", 
    "Configuring team collaboration...",
    "Preparing specialized tools...",
    "Your marketing team is ready!"
  ]

  useEffect(() => {
    // Load agent profiles
    fetch('/agent-profiles.json')
      .then(res => res.json())
      .then(data => {
        const profilesWithIcons = Object.keys(data).reduce((acc, key) => {
          acc[key] = {
            ...data[key],
            icon: iconMap[data[key].iconName as keyof typeof iconMap]
          }
          return acc
        }, {} as Record<string, Agent>)
        setAgentProfiles(profilesWithIcons)
        
        // Map goal agents to actual agent profiles
        const goalAgentMap: Record<string, string> = {
          "Campaign Strategist": "campaign-strategist",
          "Cultural Expert": "cultural-expert", 
          "Market Researcher": "market-researcher",
          "Creative Director": "creative-director",
          "Performance Analyst": "performance-analyst",
          "Viral Strategist": "creative-director",
          "Content Creator": "creative-director",
          "Campaign Assistant": "campaign-strategist",
          "Content Optimizer": "performance-analyst",
          "Trend Analyst": "market-researcher",
          "Audience Expert": "market-researcher"
        }

        const selectedAgents = selectedGoal.agents.map((agentName: string) => {
          const agentId = goalAgentMap[agentName] || "campaign-strategist"
          return { ...profilesWithIcons[agentId] }
        })

        setTeamAgents(selectedAgents)
        
        // Simulate assembly process
        let progress = 0
        let phaseIndex = 0
        
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 5
          
          if (progress >= 100) {
            progress = 100
            setIsComplete(true)
            clearInterval(interval)
            setTimeout(() => onTeamReady(selectedAgents), 1000)
          }
          
          // Update phase
          const newPhaseIndex = Math.min(Math.floor((progress / 100) * phases.length), phases.length - 1)
          if (newPhaseIndex !== phaseIndex) {
            phaseIndex = newPhaseIndex
            setCurrentPhase(phases[phaseIndex])
            
            // Update agent statuses
            setTeamAgents(prev => prev.map((agent, index) => ({
              ...agent,
              status: index <= phaseIndex - 1 ? "ready" : "assembling"
            })))
          }
          
          setAssemblyProgress(progress)
        }, 800)
        
        return () => clearInterval(interval)
      })

  }, [selectedGoal, onTeamReady])

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          <Users className="w-4 h-4" />
          Team Assembly
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
          Your Marketing Team
          <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Is Assembling
          </span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          We're bringing together the perfect specialists for your "{selectedGoal.title}" goal
        </p>
      </div>

      {/* Progress Section */}
      <Card className="border-0 shadow-xl bg-blue-50">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{currentPhase}</h3>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-medium">{Math.round(assemblyProgress)}% Complete</span>
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <Progress value={assemblyProgress} className="h-3 bg-white/50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamAgents.map((agent, index) => {
          const Icon = agent.icon
          const isReady = agent.status === "ready"
          const isAssembling = agent.status === "assembling"

          return (
            <Card
              key={`${agent.id}-${index}`}
              className={`relative overflow-hidden border-2 transition-all duration-500 ${
                isReady 
                  ? 'border-green-300 shadow-lg scale-105' 
                  : 'border-slate-200'
              }`}
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-blue-50 opacity-${isReady ? '50' : '20'} transition-opacity duration-500`}></div>
              
              <CardContent className="p-6 relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg transition-transform duration-500 ${
                    isReady ? 'scale-110' : ''
                  }`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isReady ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ready
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Assembling
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{agent.role}</p>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Expertise */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.expertise.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {agent.expertise.length > 2 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">
                          +{agent.expertise.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Continue Button */}
      {isComplete && (
        <div className="text-center pt-8">
          <Button
            size="lg"
            className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={() => onTeamReady(teamAgents)}
          >
            Continue with Your Team
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}