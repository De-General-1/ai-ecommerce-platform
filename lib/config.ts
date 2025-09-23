// Environment configuration with fallbacks
export const config = {
  api: {
    uploadUrl: process.env.NEXT_PUBLIC_UPLOAD_URL_ENDPOINT || 'https://n5zmtvleqj.execute-api.us-east-1.amazonaws.com/generate-upload-url',
    statusEndpoint: process.env.NEXT_PUBLIC_STATUS_ENDPOINT || 'https://n5zmtvleqj.execute-api.us-east-1.amazonaws.com/status',
    productEndpoint: process.env.NEXT_PUBLIC_PRODUCT_ENDPOINT || 'https://n5zmtvleqj.execute-api.us-east-1.amazonaws.com/product',
  }
}