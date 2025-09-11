"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Copy, Heart, MessageCircle, Share } from "lucide-react"

interface ContentIdeasProps {
  ideas: any[]
}

export function ContentIdeas({ ideas }: ContentIdeasProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {ideas?.map((idea, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{idea.topic}</CardTitle>
              <Badge variant={idea.engagement_score > 85 ? "default" : "secondary"} className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {idea.engagement_score}%
              </Badge>
            </div>
            <Badge variant="outline" className="w-fit">
              {idea.platform}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Caption */}
            <div>
              <h4 className="font-medium mb-2">Caption</h4>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm">{idea.caption}</p>
                <Button variant="ghost" size="sm" className="mt-2 h-8" onClick={() => copyToClipboard(idea.caption)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Caption
                </Button>
              </div>
            </div>

            {/* Hashtags */}
            <div>
              <h4 className="font-medium mb-2">Hashtags</h4>
              <div className="flex flex-wrap gap-1">
                {idea.hashtags?.map((hashtag: string) => (
                  <Badge key={hashtag} variant="secondary" className="text-xs">
                    {hashtag}
                  </Badge>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-8"
                onClick={() => copyToClipboard(idea.hashtags?.join(" ") || "")}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Hashtags
              </Button>
            </div>

            {/* Engagement Prediction */}
            <div className="bg-primary/5 p-3 rounded-lg">
              <h4 className="font-medium mb-2 text-primary">Engagement Prediction</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <Heart className="w-4 h-4 mx-auto mb-1 text-red-500" />
                  <p className="font-medium">{Math.floor(idea.engagement_score * 12)}K</p>
                  <p className="text-muted-foreground text-xs">Likes</p>
                </div>
                <div className="text-center">
                  <MessageCircle className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                  <p className="font-medium">{Math.floor(idea.engagement_score * 2.5)}K</p>
                  <p className="text-muted-foreground text-xs">Comments</p>
                </div>
                <div className="text-center">
                  <Share className="w-4 h-4 mx-auto mb-1 text-green-500" />
                  <p className="font-medium">{Math.floor(idea.engagement_score * 1.2)}K</p>
                  <p className="text-muted-foreground text-xs">Shares</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm">Use This Idea</Button>
              <Button variant="outline" size="sm">
                Customize
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
