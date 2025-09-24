"use client"

import { useState } from "react"
import { UploadStep } from "@/components/upload-step"
import { ProcessingStep } from "@/components/processing-step"
import { ResultsStep } from "@/components/results-step"
import { StepIndicator } from "@/components/step-indicator"
import { ErrorBoundary } from "@/components/error-boundary"
import { Play, Upload, Zap, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = landing, 1 = upload, 2 = processing, 3 = results
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [productDescription, setProductDescription] = useState("")
  const [category, setCategory] = useState("")
  const [targetPlatform, setTargetPlatform] = useState("")
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleGetStarted = () => {
    setCurrentStep(1)
  }

  const handleUploadComplete = (files: File[], description: string, cat: string, platform: string) => {
    setUploadedFiles(files)
    setProductDescription(description)
    setCategory(cat)
    setTargetPlatform(platform)
    setCurrentStep(2)
  }

  const handleProcessingComplete = (results: any) => {
    setAnalysisResults(results)
    setCurrentStep(3)
  }

  const resetWorkflow = () => {
    setCurrentStep(0)
    setUploadedFiles([])
    setProductDescription("")
    setCategory("")
    setTargetPlatform("")
    setAnalysisResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {currentStep === 0 ? (
        // Landing Page
        <>
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
                
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <button 
                    onClick={handleGetStarted}
                    className="inline-flex items-center px-8 py-4 text-lg font-semibold text-indigo-900 bg-white rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-white/25"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={() => {
                      const mockResults = {
                        parsedCampaigns: {
                          category: "Electronics",
                          platform: "Instagram",
                          description: "Revolutionary wireless charging pad with MagSafe technology",
                          content_ideas: [
                            {
                              topic: "Wireless Freedom Revolution",
                              platform: "Instagram",
                              engagement_score: 92,
                              caption: "Say goodbye to tangled cables! 🔋 Experience the future of charging with our MagSafe wireless pad. Clean setup, fast charging, perfect alignment every time. #WirelessCharging #MagSafe #TechLife #CleanSetup",
                              hashtags: ["#WirelessCharging", "#MagSafe", "#TechLife", "#CleanSetup", "#Innovation"]
                            },
                            {
                              topic: "Perfect Workspace Aesthetic",
                              platform: "TikTok",
                              engagement_score: 88,
                              caption: "POV: Your desk setup just got an upgrade ✨ Watch how this wireless charger transforms any workspace into a tech paradise. No more cable chaos! #DeskSetup #Aesthetic #TechTok #Minimalist",
                              hashtags: ["#DeskSetup", "#Aesthetic", "#TechTok", "#Minimalist", "#WorkspaceGoals"]
                            },
                            {
                              topic: "Travel Tech Essential",
                              platform: "YouTube",
                              engagement_score: 85,
                              caption: "Why this wireless charger is my #1 travel essential! Compact, powerful, and works with all my devices. Perfect for digital nomads and frequent travelers. #TravelTech #DigitalNomad #TechReview",
                              hashtags: ["#TravelTech", "#DigitalNomad", "#TechReview", "#Portable", "#Essential"]
                            }
                          ],
                          campaigns: [
                            {
                              name: "Wireless Revolution Campaign",
                              duration: "6 weeks",
                              posts_per_week: 4,
                              platforms: ["Instagram", "TikTok", "YouTube", "Facebook"],
                              calendar: {
                                "Week 1-2": "Product introduction with unboxing content, first impressions, and setup tutorials. Focus on the 'wow factor' of wireless charging.",
                                "Week 3-4": "Lifestyle integration content showing the charger in different environments - home office, bedroom, kitchen counter, travel scenarios.",
                                "Week 5-6": "User-generated content campaign with hashtag challenges, customer testimonials, and comparison videos with traditional chargers."
                              },
                              adaptations: {
                                "Instagram": "High-quality product photography with lifestyle shots. Stories showing time-lapse charging, polls about charging habits, and behind-the-scenes content.",
                                "TikTok": "Quick setup videos, aesthetic desk transformation content, 'satisfying' charging alignment videos, and trending audio overlays.",
                                "YouTube": "Detailed review videos, comparison tests, setup tutorials, and integration with popular tech YouTuber collaboration opportunities.",
                                "Facebook": "Educational posts about wireless charging technology, customer service integration, and community building through groups."
                              }
                            },
                            {
                              name: "Holiday Gift Campaign",
                              duration: "4 weeks",
                              posts_per_week: 3,
                              platforms: ["Instagram", "Facebook", "Pinterest"],
                              calendar: {
                                "Week 1": "Gift guide positioning - 'Perfect gift for tech lovers' with elegant packaging shots and gift-wrapping content.",
                                "Week 2-3": "Holiday lifestyle content showing the charger as part of cozy home setups, holiday morning routines, and family tech moments.",
                                "Week 4": "Last-minute gift promotion with fast shipping highlights and gift card options."
                              },
                              adaptations: {
                                "Instagram": "Festive flat-lay photography, gift guide carousels, and holiday-themed Stories with countdown stickers.",
                                "Facebook": "Holiday shopping posts with clear CTAs, customer testimonials from gift recipients, and seasonal promotions.",
                                "Pinterest": "Gift guide pins, holiday tech setup boards, and seasonal home office inspiration featuring the product."
                              }
                            }
                          ],
                          generated_assets: {
                            image_prompts: [
                              "Minimalist flat-lay of the wireless charger on a clean white marble desk with iPhone, AirPods, and a coffee cup, soft natural lighting from the side",
                              "Cozy bedroom nightstand setup with the charger, warm ambient lighting, book, and plant in the background, golden hour lighting",
                              "Modern home office workspace featuring the charger as part of a tech setup with laptop, monitor, and clean cable management",
                              "Travel scene with the charger in a hotel room or airplane tray table, showing portability and convenience"
                            ],
                            video_scripts: [
                              {
                                type: "Short form video (15-30s)",
                                content: "🔋 STOP scrolling if you're tired of cable chaos! This MagSafe wireless charger just changed my entire setup game. Watch this satisfying alignment... *shows phone snapping into perfect position* No more fumbling in the dark, no more worn-out cables. Just place and charge! Who else needs this level of zen in their life? #WirelessCharging #TechHacks #CleanSetup"
                              },
                              {
                                type: "Tutorial video (60s)",
                                content: "How to create the PERFECT charging station in under 2 minutes! ✨ Step 1: Find your ideal spot (nightstand, desk, or kitchen counter). Step 2: Place the MagSafe charger - no cables to manage! Step 3: Connect the single USB-C cable to power. Step 4: Enjoy effortless charging every time! Pro tip: The magnetic alignment means you'll never miss the sweet spot again. Your future self will thank you! #TechTutorial #HomeOrganization"
                              },
                              {
                                type: "Long form video (3-5 min)",
                                content: "I tested this wireless charger for 30 days - here's what happened. Day 1: Skeptical about wireless charging speed. Day 7: Noticed my phone battery health improving. Day 15: Realized I haven't touched a charging cable in weeks. Day 30: This is now essential to my daily routine. Let me show you the real-world performance, heat management, and why this beats every other wireless charger I've tried..."
                              }
                            ],
                            email_templates: [
                              {
                                subject: "🔋 Your Wireless Charging Revolution Starts Now!",
                                body: "Hi [Name],\n\nTired of cable chaos? Ready to experience the future of charging?\n\nYour MagSafe Wireless Charger is ready to transform your daily routine:\n\n✅ Perfect magnetic alignment every time\n✅ Fast 15W wireless charging\n✅ Sleek design that complements any space\n✅ Compatible with iPhone 12+ and MagSafe accessories\n\nWhat customers are saying:\n'This charger has completely changed my bedside routine!' - Sarah M.\n'Finally, a wireless charger that actually works perfectly!' - Mike T.\n\nReady to upgrade your charging game?\n\n[SHOP NOW - Free Shipping]\n\nQuestions? Reply to this email - we're here to help!\n\nBest,\nThe Wireless Revolution Team"
                              }
                            ],
                            blog_outlines: [
                              {
                                title: "The Complete Guide to MagSafe Wireless Charging: Everything You Need to Know in 2024",
                                points: [
                                  "What is MagSafe technology and how does it work?",
                                  "MagSafe vs. traditional wireless charging: speed and efficiency comparison",
                                  "Setting up your perfect MagSafe charging station at home and office",
                                  "Compatible devices and accessories that work with MagSafe",
                                  "Troubleshooting common MagSafe charging issues",
                                  "Future of wireless charging: what's coming next?"
                                ]
                              },
                              {
                                title: "5 Ways Wireless Charging Will Transform Your Daily Routine",
                                points: [
                                  "Morning routine: effortless phone pickup without cable untangling",
                                  "Workspace productivity: cleaner desk setup improves focus",
                                  "Bedtime charging: safer and more convenient nightstand setup",
                                  "Travel convenience: one less cable to pack and manage",
                                  "Device longevity: reduced wear on charging ports extends phone life"
                                ]
                              }
                            ]
                          }
                        },
                        youtubeResults: [
                          {
                            title: "MagSafe Wireless Charger Review - Is It Worth The Hype?",
                            channelTitle: "Tech Reviews Pro",
                            viewCount: 245000,
                            likeCount: 18500,
                            commentCount: 2840,
                            thumbnailUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=320&h=180&fit=crop",
                            url: "https://youtube.com/watch?v=demo1"
                          },
                          {
                            title: "Wireless Charging Setup Tour - Clean Desk Aesthetic",
                            channelTitle: "Minimalist Tech",
                            viewCount: 156000,
                            likeCount: 12200,
                            commentCount: 1650,
                            thumbnailUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=320&h=180&fit=crop",
                            url: "https://youtube.com/watch?v=demo2"
                          },
                          {
                            title: "Why I Switched to Wireless Charging - 6 Month Update",
                            channelTitle: "Everyday Tech Tips",
                            viewCount: 89000,
                            likeCount: 7800,
                            commentCount: 890,
                            thumbnailUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&fit=crop",
                            url: "https://youtube.com/watch?v=demo3"
                          }
                        ],
                        generated_at: new Date().toISOString(),
                        recordId: "demo-wireless-charger-campaign",
                        source_table: "demo",
                        _processing_time_ms: 2150
                      }
                      setAnalysisResults(mockResults)
                      setCurrentStep(3)
                    }}
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    View Demo Results
                  </button>
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
              <button 
                onClick={handleGetStarted}
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                Start Creating Campaigns
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
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
        </>
      ) : (
        // Application Flow
        <>
          {/* Header */}
          <header className="relative overflow-hidden bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-elegant">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5"></div>
            <div className="relative container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI E-Commerce Growth Agent
                </h1>
                <button 
                  onClick={resetWorkflow}
                  className="text-slate-600 hover:text-slate-900 text-sm font-medium"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
              {currentStep > 0 && <StepIndicator currentStep={currentStep} />}

              <div className="mt-12">
                <ErrorBoundary>
                  {currentStep === 1 && <UploadStep onComplete={handleUploadComplete} />}

                  {currentStep === 2 && (
                    <ProcessingStep
                      files={uploadedFiles}
                      description={productDescription}
                      category={category}
                      platform={targetPlatform}
                      onComplete={handleProcessingComplete}
                    />
                  )}

                  {currentStep === 3 && <ResultsStep results={analysisResults} onReset={resetWorkflow} />}
                </ErrorBoundary>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  )
}
