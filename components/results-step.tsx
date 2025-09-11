"use client"

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { CampaignCards } from "@/components/campaign-cards"
import { ContentIdeas } from "@/components/content-ideas"
import { GeneratedAssets } from "@/components/generated-assets"
import { Download, RefreshCw, Share2, TrendingUp } from "lucide-react"

interface ResultsStepProps {
  results: any
  onReset: () => void
}

export function ResultsStep({ results, onReset }: ResultsStepProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const handleExport = (format: "pdf" | "csv" | "json") => {
    // Mock export functionality
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

  const contentIdeas = results.parsedCampaigns?.content_ideas || []
  const avgEngagementScore = contentIdeas.length > 0 
    ? contentIdeas.reduce((acc: number, idea: any) => acc + idea.engagement_score, 0) / contentIdeas.length 
    : 0

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Marketing Campaign Results</h2>
          <p className="text-muted-foreground">AI-generated campaigns ready to boost your sales</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {avgEngagementScore.toFixed(0)}% Avg. Engagement
          </Badge>
          <Button variant="outline" onClick={onReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Export Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Export Your Results</h3>
              <p className="text-sm text-muted-foreground">Download your campaign data in various formats</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
                <Download className="w-4 h-4 mr-2" />
                PDF Report
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                <Download className="w-4 h-4 mr-2" />
                CSV Data
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("json")}>
                <Download className="w-4 h-4 mr-2" />
                JSON Export
              </Button>
              <Button size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="content">Content Ideas</TabsTrigger>
          <TabsTrigger value="assets">Generated Assets</TabsTrigger>
          <TabsTrigger value="videos">YouTube Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Processing Summary */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Campaign Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium capitalize">{results.parsedCampaigns?.category || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Platform:</span>
                  <p className="font-medium capitalize">{results.parsedCampaigns?.platform || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Content Ideas:</span>
                  <p className="font-medium">{contentIdeas.length}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Campaigns:</span>
                  <p className="font-medium">{results.parsedCampaigns?.campaigns?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <AnalyticsDashboard results={results.parsedCampaigns || results} />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <CampaignCards campaigns={results.parsedCampaigns?.campaigns || []} />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentIdeas ideas={results.parsedCampaigns?.content_ideas || []} />
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <GeneratedAssets assets={results.parsedCampaigns?.generated_assets || {}} />
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Related YouTube Videos</h3>
              <div className="grid gap-4">
                {results.youtubeResults?.map((video: any, index: any) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <img src={video.thumbnailUrl} alt={video.title} className="w-20 h-15 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-2">{video.title}</h4>
                      <p className="text-sm text-muted-foreground">{video.channelTitle}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        <span>{video.viewCount?.toLocaleString()} views</span>
                        <span>{video.likeCount?.toLocaleString()} likes</span>
                        <span>{video.commentCount?.toLocaleString()} comments</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={video.url} target="blank" rel="noopener noreferrer">Watch</a>
                    </Button>
                  </div>
                )) || <p className="text-muted-foreground">No YouTube videos available</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
