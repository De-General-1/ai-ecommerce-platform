// Integration test for API client
import { apiClient } from './api-client'

export async function testApiIntegration() {
  console.log('🚀 Testing API Integration...')
  
  try {
    // Test 1: Basic Campaign Generation (without image)
    console.log('📝 Testing Basic Campaign Generation...')
    const basicRequest = {
      product: {
        name: 'Test Coffee Maker',
        category: 'electronics',
        description: 'Premium coffee maker with advanced brewing technology'
      },
      target_markets: ['US', 'Europe'],
      campaign_goals: ['brand_awareness', 'sales']
    }
    
    const basicResult = await apiClient.generateBasicCampaign(basicRequest)
    console.log('✅ Basic Campaign Success:', {
      platforms: Object.keys(basicResult.platform_content || {}),
      hasStrategy: !!basicResult.campaign_strategy,
      hasMetrics: !!basicResult.success_metrics
    })
    
    // Test 2: File Validation
    console.log('📁 Testing File Validation...')
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const validation = apiClient.validateFile(mockFile)
    console.log('✅ File Validation:', validation)
    
    console.log('🎉 All tests passed!')
    return true
    
  } catch (error) {
    console.error('❌ Integration test failed:', error)
    return false
  }
}

// Test data for development
export const mockCampaignResponse = {
  campaign_strategy: {
    overview: "Comprehensive marketing strategy for premium coffee maker targeting tech-savvy consumers",
    key_objectives: ["Increase brand awareness", "Drive online sales", "Build community"],
    target_audience: {
      demographics: "25-45 years, urban professionals",
      interests: ["coffee culture", "technology", "lifestyle"]
    }
  },
  platform_content: {
    instagram: {
      content_ideas: [
        {
          type: "carousel",
          title: "Morning Ritual Perfection",
          description: "Showcase the perfect morning coffee routine",
          engagement_score: 87
        }
      ],
      hashtags: ["#CoffeeLover", "#MorningRitual", "#PremiumCoffee"],
      posting_schedule: "Daily at 7 AM"
    },
    tiktok: {
      content_ideas: [
        {
          type: "video",
          title: "15-Second Coffee Magic",
          description: "Quick demo of brewing process",
          engagement_score: 92
        }
      ],
      trending_sounds: ["Coffee Shop Ambiance", "Morning Motivation"],
      posting_schedule: "3x per week"
    }
  },
  visual_insights: {
    color_palette: ["#8B4513", "#F5DEB3", "#2F4F4F"],
    style_recommendations: "Modern, clean, lifestyle-focused imagery"
  },
  market_trends: {
    trending_topics: ["Sustainable coffee", "Home brewing", "Coffee art"],
    competitor_analysis: "Focus on premium positioning and quality messaging"
  },
  success_metrics: {
    engagement_rate: "8-12%",
    reach_goal: "100K impressions/month",
    conversion_target: "2-3% click-through rate"
  },
  generated_assets: {
    thumbnails: [
      { url: "/placeholder.jpg", platform: "youtube" },
      { url: "/placeholder.jpg", platform: "instagram" }
    ],
    images: [
      { url: "/placeholder.jpg", type: "social_post" },
      { url: "/placeholder.jpg", type: "ad_creative" }
    ]
  }
}