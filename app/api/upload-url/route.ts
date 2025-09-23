import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { filename, filetype, description, category, platform } = await request.json()

    if (!filename || !filetype) {
      return NextResponse.json({ error: "filename and filetype are required" }, { status: 400 })
    }

    console.log('🎬 DEMO MODE: Mock upload URL generation')
    
    // Mock response for demo purposes
    const mockResponse = {
      uploadUrl: `https://demo-bucket.s3.amazonaws.com/uploads/demo-${Date.now()}-${filename}?mock=true`,
      imageHash: `demo-hash-${Math.random().toString(36).substr(2, 16)}`,
      metadata: {
        'product-details': description || '',
        'product-category': category || '',
        'platform': platform || ''
      }
    }
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 200))
    
    console.log('Mock upload URL generated:', mockResponse)
    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Upload URL API error:", error)
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 })
  }
}
