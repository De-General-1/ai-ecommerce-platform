import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  console.log('Upload URL route called')
  
  try {
    console.log('Parsing request body...')
    const body = await request.json()
    console.log('Request body:', body)
    
    const { filename, filetype, description, category, platform } = body

    if (!filename || !filetype) {
      console.log('Missing filename or filetype')
      return NextResponse.json({ error: "filename and filetype are required" }, { status: 400 })
    }

    const uploadUrl = 'https://1mpyrh4oq9.execute-api.eu-west-2.amazonaws.com/dev/generate-upload-url'
    console.log('Making request to:', uploadUrl)

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "x-api-key": process.env.AWS_API_KEY || "",
        // "Authorization": process.env.AWS_AUTH_TOKEN || ""
      },
      body: JSON.stringify({
        filename,
        filetype,
        description,
        category,
        platform
      }),
    })

    console.log('Response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log('Error response:', errorText)
      return NextResponse.json({ error: `API error: ${response.status}` }, { status: 500 })
    }

    const data = await response.json()
    console.log('Success response:', data)
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
