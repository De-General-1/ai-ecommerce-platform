"use client"

import { useState, useEffect } from "react"
import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import dynamic from "next/dynamic"

// Dynamic imports for heavy chart components
const AnalyticsDashboard = dynamic(() => import("@/components/analytics-dashboard").then(mod => ({ default: mod.AnalyticsDashboard })), {
  loading: () => <div className="flex items-center justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div></div>
})

const CampaignCards = dynamic(() => import("@/components/campaign-cards").then(mod => ({ default: mod.CampaignCards })))
const ContentIdeas = dynamic(() => import("@/components/content-ideas").then(mod => ({ default: mod.ContentIdeas })))
const GeneratedAssets = dynamic(() => import("@/components/generated-assets").then(mod => ({ default: mod.GeneratedAssets })))
import { SuccessHero } from "@/components/success-hero"
import { ResultsActions } from "@/components/results-actions"
import { ModernTabs } from "@/components/modern-tabs"
import { OverviewStats } from "@/components/overview-stats"
import { Download, Share2, RefreshCw, Video, Users, Brain, MessageSquare, Award, TrendingUp } from "lucide-react"

interface EnhancedResultsProps {
  results: any
  selectedGoal: any
  aiTeam: any[]
  category?: string
  platform?: string
  onReset: () => void
}

export function EnhancedResults({ results, selectedGoal, aiTeam, category, platform, onReset }: EnhancedResultsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Extract data from the actual API response structure
  const campaign = results?.campaign || {}
  const contentIdeas = campaign?.content_ideas || []
  const campaigns = campaign?.campaigns || []
  const generatedAssets = campaign?.generated_assets || {}
  const platformContent = campaigns || {}
  const marketTrends = results?.market_insights || { youtube_videos: [] }
  const platformRecommendations = results?.platform_recommendations || { primary_platforms: [], rationale: "" }
  const marketInsights = results?.market_insights || { trending_content_types: [], cultural_considerations: [], audience_preferences: [] }
  const relatedVideos = results?.related_youtube_videos || []

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const data = JSON.stringify(results, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `marketing-campaign.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!results) {
    return <div>Loading results...</div>
  }

  const avgEngagementScore = contentIdeas.length > 0 
    ? contentIdeas.reduce((acc: number, idea: any) => acc + (idea.engagement_score || 75), 0) / contentIdeas.length 
    : 85

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SuccessHero 
        campaignCount={campaigns.length}
        avgEngagementScore={avgEngagementScore}
        contentIdeasCount={contentIdeas.length}
        isRefreshing={false}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <ResultsActions onExport={handleExport} onReset={onReset} />

          {/* AI Team Contributions */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-2xl font-bold text-slate-900">AI Team Contributions</h3>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <Award className="w-4 h-4 mr-1" />
                  Mission Complete
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiTeam.map((agent) => {
                  const Icon = agent.icon
                  
                  // Mock agent contributions based on their role
                  const getAgentContribution = (agentId: string) => {
                    switch (agentId) {
                      case 'campaign-strategist':
                        return {
                          metric: `${campaigns.length || 0} Campaigns`,
                          insight: "Developed comprehensive marketing strategies with clear messaging hierarchy",
                          confidence: 94
                        }
                      case 'cultural-expert':
                        return {
                          metric: "5 Markets",
                          insight: "Adapted campaigns for cultural nuances across target regions",
                          confidence: 91
                        }
                      case 'market-researcher':
                        return {
                          metric: `${marketInsights.trending_content_types?.length || 3} Insights`,
                          insight: "Analyzed competitor landscape and identified market opportunities",
                          confidence: 88
                        }
                      case 'creative-director':
                        return {
                          metric: `${contentIdeas.length} Ideas`,
                          insight: "Generated viral-worthy content concepts optimized for engagement",
                          confidence: 92
                        }
                      case 'performance-analyst':
                        return {
                          metric: `${avgEngagementScore.toFixed(0)}% Score`,
                          insight: "Optimized campaigns for maximum performance and ROI",
                          confidence: 89
                        }
                      default:
                        return {
                          metric: "Complete",
                          insight: "Successfully contributed to campaign development",
                          confidence: 90
                        }
                    }
                  }

                  const contribution = getAgentContribution(agent.id)

                  return (
                    <Card key={agent.id} className="border border-slate-200 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center shadow-lg`}>
                            {Icon && <Icon className="w-6 h-6 text-white" />}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-slate-900 text-sm">{agent.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {contribution.confidence}% confidence
                              </Badge>
                            </div>
                            
                            <div className="text-lg font-bold text-indigo-600 mb-2">
                              {contribution.metric}
                            </div>
                            
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {contribution.insight}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Goal Achievement */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Goal Achievement</h3>
                  <p className="text-slate-600">Your "{selectedGoal.title}" objective has been completed</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">✓</div>
                  <div className="font-semibold text-slate-900">Strategy Complete</div>
                  <div className="text-sm text-slate-600">Comprehensive campaign strategy developed</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">✓</div>
                  <div className="font-semibold text-slate-900">Content Ready</div>
                  <div className="text-sm text-slate-600">Platform-optimized content generated</div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">✓</div>
                  <div className="font-semibold text-slate-900">Launch Ready</div>
                  <div className="text-sm text-slate-600">Campaigns ready for deployment</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <ModernTabs activeTab={activeTab} onTabChange={setActiveTab}>
            <TabsContent value="overview" className="p-8 space-y-8">
              <OverviewStats 
                category={category || 'N/A'}
                platform={platform || 'N/A'}
                contentIdeasCount={contentIdeas.length}
                campaignsCount={campaigns.length || 0}
              />
              <AnalyticsDashboard results={results} />
            </TabsContent>

            <TabsContent value="campaigns" className="p-8">
              <CampaignCards campaigns={campaigns.map((campaign: any, index: number) => ({
                id: campaign.id || `campaign-${index}`,
                title: campaign.title || `Campaign ${index + 1}`,
                platform: campaign.platform || 'Multi-Platform',
                content: campaign,
                engagement_score: campaign.engagement_score || 85
              }))} />
            </TabsContent>

            <TabsContent value="content" className="p-8">
              <ContentIdeas ideas={contentIdeas} />
            </TabsContent>

            <TabsContent value="assets" className="p-8">
              <GeneratedAssets assets={generatedAssets} />
            </TabsContent>

            <TabsContent value="videos" className="p-8">
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-50 rounded-full border border-red-200 mb-4">
                    <Video className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">Market Intelligence</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    Related YouTube Videos
                  </h3>
                  <p className="text-lg text-slate-600">Discover trending content in your niche for inspiration</p>
                </div>

                {marketTrends?.youtube_videos?.length > 0 ? (
                  <div className="grid gap-6">
                    {marketTrends.youtube_videos.map((video: any, index: any) => (
                      <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <CardContent className="p-8">
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
                                    <MessageSquare className="w-4 h-4 text-blue-600" />
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Video className="w-12 h-12 text-slate-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-2">Market Intelligence Loading</h4>
                    <p className="text-slate-600 text-lg">YouTube market data will be available in comprehensive campaigns</p>
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