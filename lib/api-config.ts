// API Configuration based on api-schema.json
export const API_CONFIG = {
  BASE_URL: 'https://a5s7rnwjm0.execute-api.eu-west-1.amazonaws.com/dev',
  ENDPOINTS: {
    PRESIGNED_URL: '/api/upload/presigned-url',
    UPLOAD_STATUS: '/api/upload',
    BASIC_CAMPAIGN: '/api/campaigns',
    COMPREHENSIVE_CAMPAIGN: '/api/comprehensive-campaign'
  },
  RATE_LIMITS: {
    PRESIGNED_URL: 100, // per minute
    CAMPAIGN_GENERATION: 10, // per minute
    COMPREHENSIVE_CAMPAIGN: 5 // per minute
  },
  TIMEOUTS: {
    UPLOAD: 30000, // 30s
    BASIC_CAMPAIGN: 45000, // 45s
    COMPREHENSIVE_CAMPAIGN: 60000 // 60s
  }
} as const

export const SUPPORTED_FILE_TYPES = [
  'image/jpeg',
  'image/png', 
  'image/jpg',
  'image/webp'
] as const

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB