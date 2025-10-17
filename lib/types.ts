// API Types based on api-schema.json

export interface PresignedUrlRequest {
  fileName: string
  fileType: string
}

export interface PresignedUrlResponse {
  uploadUrl: string
  imageHash: string
  imageKey: string
  uploadId: string
  expiresIn: number
  requiredHeaders: Record<string, string>
}

export interface UploadStatusResponse {
  status: string
  imageUrl?: string
  uploadedAt?: string
}

export interface Product {
  name: string
  category: string
  description?: string
}

export interface BasicCampaignRequest {
  product: Product
  target_markets: string[]
  campaign_goals: string[]
}

export interface ComprehensiveCampaignRequest extends BasicCampaignRequest {
  s3_image_key?: string
  image_url?: string
}

export interface CampaignStrategy {
  overview: string
  key_objectives: string[]
  target_audience: Record<string, any>
}

export interface PlatformContent {
  instagram?: Record<string, any>
  tiktok?: Record<string, any>
  facebook?: Record<string, any>
  youtube?: Record<string, any>
  twitter?: Record<string, any>
}

export interface BasicCampaignResponse {
  campaign_strategy: CampaignStrategy
  platform_content: PlatformContent
  visual_insights?: Record<string, any>
  market_trends?: Record<string, any>
  success_metrics?: Record<string, any>
  next_steps?: string[]
}

export interface ComprehensiveCampaignResponse {
  content: string // JSON string that needs parsing
}

export interface GeneratedAssets {
  video_scripts?: Array<{
    platform: string
    title: string
    duration: string
    url: string
  }>
  social_images?: Array<{
    platform: string
    format: string
    url: string
    prompt: string
  }>
  thumbnails?: Array<{
    type: string
    format: string
    url: string
  }>
  ad_creatives?: Array<{
    type: string
    format: string
    url: string
  }>
}

export interface ParsedComprehensiveCampaign {
  campaign_strategy: CampaignStrategy
  platform_content: PlatformContent
  visual_insights?: Record<string, any>
  market_trends?: Record<string, any>
  cultural_adaptations?: Record<string, any>
  success_metrics?: Record<string, any>
  generated_assets?: GeneratedAssets
}

export interface ApiError {
  error: string
  message?: string
}