import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { filename, filetype, description, category, platform } = await request.json()

    if (!filename || !filetype) {
      return NextResponse.json({ error: "filename and filetype are required" }, { status: 400 })
    }

    // Forward request to the actual AWS API Gateway endpoint
    const response = await fetch("https://n5zmtvleqj.execute-api.us-east-1.amazonaws.com/generate-upload-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename,
        filetype,
        description,
        category,
        platform
      }),
    })

    if (!response.ok) {
      throw new Error(`Upload URL request failed: ${response.statusText}`)
    }

    const data = await response.json()
    console.log({data})
    return NextResponse.json(data)
  } catch (error) {
    console.error("Upload URL API error:", error)
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 })
  }
}
