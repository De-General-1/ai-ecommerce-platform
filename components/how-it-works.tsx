"use client"

import { Upload, Brain, Rocket, Globe, MessageSquare, Palette } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload & Describe",
    description: "Upload your product photos and provide a brief description of your target audience and goals",
    color: "blue"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI analyzes your product, identifies key features, and researches market trends",
    color: "purple"
  },
  {
    icon: MessageSquare,
    title: "Market Intelligence",
    description: "Voice of the Market analyzes competitor content and audience reactions for insights",
    color: "green"
  },
  {
    icon: Globe,
    title: "Localization",
    description: "Lokalize adapts your campaigns for different geographic markets and cultures",
    color: "pink"
  },
  {
    icon: Palette,
    title: "Content Creation",
    description: "Generate or customize content with our AI-assisted Content Studio",
    color: "orange"
  },
  {
    icon: Rocket,
    title: "Launch & Optimize",
    description: "Deploy across platforms and continuously optimize based on performance data",
    color: "teal"
  }
]

const colorMap = {
  blue: "from-blue-500 to-indigo-600",
  purple: "from-purple-500 to-violet-600", 
  green: "from-green-500 to-emerald-600",
  pink: "from-pink-500 to-rose-600",
  orange: "from-orange-500 to-red-600",
  teal: "from-teal-500 to-cyan-600"
}

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            From Product Photo to
            <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mt-6">
              Viral Campaign
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our comprehensive AI-powered workflow transforms your products into market-ready campaigns 
            with intelligence, localization, and optimization built-in.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const gradient = colorMap[step.color as keyof typeof colorMap]
              
              return (
                <div key={index} className="relative">
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-0"></div>
                  )}
                  
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 group">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mr-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm font-semibold text-slate-400">
                        Step {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}