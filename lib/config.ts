// Environment configuration with fallbacks
const BASE_URL = "https://a5s7rnwjm0.execute-api.eu-west-1.amazonaws.com/dev";

export const config = {
  api: {
    baseUrl: BASE_URL,
    // New backend API endpoints
    uploadUrl:
      process.env.NEXT_PUBLIC_UPLOAD_URL_ENDPOINT ||
      `${BASE_URL}/api/upload/presigned-url`,
    campaignUrl:
      process.env.NEXT_PUBLIC_CAMPAIGN_URL_ENDPOINT ||
      `${BASE_URL}/api/campaigns`,
    comprehensiveCampaignUrl:
      process.env.NEXT_PUBLIC_COMPREHENSIVE_CAMPAIGN_URL_ENDPOINT ||
      `${BASE_URL}/api/comprehensive-campaign`,
    campaignStatusUrl:
      process.env.NEXT_PUBLIC_CAMPAIGN_STATUS_URL_ENDPOINT ||
      `${BASE_URL}/api/campaigns/status`,
    campaignDetailUrl:
      process.env.NEXT_PUBLIC_CAMPAIGN_DETAIL_URL_ENDPOINT ||
      `${BASE_URL}/api/campaigns`,

    // Legacy endpoints (for backward compatibility)
    statusEndpoint:
      process.env.NEXT_PUBLIC_STATUS_ENDPOINT || `${BASE_URL}/status`,
    productEndpoint:
      process.env.NEXT_PUBLIC_PRODUCT_ENDPOINT || `${BASE_URL}/campaign`,
  },
  s3: {
    bucketUrl: "https://degenerals-mi-dev-images.s3.eu-west-1.amazonaws.com",
  },
};
w