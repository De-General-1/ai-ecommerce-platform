"use client"

import { Folder, Target, Lightbulb, Rocket } from "lucide-react"

interface OverviewStatsProps {
  category: string
  platform: string
  contentIdeasCount: number
  campaignsCount: number
}

export function OverviewStats({ category, platform, contentIdeasCount, campaignsCount }: OverviewStatsProps) {
  const stats = [
    {
      icon: Folder,
      label: "Category",
      value: category || 'N/A',
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-100",
      borderColor: "border-blue-200/50"
    },
    {
      icon: Target,
      label: "Platform", 
      value: platform || 'N/A',
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-100", 
      borderColor: "border-purple-200/50"
    },
    {
      icon: Lightbulb,
      label: "Content Ideas",
      value: contentIdeasCount.toString(),
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100",
      borderColor: "border-green-200/50"
    },
    {
      icon: Rocket,
      label: "Campaigns",
      value: campaignsCount.toString(), 
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-yellow-100",
      borderColor: "border-orange-200/50"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div 
            key={index}
            className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 border ${stat.borderColor} hover:shadow-lg transition-all duration-300 group`}
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-slate-600 mb-2 font-medium">{stat.label}</div>
            <div className="text-xl font-bold text-slate-900 capitalize">
              {stat.value}
            </div>
          </div>
        )
      })}
    </div>
  )
}