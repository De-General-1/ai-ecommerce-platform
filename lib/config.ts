// Environment configuration with fallbacks
const BASE_URL = 'https://ws1omcsil8.execute-api.eu-west-2.amazonaws.com/dev'

export const config = {
  api: {
    baseUrl: BASE_URL,
    uploadUrl: process.env.NEXT_PUBLIC_UPLOAD_URL_ENDPOINT || `${BASE_URL}/presigned-url`,
    statusEndpoint: process.env.NEXT_PUBLIC_STATUS_ENDPOINT || `${BASE_URL}/status`,
    productEndpoint: process.env.NEXT_PUBLIC_PRODUCT_ENDPOINT || `${BASE_URL}/campaign`,
  }
}