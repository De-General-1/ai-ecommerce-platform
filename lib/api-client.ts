import { config } from './config'
import { API_CONFIG, SUPPORTED_FILE_TYPES, MAX_FILE_SIZE } from './api-config'
import type {
  PresignedUrlRequest,
  PresignedUrlResponse,
  UploadStatusResponse,
  BasicCampaignRequest,
  BasicCampaignResponse,
  ComprehensiveCampaignRequest,
  ComprehensiveCampaignResponse,
  ParsedComprehensiveCampaign,
  ApiError
} from './types'

class ApiClient {
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    console.log('API Request:', url, options.method || 'GET')
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    console.log('API Response:', response.status, response.statusText)

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({ 
        error: `HTTP ${response.status}: ${response.statusText}` 
      }))
      console.error('API Error:', error)
      throw new Error(error.error || error.message || 'API request failed')
    }

    const data = await response.json()
    console.log('API Success:', data)
    return data
  }

  // Upload Flow
  async getPresignedUrl(request: PresignedUrlRequest): Promise<PresignedUrlResponse> {
    return this.request<PresignedUrlResponse>(config.api.presignedUrl, {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  async uploadToS3(uploadUrl: string, file: File, headers: Record<string, string>): Promise<void> {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers,
      body: file,
    })

    if (!response.ok) {
      throw new Error(`S3 upload failed: ${response.status}`)
    }
  }

  async checkUploadStatus(imageHash: string): Promise<UploadStatusResponse> {
    return this.request<UploadStatusResponse>(`${config.api.uploadStatus}?imageHash=${imageHash}`)
  }

  // Campaign Generation
  async generateBasicCampaign(request: BasicCampaignRequest): Promise<BasicCampaignResponse> {
    return this.request<BasicCampaignResponse>(config.api.basicCampaign, {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  async generateComprehensiveCampaign(request: ComprehensiveCampaignRequest): Promise<ParsedComprehensiveCampaign> {
    const response = await this.request<ComprehensiveCampaignResponse>(config.api.comprehensiveCampaign, {
      method: 'POST',
      body: JSON.stringify(request),
    })

    // Parse the JSON string response
    try {
      return JSON.parse(response.content)
    } catch (error) {
      throw new Error('Failed to parse campaign response')
    }
  }

  // File Validation
  validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: 'File size exceeds 10MB limit' }
    }

    if (!SUPPORTED_FILE_TYPES.includes(file.type as any)) {
      return { valid: false, error: 'Unsupported file type. Use JPG, PNG, or WebP' }
    }

    return { valid: true }
  }

  // Complete Upload Flow
  async uploadFile(file: File): Promise<{ imageHash: string; imageKey: string; imageUrl?: string }> {
    console.log('Starting file upload:', file.name, file.type, file.size)
    
    const validation = this.validateFile(file)
    if (!validation.valid) {
      console.error('File validation failed:', validation.error)
      throw new Error(validation.error)
    }
    console.log('File validation passed')

    // Step 1: Get presigned URL
    console.log('Getting presigned URL...')
    const presignedData = await this.getPresignedUrl({
      fileName: file.name,
      fileType: file.type,
    })
    console.log('Got presigned URL:', presignedData.imageHash)

    // Step 2: Upload to S3
    console.log('Uploading to S3...')
    await this.uploadToS3(presignedData.uploadUrl, file, presignedData.requiredHeaders)
    console.log('S3 upload complete')

    // Skip upload status check since S3 upload succeeded
    console.log('Upload complete, skipping status check due to CORS issue')
    
    return {
      imageHash: presignedData.imageHash,
      imageKey: presignedData.imageKey, // This is what we need for the API
      imageUrl: undefined, // Will be available after campaign generation
    }
  }
}

export const apiClient = new ApiClient()

// Legacy compatibility
export { apiClient as default }