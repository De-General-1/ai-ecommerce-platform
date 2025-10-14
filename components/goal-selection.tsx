"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket, TrendingUp, Search, Palette, Zap, Globe, Users, BarChart3 } from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  icon: any
  gradient: string
  agents: string[]
  complexity: "Simple" | "Advanced"
  estimatedTime: string
  features: string[]
}

const iconMap = {
  Rocket,
  TrendingUp,
  Search,
  Palette,
  Zap
} as const

interface GoalSelectionProps {
  onGoalSelect: (goal: Goal) => void
}

export function GoalSelection({ onGoalSelect }: GoalSelectionProps) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/goals.json')
      .then(res => res.json())
      .then(data => {
        const goalsWithIcons = data.map((goal: any) => ({
          ...goal,
          icon: iconMap[goal.iconName as keyof typeof iconMap]
        }))
        setGoals(goalsWithIcons)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal)
    setTimeout(() => onGoalSelect(goal), 300)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          <Zap className="w-4 h-4" />
          Marketing Goals
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
          What's Your
          <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Marketing Goal?
          </span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Choose your objective and our marketing specialists will assemble the perfect strategy to achieve your goals
        </p>
      </div>

      {/* Goal Cards */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="border-2 border-slate-200">
              <CardContent className="p-8">
                <div className="animate-pulse space-y-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          goals.map((goal) => {
          const Icon = goal.icon
          const isSelected = selectedGoal?.id === goal.id
          const isHovered = hoveredGoal === goal.id

          return (
            <Card
              key={goal.id}
              className={`relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl group ${
                isSelected 
                  ? 'border-blue-500 shadow-2xl scale-105' 
                  : 'border-slate-200 hover:border-blue-300'
              }`}
              onMouseEnter={() => setHoveredGoal(goal.id)}
              onMouseLeave={() => setHoveredGoal(null)}
              onClick={() => handleGoalSelect(goal)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              <CardContent className="p-8 relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={goal.complexity === 'Simple' ? 'secondary' : 'default'}>
                      {goal.complexity}
                    </Badge>
                    <span className="text-sm text-slate-500 font-medium">{goal.estimatedTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                      {goal.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>

                  {/* AI Team */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Your Marketing Team
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {goal.agents.map((agent: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                        >
                          {agent}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Key Features
                    </h4>
                    <ul className="space-y-1">
                      {goal.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                      {goal.features.length > 3 && (
                        <li className="text-sm text-slate-500 italic">
                          +{goal.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })
        )}
      </div>

      {/* Mode Toggle */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center gap-4 p-2 bg-slate-100 rounded-full">
          <Button variant="ghost" size="sm" className="rounded-full">
            <Zap className="w-4 h-4 mr-2" />
            Quick Mode
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full bg-white shadow-sm">
            <Globe className="w-4 h-4 mr-2" />
            Advanced Mode
          </Button>
        </div>
        <p className="text-sm text-slate-500 mt-2">
          Switch between simplified and advanced campaign creation
        </p>
      </div>
    </div>
  )
}