<<<<<<< Updated upstream
// Environment configuration with fallbacks
const BASE_URL = 'https://1p5ig7vinh.execute-api.eu-west-1.amazonaws.com/dev'
=======
import { API_CONFIG } from './api-config'
>>>>>>> Stashed changes

// Environment configuration with fallbacks
export const config = {
  api: {
<<<<<<< Updated upstream
    baseUrl: BASE_URL,
    uploadUrl: `${BASE_URL}/presigned-url`,
    campaignsEndpoint: `${BASE_URL}/campaigns`,
    comprehensiveCampaignEndpoint: `${BASE_URL}/comprehensive-campaign`,
    marketAnalysisEndpoint: `${BASE_URL}/market-analysis`,
    sentimentAnalysisEndpoint: `${BASE_URL}/sentiment-analysis`,
    culturalAnalysisEndpoint: `${BASE_URL}/cultural-analysis`,
    imageAnalysisEndpoint: `${BASE_URL}/image-analysis`,
    translateEndpoint: `${BASE_URL}/translate`,
=======
    baseUrl: API_CONFIG.BASE_URL,
    presignedUrl: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRESIGNED_URL}`,
    uploadStatus: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPLOAD_STATUS}`,
    basicCampaign: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BASIC_CAMPAIGN}`,
    comprehensiveCampaign: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMPREHENSIVE_CAMPAIGN}`,
>>>>>>> Stashed changes
  }
}