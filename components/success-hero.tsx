"use client"

import { CheckCircle, Sparkles, RefreshCw } from "lucide-react"

interface SuccessHeroProps {
  campaignCount: number
  avgEngagementScore: number
  contentIdeasCount: number
  isRefreshing?: boolean
}

export function SuccessHero({ campaignCount, avgEngagementScore, contentIdeasCount, isRefreshing }: SuccessHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white py-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-300/20 rounded-full blur-xl animate-bounce"></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Campaigns Are
            <span className="block bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Ready to Launch!
            </span>
          </h1>
          
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            AI has generated {campaignCount} complete marketing campaigns tailored for your product
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{avgEngagementScore.toFixed(0)}%</div>
              <div className="text-emerald-100 text-sm font-medium">Avg. Engagement Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{contentIdeasCount}</div>
              <div className="text-emerald-100 text-sm font-medium">Content Ideas</div>
            </div>
            <div className="text-center flex items-center justify-center gap-2">
              {isRefreshing && <RefreshCw className="w-5 h-5 animate-spin" />}
              <div>
                <div className="text-3xl font-bold text-white mb-2">Ready</div>
                <div className="text-emerald-100 text-sm font-medium">Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}