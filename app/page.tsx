"use client"

import { Upload, Zap, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
            <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20`}></div>

            <div className="relative container mx-auto px-4 py-20 lg:py-32">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  AI E-Commerce Growth Agent
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
                  Transform any product photo into viral marketing campaigns in minutes
                </p>
                <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
                  Upload your product image and watch our AI create platform-specific content, engagement strategies, and complete marketing campaigns that drive real results.
                </p>
                
                <div className="flex justify-center">
                  <Link 
                    href="/campaign"
                    className="inline-flex items-center px-8 py-4 text-lg font-semibold text-indigo-900 bg-white rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-white/25"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">Three simple steps to transform your product into a marketing powerhouse</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow-elegant">
                  <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Upload Your Product</h3>
                  <p className="text-slate-600">Simply upload a photo of your product with a brief description</p>
                </div>
                
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 shadow-elegant">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">2. AI Analysis</h3>
                  <p className="text-slate-600">Our AI analyzes your product and generates targeted marketing strategies</p>
                </div>
                
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 shadow-elegant">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">3. Get Your Campaigns</h3>
                  <p className="text-slate-600">Receive complete marketing campaigns ready to boost your sales</p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-6">Why Choose Our AI Agent?</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Save Time & Money</h3>
                        <p className="text-slate-600">Get professional marketing campaigns in minutes, not weeks. No expensive agencies needed.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Multi-Platform Ready</h3>
                        <p className="text-slate-600">Get optimized content for Instagram, TikTok, Facebook, and more - all from one upload.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Data-Driven Results</h3>
                        <p className="text-slate-600">Our AI uses proven marketing strategies and engagement data to maximize your reach.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-elegant-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">85%</div>
                    <div className="text-slate-600 mb-6">Average engagement increase</div>
                    
                    <div className="text-4xl font-bold text-purple-600 mb-2">5 min</div>
                    <div className="text-slate-600 mb-6">From upload to campaign</div>
                    
                    <div className="text-4xl font-bold text-green-600 mb-2">$0</div>
                    <div className="text-slate-600">Get started for free</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Marketing?</h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using AI to create viral marketing campaigns
              </p>
              <Link 
                href="/campaign"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                Start Creating Campaigns
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-900 text-white py-12">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-2xl font-bold mb-4">AI E-Commerce Growth Agent</h3>
              <p className="text-slate-400 mb-6">Powered by De-Generals</p>
              <p className="text-slate-500 text-sm">© 2025 AI E-Commerce Growth Agent. All rights reserved.</p>
            </div>
          </footer>
    </div>
  )
}
