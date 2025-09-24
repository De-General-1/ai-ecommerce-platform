"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { CampaignCards } from "@/components/campaign-cards"
import { ContentIdeas } from "@/components/content-ideas"
import { GeneratedAssets } from "@/components/generated-assets"
import { Download, RefreshCw, Share2, TrendingUp, CheckCircle, BarChart3, Rocket, Lightbulb, Palette, Video, Folder, Target } from "lucide-react"
import { useProductData } from "@/lib/queries"

interface ResultsStepProps {
  results: any
  onReset: () => void
}

export function ResultsStep({ results, onReset }: ResultsStepProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [imageHash, setImageHash] = useState<string | null>(null)
  
  // Get stored image hash for background refetching
  useEffect(() => {
    const stored = localStorage.getItem('imageHashes')
    if (stored) {
      const hashes = JSON.parse(stored)
      setImageHash(hashes[0])
    }
  }, [])
  
  // Background refetch of product data
  const productDataQuery = useProductData(imageHash, !!imageHash)
  
  // Use fresh data if available, fallback to passed results
  const displayResults = productDataQuery.data || results

  const handleExport = (format: "pdf" | "csv" | "json") => {
    // Mock export functionality
    const data = JSON.stringify(displayResults, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `marketing-campaign.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!displayResults) {
    return <div>Loading results...</div>
  }

  const contentIdeas = displayResults?.parsedCampaigns?.content_ideas || []
  const avgEngagementScore = contentIdeas.length > 0 
    ? contentIdeas.reduce((acc: number, idea: any) => acc + idea.engagement_score, 0) / contentIdeas.length 
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Success Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-16">
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30`}></div>

        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Your Campaigns Are Ready!
            </h1>
            <p className="text-xl text-green-100 mb-6">
              AI has generated {displayResults.parsedCampaigns?.campaigns?.length || 0} complete marketing campaigns for your product
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-green-100">{avgEngagementScore.toFixed(0)}% Avg. Engagement Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-green-100">{contentIdeas.length} Content Ideas Generated</span>
              </div>
              {productDataQuery.isFetching && (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span className="text-green-100">Updating...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-elegant border border-white/20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Export & Share Your Campaigns</h3>
              <p className="text-slate-600">Download your campaign data or share with your team</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                className="bg-white/50 cursor-pointer hover:bg-white border-slate-200 text-slate-700"
                onClick={() => handleExport("pdf")}
              >
                <Download className="w-4 h-4 mr-2" />
                PDF Report
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/50 cursor-pointer hover:bg-white border-slate-200 text-slate-700"
                onClick={() => handleExport("csv")}
              >
                <Download className="w-4 h-4 mr-2" />
                CSV Data
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/50 cursor-pointer hover:bg-white border-slate-200 text-slate-700"
                onClick={() => handleExport("json")}
              >
                <Download className="w-4 h-4 mr-2" />
                JSON Export
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/50 cursor-pointer hover:bg-white border-slate-200 text-slate-700"
                onClick={onReset}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-elegant border border-white/20 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50/50">
              <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 py-4 px-6 font-medium"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="campaigns" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 py-4 px-6 font-medium"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Campaigns
                </TabsTrigger>
                <TabsTrigger 
                  value="content" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 py-4 px-6 font-medium"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Content Ideas
                </TabsTrigger>
                <TabsTrigger 
                  value="assets" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 py-4 px-6 font-medium"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Assets
                </TabsTrigger>
                <TabsTrigger 
                  value="videos" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 py-4 px-6 font-medium"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Videos
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-8 space-y-8">
              {/* Campaign Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200/50">
                  <Folder className="w-6 h-6 mb-2 text-blue-600" />
                  <div className="text-sm text-slate-600 mb-1">Category</div>
                  <div className="text-lg font-semibold text-slate-900 capitalize">
                    {displayResults.parsedCampaigns?.category || 'N/A'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200/50">
                  <Target className="w-6 h-6 mb-2 text-purple-600" />
                  <div className="text-sm text-slate-600 mb-1">Platform</div>
                  <div className="text-lg font-semibold text-slate-900 capitalize">
                    {displayResults.parsedCampaigns?.platform || 'N/A'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200/50">
                  <Lightbulb className="w-6 h-6 mb-2 text-green-600" />
                  <div className="text-sm text-slate-600 mb-1">Content Ideas</div>
                  <div className="text-lg font-semibold text-slate-900">
                    {contentIdeas.length}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-xl p-6 border border-orange-200/50">
                  <Rocket className="w-6 h-6 mb-2 text-orange-600" />
                  <div className="text-sm text-slate-600 mb-1">Campaigns</div>
                  <div className="text-lg font-semibold text-slate-900">
                    {displayResults.parsedCampaigns?.campaigns?.length || 0}
                  </div>
                </div>
              </div>
              
              <AnalyticsDashboard results={displayResults.parsedCampaigns || displayResults} />
            </TabsContent>

            <TabsContent value="campaigns" className="p-8">
              <CampaignCards campaigns={displayResults.parsedCampaigns?.campaigns || []} />
            </TabsContent>

            <TabsContent value="content" className="p-8">
              <ContentIdeas ideas={displayResults.parsedCampaigns?.content_ideas || []} />
            </TabsContent>

            <TabsContent value="assets" className="p-8">
              <GeneratedAssets assets={displayResults.parsedCampaigns?.generated_assets || {}} />
            </TabsContent>

            <TabsContent value="videos" className="p-8">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Video className="w-6 h-6 text-red-600" />
                    Related YouTube Videos
                  </h3>
                  <p className="text-slate-600">Discover trending content in your niche for inspiration</p>
                </div>
                
                {displayResults.youtubeResults?.length > 0 ? (
                  <div className="grid gap-6">
                    {displayResults.youtubeResults.map((video: any, index: any) => (
                      <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-elegant-lg transition-all duration-200">
                        <div className="flex items-start gap-6">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title} 
                              className="w-32 h-24 object-cover rounded-lg shadow-md" 
                            />
                            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">{video.title}</h4>
                            <p className="text-slate-600 mb-3">{video.channelTitle}</p>
                            <div className="flex items-center gap-6 text-sm text-slate-500">
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{video.viewCount?.toLocaleString()} views</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{video.likeCount?.toLocaleString()} likes</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>{video.commentCount?.toLocaleString()} comments</span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex-shrink-0"
                            asChild
                          >
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                              Watch
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📹</div>
                    <p className="text-slate-500 text-lg">No YouTube videos available for this product</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </div>
  )
}
