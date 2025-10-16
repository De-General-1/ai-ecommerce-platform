// Environment configuration with fallbacks
const BASE_URL = 'https://1p5ig7vinh.execute-api.eu-west-1.amazonaws.com/dev'

export const config = {
  api: {
    baseUrl: BASE_URL,
    uploadUrl: `${BASE_URL}/presigned-url`,
    campaignsEndpoint: `${BASE_URL}/campaigns`,
    comprehensiveCampaignEndpoint: `${BASE_URL}/comprehensive-campaign`,
    marketAnalysisEndpoint: `${BASE_URL}/market-analysis`,
    sentimentAnalysisEndpoint: `${BASE_URL}/sentiment-analysis`,
    culturalAnalysisEndpoint: `${BASE_URL}/cultural-analysis`,
    imageAnalysisEndpoint: `${BASE_URL}/image-analysis`,
    translateEndpoint: `${BASE_URL}/translate`,
  }
}