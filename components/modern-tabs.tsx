"use client"

import { BarChart3, Rocket, Lightbulb, Palette, Video } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ModernTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
  children: React.ReactNode
}

const tabConfig = [
  {
    value: "overview",
    label: "Overview",
    icon: BarChart3,
    description: "Campaign summary and analytics"
  },
  {
    value: "campaigns", 
    label: "Campaigns",
    icon: Rocket,
    description: "Complete marketing campaigns"
  },
  {
    value: "content",
    label: "Content Ideas", 
    icon: Lightbulb,
    description: "AI-generated content suggestions"
  },
  {
    value: "assets",
    label: "Assets",
    icon: Palette, 
    description: "Generated marketing assets"
  },
  {
    value: "videos",
    label: "Videos",
    icon: Video,
    description: "Related YouTube content"
  }
]

export function ModernTabs({ activeTab, onTabChange, children }: ModernTabsProps) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50/50">
          <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0">
            {tabConfig.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value}
                  className="group data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-none border-b-4 border-transparent data-[state=active]:border-indigo-500 py-6 px-4 font-medium transition-all duration-200 hover:bg-white/50"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="w-5 h-5 group-data-[state=active]:text-indigo-600 text-slate-500 transition-colors" />
                    <div className="text-sm group-data-[state=active]:text-slate-900 text-slate-600 transition-colors">
                      {tab.label}
                    </div>
                  </div>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {children}
      </Tabs>
    </div>
  )
}