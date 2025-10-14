"use client"

import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/5 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl"></div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">Smart Marketing Platform</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold mb-8 text-white leading-tight">
            Transform Products Into
            <span className="block bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Marketing Success
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Upload any product photo and create platform-specific content, analyze market trends, and generate localized campaigns that drive real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl">
              <Link href="/campaign">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-black px-8 py-4 text-lg rounded-full backdrop-blur-sm">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-slate-400">Campaigns Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">85%</div>
              <div className="text-sm text-slate-400">Engagement Boost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-slate-400">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">2 min</div>
              <div className="text-sm text-slate-400">Average Setup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}