"use client"

import { useState, useEffect } from "react"
import { TabsContent } from "@/components/ui/tabs"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { CampaignCards } from "@/components/campaign-cards"
import { ContentIdeas } from "@/components/content-ideas"
import { GeneratedAssets } from "@/components/generated-assets"
import { SuccessHero } from "@/components/success-hero"
import { ResultsActions } from "@/components/results-actions"
import { ModernTabs } from "@/components/modern-tabs"
import { OverviewStats } from "@/components/overview-stats"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
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
      <SuccessHero 
        campaignCount={displayResults.parsedCampaigns?.campaigns?.length || 0}
        avgEngagementScore={avgEngagementScore}
        contentIdeasCount={contentIdeas.length}
        isRefreshing={productDataQuery.isFetching}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <ResultsActions onExport={handleExport} onReset={onReset} />

          <ModernTabs activeTab={activeTab} onTabChange={setActiveTab}>

            <TabsContent value="overview" className="p-8 space-y-8">
              <OverviewStats 
                category={displayResults.parsedCampaigns?.category || 'N/A'}
                platform={displayResults.parsedCampaigns?.platform || 'N/A'}
                contentIdeasCount={contentIdeas.length}
                campaignsCount={displayResults.parsedCampaigns?.campaigns?.length || 0}
              />
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
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-50 rounded-full border border-red-200 mb-4">
                    <Video className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">Market Research</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    Related YouTube Videos
                  </h3>
                  <p className="text-lg text-slate-600">Discover trending content in your niche for inspiration</p>
                </div>
                
                {displayResults.youtubeResults?.length > 0 ? (
                  <div className="grid gap-6">
                    {displayResults.youtubeResults.map((video: any, index: any) => (
                      <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-start gap-8">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title} 
                              className="w-40 h-28 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow" 
                            />
                            <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-slate-700 transition-colors">{video.title}</h4>
                            <p className="text-slate-600 mb-4 font-medium">{video.channelTitle}</p>
                            <div className="flex items-center gap-8 text-sm text-slate-500 mb-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </div>
                                <span className="font-medium">{video.viewCount?.toLocaleString()} views</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                </div>
                                <span className="font-medium">{video.likeCount?.toLocaleString()} likes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                  </svg>
                                </div>
                                <span className="font-medium">{video.commentCount?.toLocaleString()} comments</span>
                              </div>
                            </div>
                            <Button 
                              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                              asChild
                            >
                              <a href={video.url} target="_blank" rel="noopener noreferrer">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                                Watch on YouTube
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Video className="w-12 h-12 text-slate-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-2">No Videos Found</h4>
                    <p className="text-slate-600 text-lg">No YouTube videos available for this product category</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </ModernTabs>
        </div>
      </div>
    </div>
  )
}
