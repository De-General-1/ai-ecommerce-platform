// Environment configuration with fallbacks
export const config = {
  api: {
    uploadUrl: process.env.NEXT_PUBLIC_UPLOAD_URL_ENDPOINT || 'https://1mpyrh4oq9.execute-api.eu-west-2.amazonaws.com/dev/generate-upload-url',
    statusEndpoint: process.env.NEXT_PUBLIC_STATUS_ENDPOINT || 'https://1mpyrh4oq9.execute-api.eu-west-2.amazonaws.com/dev/status',
    productEndpoint: process.env.NEXT_PUBLIC_PRODUCT_ENDPOINT || 'https://1mpyrh4oq9.execute-api.eu-west-2.amazonaws.com/dev/product',
  }
}