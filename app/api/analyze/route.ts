import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fileKeys, description, category, platform } = body

    if (!fileKeys || !Array.isArray(fileKeys) || fileKeys.length === 0) {
      return NextResponse.json({ error: "fileKeys array is required" }, { status: 400 })
    }

    if (!description || !category || !platform) {
      return NextResponse.json({ error: "description, category, and platform are required" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Return mock data in new API structure
    const mockData = {
      pipeline_status: "completed",
      originalData: {
        public_url: "https://example.com/product.jpg",
        product_labels: [
          { name: category, confidence: 95.5 },
          { name: "Product", confidence: 89.2 }
        ],
        product_categories: [category],
        object_key: fileKeys[0]
      },
      parsedCampaigns: {
        fileKeys,
        description,
        category,
        platform,
        content_ideas: [
          {
            topic: "Product Showcase",
            platform: platform,
            engagement_score: 85,
            caption: `Transform your space with our amazing ${description}!`,
            hashtags: ["#ProductShowcase", `#${category}`, "#Quality"]
          }
        ],
        campaigns: [
          {
            name: `${description} Campaign`,
            duration: "4 weeks",
            posts_per_week: 5,
            platforms: [platform],
            calendar: { "Week 1": "Product launch content" },
            adaptations: { [platform]: "Engaging content" }
          }
        ],
        generated_assets: {
          image_prompts: [`Professional ${description} photography`],
          video_scripts: [{ type: "Demo", content: "Product showcase" }],
          email_templates: [{ subject: `New ${description}`, body: "Exciting news..." }],
          blog_outlines: [{ title: `${description} Guide`, points: ["Features"] }]
        }
      },
      youtubeResults: [
        {
          title: `${description} Review`,
          channelTitle: "Tech Reviews",
          viewCount: 50000,
          likeCount: 1200,
          commentCount: 150,
          url: "https://youtube.com/watch?v=example",
          thumbnailUrl: "https://img.youtube.com/vi/example/default.jpg",
          videoId: "example",
          publishedAt: new Date().toISOString(),
          description: `Review of ${description}`
        }
      ]
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Analysis API error:", error)
    return NextResponse.json({ error: "Failed to analyze images" }, { status: 500 })
  }
}