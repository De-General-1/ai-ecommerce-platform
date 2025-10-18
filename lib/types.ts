// API Types based on new schema and example requests

export interface Product {
  name: string
  description: string
  category?: string
}

// Basic Campaign Request (for /api/api/simple-capaigns)
export interface BasicCampaignRequest {
  product: Product
  goal: string
  target_audience: string
  budget: number
  region: string
}

// Comprehensive Campaign Request (for /api/comprehensive-campaign)
export interface ComprehensiveCampaignRequest {
  product: Product
  goal: string
  target_audience: string
  budget: number
  region: string
  s3_image_key?: string
  image_url?: string
}

// Campaign Response
export interface CampaignResponse {
  campaign_id: string
  status: 'completed' | 'awaiting_assets' | 'processing'
  message: string
  campaign_data: {
    content: string // Campaign strategy as text
  }
}

// Campaign Status Response
export interface CampaignStatusResponse {
  campaign_id: string
  status: 'completed' | 'awaiting_assets' | 'processing'
  progress: number
  created_at: string
  updated_at: string
  context_data: {
    product: Product
    campaign_goals: string[]
    s3_info: any
    target_audience: string
    platform_preferences: string[]
    budget_range: string
    timeline: string | null
    target_markets: string[]
    campaign_objectives: string[]
  }
  result_data: {
    content: string
  }
}

export interface ApiError {
  error: string
  message?: string
}