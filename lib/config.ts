// Environment configuration with fallbacks
const BASE_URL = 'https://itnxzfea8b.execute-api.eu-west-1.amazonaws.com/sandbox'

export const config = {
  api: {
    baseUrl: BASE_URL,
    uploadUrl: process.env.NEXT_PUBLIC_UPLOAD_URL_ENDPOINT || `${BASE_URL}/presigned-url`,
    statusEndpoint: process.env.NEXT_PUBLIC_STATUS_ENDPOINT || `${BASE_URL}/status`,
    productEndpoint: process.env.NEXT_PUBLIC_PRODUCT_ENDPOINT || `${BASE_URL}/campaign`,
  }
}