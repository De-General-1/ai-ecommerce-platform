// Mock data for demo purposes
const createMockResults = (description: string, category: string, platform: string) => ({
  parsedCampaigns: {
    category: category || "Electronics",
    platform: platform || "Instagram",
    description: description || "Innovative product designed for modern lifestyle",
    content_ideas: [
      {
        topic: "Transform Your Daily Routine",
        platform: "Instagram",
        engagement_score: 88,
        caption: "Discover how this innovative product can revolutionize your daily routine! ✨ #Innovation #Lifestyle #ProductivityHacks",
        hashtags: ["#Innovation", "#Lifestyle", "#ProductivityHacks", "#TechLife", "#ModernLiving"]
      },
      {
        topic: "Behind the Scenes: Product Development",
        platform: "TikTok",
        engagement_score: 92,
        caption: "Ever wondered how cutting-edge products are made? Take a peek behind the scenes! 🔧 #BehindTheScenes #Innovation #TechTok",
        hashtags: ["#BehindTheScenes", "#Innovation", "#TechTok", "#ProductDevelopment", "#Engineering"]
      },
      {
        topic: "User Success Stories",
        platform: "YouTube",
        engagement_score: 85,
        caption: "Real customers, real results! See how our product is changing lives every day. 🌟 #CustomerStories #Success #Testimonials",
        hashtags: ["#CustomerStories", "#Success", "#Testimonials", "#RealResults", "#Community"]
      }
    ],
    campaigns: [
      {
        name: "Product Launch Campaign",
        duration: "4 weeks",
        posts_per_week: 3,
        platforms: ["Instagram", "TikTok", "Facebook"],
        calendar: {
          "Week 1": "Introduce the product with high-quality images and videos showcasing its features. Share user testimonials and behind-the-scenes content.",
          "Week 2": "Focus on the benefits of using the product in daily life. Share tips and tricks for maximizing its potential.",
          "Week 3": "Highlight creative uses and DIY projects using the product. Encourage user-generated content and feature submissions.",
          "Week 4": "Run a giveaway contest to engage the audience and increase brand awareness. Share winners and their stories."
        },
        adaptations: {
          "Instagram": "Use visually appealing images and short videos to showcase the product. Utilize Instagram Stories for behind-the-scenes content.",
          "TikTok": "Create fun and engaging videos demonstrating creative uses of the product. Encourage users to participate in challenges.",
          "Facebook": "Share detailed product information, customer reviews, and educational content. Utilize Facebook Groups for community engagement."
        }
      },
      {
        name: "Seasonal Engagement Campaign",
        duration: "6 weeks",
        posts_per_week: 2,
        platforms: ["Instagram", "YouTube", "LinkedIn"],
        calendar: {
          "Week 1-2": "Introduce seasonal themes and show how the product fits into current trends and lifestyle needs.",
          "Week 3-4": "Share educational content about product benefits and feature user-generated content from the community.",
          "Week 5-6": "Launch interactive campaigns with polls, Q&As, and exclusive behind-the-scenes content."
        },
        adaptations: {
          "Instagram": "Focus on visual storytelling with high-quality photos and engaging Stories with polls and questions.",
          "YouTube": "Create longer-form educational content and product demonstrations with detailed explanations.",
          "LinkedIn": "Share professional insights about the product's impact on productivity and business efficiency."
        }
      }
    ],
    generated_assets: {
      image_prompts: [
        "A sleek and modern lifestyle shot featuring the product in a contemporary setting with natural lighting",
        "Behind-the-scenes photography showing the product development process with engineering tools and blueprints",
        "User testimonial scene with happy customers using the product in their daily environment"
      ],
      video_scripts: [
        {
          type: "Short form video",
          content: "🚀 Introducing the future of [product category]! Watch as we demonstrate the incredible features that make this product a game-changer. From innovative design to practical functionality, see why thousands of customers are making the switch. Don't miss out on the revolution – get yours today! #Innovation #TechLife #GameChanger"
        },
        {
          type: "Tutorial video",
          content: "Master your [product] in 60 seconds! 📚 In this quick tutorial, we'll show you the top 5 features that will transform how you [use case]. Whether you're a beginner or a pro, these tips will help you get the most out of your investment. Save this video and share with friends who need to see this! #Tutorial #ProTips #Productivity"
        }
      ],
      email_templates: [
        {
          subject: "🎉 Your Product Campaign is Ready to Launch!",
          body: "Hi [Customer Name],\n\nGreat news! Your AI-generated marketing campaign is ready to go live. We've created engaging content across multiple platforms that's designed to maximize your reach and engagement.\n\nYour campaign includes:\n✅ 3 high-converting content ideas\n✅ 2 complete campaign strategies\n✅ Platform-specific adaptations\n✅ Ready-to-use captions and hashtags\n\nReady to boost your sales? Let's make your product go viral!\n\nBest regards,\nThe AI Marketing Team"
        }
      ],
      blog_outlines: [
        {
          title: "5 Ways This Product Will Transform Your Daily Routine",
          points: [
            "Streamline your morning routine with smart automation",
            "Boost productivity throughout your workday",
            "Enhance your evening wind-down experience",
            "Create more time for what matters most",
            "Join thousands of satisfied customers who've made the switch"
          ]
        }
      ]
    }
  },
  youtubeResults: [
    {
      title: "Amazing Product Review - Is It Worth The Hype?",
      channelTitle: "Tech Reviews Daily",
      viewCount: 125000,
      likeCount: 8500,
      commentCount: 1200,
      thumbnailUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=320&h=180&fit=crop",
      url: "https://youtube.com/watch?v=demo1"
    },
    {
      title: "Unboxing & First Impressions - Game Changer!",
      channelTitle: "Unbox Everything",
      viewCount: 89000,
      likeCount: 6200,
      commentCount: 890,
      thumbnailUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=180&fit=crop",
      url: "https://youtube.com/watch?v=demo2"
    },
    {
      title: "How I Use This Product Every Day - Life Changing!",
      channelTitle: "Lifestyle Guru",
      viewCount: 67000,
      likeCount: 4800,
      commentCount: 650,
      thumbnailUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=320&h=180&fit=crop",
      url: "https://youtube.com/watch?v=demo3"
    }
  ],
  generated_at: new Date().toISOString(),
  recordId: "demo-" + Math.random().toString(36).substr(2, 9),
  source_table: "demo",
  _processing_time_ms: 1250
})

// Track processing state to prevent duplicates
let isProcessing = false
let currentProcessingKey = ''

export const apiClient = {
  async processFiles(files: File[], description: string, category: string, platform: string, onProgress: (step: string, stepProgress: number) => void) {
    console.log('🎬 DEMO MODE: Using mock data for presentation')
    console.log('processFiles called with:', files.length, 'files')
    
    // Create a unique key for this processing request
    const processingKey = `${files.map(f => f.name + f.size).join('-')}-${description}-${category}-${platform}`
    
    // Prevent duplicate processing
    if (isProcessing && currentProcessingKey === processingKey) {
      console.log('Duplicate processing request ignored')
      return new Promise(() => {}) // Never resolves, preventing duplicate completion
    }
    
    isProcessing = true
    currentProcessingKey = processingKey
    
    try {
      // Mock upload process - simulate getting presigned URLs and uploading
      onProgress?.("upload", 0)
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Get mock presigned URL (but don't actually upload)
        const response = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            filename: file.name, 
            filetype: file.type,
            description,
            category,
            platform
          })
        })
        const { uploadUrl, imageHash } = await response.json()
        
        // Skip actual upload to avoid CORS - just simulate the time
        await new Promise(resolve => setTimeout(resolve, 800))
        
        console.log('Mock upload completed for:', file.name, 'Hash:', imageHash)
        onProgress?.("upload", ((i + 1) / files.length) * 100)
      }
      
      // Mock analysis phase
      onProgress?.("analysis", 0)
      await new Promise(resolve => setTimeout(resolve, 1200))
      onProgress?.("analysis", 50)
      await new Promise(resolve => setTimeout(resolve, 1200))
      onProgress?.("analysis", 100)
      
      // Mock generation phase
      onProgress?.("generation", 0)
      await new Promise(resolve => setTimeout(resolve, 1000))
      onProgress?.("generation", 50)
      await new Promise(resolve => setTimeout(resolve, 1000))
      onProgress?.("generation", 100)
      
      // Mock optimization phase
      onProgress?.("optimization", 0)
      await new Promise(resolve => setTimeout(resolve, 800))
      onProgress?.("optimization", 50)
      await new Promise(resolve => setTimeout(resolve, 800))
      onProgress?.("optimization", 100)
      
      // Return mock results with user inputs
      return createMockResults(description, category, platform)
    } finally {
      // Reset processing state
      isProcessing = false
      currentProcessingKey = ''
    }
  },

  // Mock status check
  async checkStatus(imageHash: string) {
    console.log('Mock status check for:', imageHash)
    return { pipeline_status: "completed", next_step: "completed" }
  },

  // Mock product data
  async getProductData(imageHash: string) {
    console.log('Mock product data for:', imageHash)
    return createMockResults("Demo Product", "Electronics", "Instagram")
  },

  // Get stored data from localStorage
  getStoredData() {
    const imageHashes = JSON.parse(localStorage.getItem('imageHashes') || '[]')
    return { imageHashes }
  }
}