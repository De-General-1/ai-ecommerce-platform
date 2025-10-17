// Test script to verify the upload flow
const testUploadFlow = async () => {
  try {
    console.log('Testing presigned URL generation...')
    
    // Test presigned URL generation
    const response = await fetch('/api/upload-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: 'test-product.jpg',
        filetype: 'image/jpeg',
        description: 'Test product image',
        category: 'product',
        platform: 'web'
      }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Presigned URL response:', data)
    
    // Verify required fields are present
    const requiredFields = ['uploadUrl', 'imageHash', 'imageKey']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields)
    } else {
      console.log('✅ All required fields present')
    }
    
    return data
  } catch (error) {
    console.error('❌ Upload flow test failed:', error)
    throw error
  }
}

// Test campaign generation with uploaded image
const testCampaignWithImage = async (imageKey) => {
  try {
    console.log('Testing campaign generation with image key:', imageKey)
    
    const campaignRequest = {
      product: {
        name: "Test Product",
        description: "A test product for campaign generation"
      },
      goal: "brand-awareness",
      target_audience: "young professionals aged 25-35",
      budget: 3000,
      region: "North America",
      s3_image_key: imageKey
    }
    
    console.log('Campaign request:', campaignRequest)
    
    // This would be called by the actual campaign generation
    console.log('✅ Campaign request prepared successfully')
    
  } catch (error) {
    console.error('❌ Campaign test failed:', error)
    throw error
  }
}

// Export for use in browser console or testing
if (typeof window !== 'undefined') {
  window.testUploadFlow = testUploadFlow
  window.testCampaignWithImage = testCampaignWithImage
  console.log('Test functions available: testUploadFlow(), testCampaignWithImage(imageKey)')
}

module.exports = { testUploadFlow, testCampaignWithImage }