"use client"

import { Brain, Globe, MessageSquare, Palette, BarChart3, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Brain,
    title: "AI Campaign Generation",
    description: "Transform product photos into complete marketing campaigns with AI-powered content creation",
    status: "live",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: MessageSquare,
    title: "Voice of the Market",
    description: "Analyze competitor content and market reactions to optimize your campaigns with real insights",
    status: "coming-soon",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: Globe,
    title: "Lokalize",
    description: "Automatically adapt campaigns for different geographic markets with cultural intelligence",
    status: "coming-soon", 
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: Palette,
    title: "Content Studio",
    description: "Create and customize your own content with AI assistance and brand consistency tools",
    status: "coming-soon",
    gradient: "from-orange-500 to-red-600"
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track campaign performance across platforms with detailed engagement metrics",
    status: "live",
    gradient: "from-teal-500 to-cyan-600"
  },
  {
    icon: Zap,
    title: "Multi-Platform Publishing",
    description: "Deploy campaigns across Instagram, TikTok, Facebook, and YouTube simultaneously",
    status: "live",
    gradient: "from-yellow-500 to-amber-600"
  }
]

export function FeaturesShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6">Complete Marketing Suite</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-4">
              Dominate Social Media
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From AI-powered content generation to market intelligence and localization - 
            we've built the most comprehensive marketing platform for e-commerce brands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <CardContent className="p-8 relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge 
                      variant={feature.status === 'live' ? 'default' : 'secondary'}
                      className={feature.status === 'live' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}
                    >
                      {feature.status === 'live' ? 'Live' : 'Coming Soon'}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}