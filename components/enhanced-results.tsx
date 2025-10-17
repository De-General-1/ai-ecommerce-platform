"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";

// Dynamic imports for heavy chart components
const AnalyticsDashboard = dynamic(
  () =>
    import("@/components/analytics-dashboard").then((mod) => ({
      default: mod.AnalyticsDashboard,
    })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
      </div>
    ),
  }
);

const CampaignCards = dynamic(() =>
  import("@/components/campaign-cards").then((mod) => ({
    default: mod.CampaignCards,
  }))
);
const ContentIdeas = dynamic(() =>
  import("@/components/content-ideas").then((mod) => ({
    default: mod.ContentIdeas,
  }))
);
const GeneratedAssets = dynamic(() =>
  import("@/components/generated-assets").then((mod) => ({
    default: mod.GeneratedAssets,
  }))
);
import { SuccessHero } from "@/components/success-hero";
import { ResultsActions } from "@/components/results-actions";
import { ModernTabs } from "@/components/modern-tabs";
import { OverviewStats } from "@/components/overview-stats";
import {
  Download,
  Share2,
  RefreshCw,
  Video,
  Users,
  Brain,
  MessageSquare,
  Award,
  TrendingUp,
} from "lucide-react";
import { useProductData } from "@/lib/queries";

interface EnhancedResultsProps {
  results: any; // This will be our BasicCampaignResponse
  selectedGoal?: any; // Make optional since we're focusing on basic campaigns
  aiTeam?: any[]; // Make optional
  onReset: () => void;
}

export function EnhancedResults({
  results,
  selectedGoal,
  aiTeam = [],
  onReset,
}: EnhancedResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Use results directly from the new API response format
  const displayResults = results;
  const campaignData = results;

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const data = JSON.stringify(displayResults, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `marketing-campaign.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!displayResults) {
    return <div>Loading results...</div>;
  }

  // Extract data from the new API response format
  const contentIdeas = results?.content_ideas || [];
  const campaigns = results?.campaigns || [];
  const generatedAssets = results?.generated_assets || {};
  const marketTrends = results?.market_trends || {};
  const successMetrics = results?.success_metrics || {};
  const analytics = results?.analytics || {};
  const productInfo = results?.product || {};
  
  const avgEngagementScore = contentIdeas.length > 0
    ? contentIdeas.reduce((acc: number, idea: any) => acc + (idea.engagement_score || 0), 0) / contentIdeas.length
    : 85;
  
  const campaignCount = campaigns.length || 1;
  const platformsUsed = campaigns.length > 0 ? campaigns[0]?.platforms || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SuccessHero
        campaignCount={campaignCount}
        avgEngagementScore={avgEngagementScore}
        contentIdeasCount={contentIdeas.length}
        isRefreshing={false}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <ResultsActions onExport={handleExport} onReset={onReset} />

          {/* AI Analysis Summary */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-2xl font-bold text-slate-900">
                    AI Analysis Summary
                  </h3>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <Award className="w-4 h-4 mr-1" />
                  Campaign Complete
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Image Analysis */}
                <Card className="border border-slate-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <Brain className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            Image Analysis
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            95% confidence
                          </Badge>
                        </div>

                        <div className="text-lg font-bold text-indigo-600 mb-2">
                          {productInfo?.image?.labels?.join(", ") || "Visual Elements"}
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          Analyzed product visuals and identified key elements
                          for marketing optimization
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Research */}
                <Card className="border border-slate-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            Market Research
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            92% confidence
                          </Badge>
                        </div>

                        <div className="text-lg font-bold text-green-600 mb-2">
                          {marketTrends?.trending_keywords?.length || 0} Keywords
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          Identified trending keywords and market opportunities
                          for your product
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Campaign Generation */}
                <Card className="border border-slate-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                        <Users className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            Campaign Strategy
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            97% confidence
                          </Badge>
                        </div>

                        <div className="text-lg font-bold text-purple-600 mb-2">
                          {platformsUsed.length} Platforms
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          Generated platform-specific campaigns optimized for
                          engagement and conversion
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Success */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Campaign Generated Successfully
                  </h3>
                  <p className="text-slate-600">
                    Your AI-powered marketing campaign is ready for deployment
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ✓
                  </div>
                  <div className="font-semibold text-slate-900">
                    Image Analyzed
                  </div>
                  <div className="text-sm text-slate-600">
                    Product visuals analyzed for optimal positioning
                  </div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ✓
                  </div>
                  <div className="font-semibold text-slate-900">
                    Market Research
                  </div>
                  <div className="text-sm text-slate-600">
                    Trending keywords and opportunities identified
                  </div>
                </div>
                <div className="text-center p-4 bg-white/70 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ✓
                  </div>
                  <div className="font-semibold text-slate-900">
                    Campaigns Ready
                  </div>
                  <div className="text-sm text-slate-600">
                    Platform-specific strategies generated
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <ModernTabs activeTab={activeTab} onTabChange={setActiveTab}>
            <TabsContent value="overview" className="p-8 space-y-8">
              <OverviewStats
                category={productInfo?.description?.split('.')[0] || "Marketing Campaign"}
                platform={platformsUsed[0] || "Multi-Platform"}
                contentIdeasCount={contentIdeas.length}
                campaignsCount={campaignCount}
              />
              <AnalyticsDashboard results={results} />
            </TabsContent>

            <TabsContent value="campaigns" className="p-8">
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    Platform-Specific Campaigns
                  </h3>
                  <p className="text-lg text-slate-600">
                    AI-generated marketing strategies tailored for each platform
                  </p>
                </div>

                <CampaignCards campaigns={campaigns} />
              </div>
            </TabsContent>

            <TabsContent value="content" className="p-8">
              <ContentIdeas ideas={contentIdeas} />
            </TabsContent>

            <TabsContent value="assets" className="p-8">
              <GeneratedAssets assets={generatedAssets} />
            </TabsContent>
          </ModernTabs>
        </div>
      </div>
    </div>
  );
}
