// Simple test script to verify API integration
const API_BASE = 'https://u4xf9rvuwj.execute-api.eu-west-1.amazonaws.com/dev'

// Test Basic Campaign Generation
async function testBasicCampaign() {
  const request = {
    product: {
      name: "Test Product",
      description: "A test product for integration verification"
    },
    goal: "brand-awareness",
    target_audience: "young professionals aged 25-35",
    budget: 1000,
    region: "North America"
  }

  try {
    const response = await fetch(`${API_BASE}/api/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    const result = await response.json()
    console.log('Basic Campaign Test Result:', result)
    return result
  } catch (error) {
    console.error('Basic Campaign Test Failed:', error)
  }
}

// Test Comprehensive Campaign Generation
async function testComprehensiveCampaign() {
  const request = {
    product: {
      name: "Premium Test Product",
      description: "A premium test product for comprehensive campaign testing"
    },
    goal: "engagement",
    target_audience: "tech enthusiasts aged 20-40",
    budget: 5000,
    region: "Global"
  }

  try {
    const response = await fetch(`${API_BASE}/api/comprehensive-campaign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    const result = await response.json()
    console.log('Comprehensive Campaign Test Result:', result)
    return result
  } catch (error) {
    console.error('Comprehensive Campaign Test Failed:', error)
  }
}

// Run tests
console.log('Testing API Integration...')
testBasicCampaign()
testComprehensiveCampaign()