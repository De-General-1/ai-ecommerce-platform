"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { EngagementChart } from "@/components/engagement-chart"

import { TrendingUp, TrendingDown, Users, Eye, Heart, Share2, Target, DollarSign } from "lucide-react"

interface AnalyticsDashboardProps {
  results: any
}

export function AnalyticsDashboard({ results }: AnalyticsDashboardProps) {
  // Calculate metrics from results
  const avgEngagementScore =
    results.content_ideas?.reduce((acc: number, idea: any) => acc + idea.engagement_score, 0) /
      results.content_ideas?.length || 0
  const totalCampaigns = results.campaigns?.length || 0
  const totalContentIdeas = results.content_ideas?.length || 0

  const kpiCards = [
    {
      title: "Estimated Reach",
      value: results.analytics?.estimatedReach ? `${(results.analytics.estimatedReach / 1000).toFixed(1)}K` : "--",
      change: results.analytics?.reachChange || "--",
      trend: results.analytics?.reachTrend || "neutral",
      icon: Users,
      description: "Projected audience reach",
    },
    {
      title: "Avg. Engagement",
      value: avgEngagementScore > 0 ? `${avgEngagementScore.toFixed(1)}%` : "--",
      change: results.analytics?.engagementChange || "--",
      trend: results.analytics?.engagementTrend || "neutral",
      icon: Heart,
      description: "Expected engagement rate",
    },
    {
      title: "Conversion Rate",
      value: results.analytics?.conversionRate ? `${results.analytics.conversionRate}%` : "--",
      change: results.analytics?.conversionChange || "--",
      trend: results.analytics?.conversionTrend || "neutral",
      icon: Target,
      description: "Projected conversion rate",
    },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon
          const isPositive = kpi.trend === "up"

          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  {kpi.change === "--" ? (
                    <div className="w-4 h-4" />
                  ) : isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    kpi.change === "--" ? "text-muted-foreground" :
                    isPositive ? "text-green-500" : "text-red-500"
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{kpi.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart data={results.content_ideas} />
        
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content Performance */}
          <div>
            <h4 className="font-medium mb-4">Content Performance Breakdown</h4>
            <div className="space-y-3">
              {results.content_ideas?.map((idea: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{idea.topic}</p>
                    <p className="text-xs text-muted-foreground">{idea.platform}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <Progress value={idea.engagement_score} className="h-2" />
                    </div>
                    <Badge variant={idea.engagement_score > 85 ? "default" : "secondary"}>
                      {idea.engagement_score}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Metrics */}
          <div>
            <h4 className="font-medium mb-4">Campaign Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <Eye className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{results.analytics?.estimatedViews?.toLocaleString() || "--"}</p>
                <p className="text-sm text-muted-foreground">Estimated Views</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Share2 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{results.analytics?.projectedShares?.toLocaleString() || "--"}</p>
                <p className="text-sm text-muted-foreground">Projected Shares</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{results.analytics?.newFollowers?.toLocaleString() || "--"}</p>
                <p className="text-sm text-muted-foreground">New Followers</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-medium mb-4">AI Recommendations</h4>
            <div className="space-y-3">
              {results.recommendations?.length > 0 ? (
                results.recommendations.map((rec: any, index: number) => (
                  <div key={index} className={`p-4 border-l-4 rounded-r-lg ${
                    rec.type === 'timing' ? 'border-primary bg-primary/5' :
                    rec.type === 'performance' ? 'border-green-500 bg-green-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <p className="font-medium text-sm">{rec.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 border-l-4 border-muted bg-muted/5 rounded-r-lg">
                  <p className="font-medium text-sm">No recommendations available</p>
                  <p className="text-sm text-muted-foreground mt-1">AI recommendations will appear here once analysis is complete</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
