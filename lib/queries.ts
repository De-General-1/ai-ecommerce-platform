import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { config } from './config'

// Types
interface CreateCampaignParams {
  product: {
    name: string
    description: string
    category: string
    price_range?: string
  }
  target_markets?: string[]
  campaign_objectives?: string[]
  budget_range?: string
  timeline?: string
}

interface ProcessCampaignParams {
  files: File[]
  description: string
  category: string
  platform: string
  selectedRegions?: string[]
  competitorUrls?: string[]
  finalPrice: number
}

interface CampaignStatusResponse {
  status: 'processing' | 'completed' | 'failed'
  progress: number
  currentPhase: string
  campaignId: string
}

interface CampaignResultsResponse {
  campaignId: string
  campaigns: any[]
  content_ideas: any[]
  generated_assets: any
  youtubeResults: any[]
}

// API Functions
async function getPresignedUrl(file: File, description: string, category: string, platform: string) {
  const response = await fetch(config.api.uploadUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      filetype: file.type,
      description,
      category,
      platform
    })
  })
  
  if (!response.ok) {
    throw new Error(`Presigned URL failed: ${response.status}`)
  }
  
  return response.json()
}

async function uploadToS3(file: File, uploadUrl: string, requiredHeaders: any) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: requiredHeaders || {},
    body: file
  })
  
  if (!response.ok) {
    throw new Error(`S3 upload failed: ${response.status}`)
  }
  
  return response
}

async function processCampaign(params: ProcessCampaignParams): Promise<{ campaignId: string }> {
  const imageHashes: string[] = []
  
  // Step 1: Get presigned URLs and upload each file
  for (const file of params.files) {
    const { uploadUrl, requiredHeaders, imageHash } = await getPresignedUrl(
      file, 
      params.description, 
      params.category, 
      params.platform
    )
    
    await uploadToS3(file, uploadUrl, requiredHeaders)
    imageHashes.push(imageHash)
  }
  
  // Step 2: Start campaign processing with image hashes
  const response = await fetch(`${config.api.baseUrl}/campaigns/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageHashes,
      description: params.description,
      category: params.category,
      platform: params.platform,
      selectedRegions: params.selectedRegions || [],
      competitorUrls: params.competitorUrls || [],
      finalPrice: params.finalPrice
    })
  })
  
  if (!response.ok) {
    throw new Error(`Campaign processing failed: ${response.status}`)
  }
  
  return response.json()
}

async function getCampaignStatus(campaignId: string): Promise<CampaignStatusResponse> {
  const response = await fetch(`${config.api.baseUrl}/campaigns/${campaignId}/status`)
  
  if (!response.ok) {
    throw new Error(`Status check failed: ${response.status}`)
  }
  
  return response.json()
}

async function getCampaignResults(campaignId: string): Promise<CampaignResultsResponse> {
  const response = await fetch(`${config.api.baseUrl}/campaigns/${campaignId}/results`)
  
  if (!response.ok) {
    throw new Error(`Results fetch failed: ${response.status}`)
  }
  
  return response.json()
}

// Hooks
export function useProcessCampaign() {
  return useMutation({
    mutationFn: processCampaign,
  })
}

export function useCampaignStatus(campaignId: string | null, enabled: boolean = true) {
  return useQuery({
    queryKey: ['campaignStatus', campaignId],
    queryFn: () => getCampaignStatus(campaignId!),
    enabled: enabled && !!campaignId,
    refetchInterval: (query) => {
      return query.state.data?.status === 'completed' ? false : 3000
    },
    refetchIntervalInBackground: true,
  })
}

export function useCampaignResults(campaignId: string | null, enabled: boolean = false) {
  return useQuery({
    queryKey: ['campaignResults', campaignId],
    queryFn: () => getCampaignResults(campaignId!),
    enabled: enabled && !!campaignId,
  })
}