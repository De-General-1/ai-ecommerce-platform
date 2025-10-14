import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Target, Users } from "lucide-react"

interface CampaignCardsProps {
  campaigns: any[]
}

export function CampaignCards({ campaigns }: CampaignCardsProps) {
  return (
    <div className="grid gap-6">
      {campaigns?.map((campaign, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{campaign.name}</CardTitle>
                <p className="text-muted-foreground mt-1">Multi-platform marketing campaign</p>
              </div>
              <Badge variant="secondary">{campaign.duration}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Campaign Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{campaign.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Posts/Week</p>
                  <p className="font-medium">{campaign.posts_per_week}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Platforms</p>
                  <p className="font-medium">{campaign.platforms?.length || 0}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Est. Reach</p>
                  <p className="font-medium">{campaign.estimated_reach || "--"}</p>
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <h4 className="font-medium mb-2">Target Platforms</h4>
              <div className="flex gap-2">
                {campaign.platforms?.map((platform: string) => (
                  <Badge key={platform} variant="outline">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Campaign Calendar */}
            <div>
              <h4 className="font-medium mb-3">Campaign Timeline</h4>
              <div className="space-y-2">
                {Object.entries(campaign.calendar || {}).map(([week, content]) => (
                  <div key={week} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Badge variant="secondary" className="mt-0.5">
                      {week}
                    </Badge>
                    <p className="text-sm">{content as string}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Adaptations */}
            <div>
              <h4 className="font-medium mb-3">Platform-Specific Content</h4>
              <div className="space-y-2">
                {Object.entries(campaign.adaptations || {}).map(([platform, content]) => (
                  <div key={platform} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Badge variant="outline" className="mt-0.5">
                      {platform}
                    </Badge>
                    <p className="text-sm">{content as string}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button>Launch Campaign</Button>
              <Button variant="outline">Customize</Button>
              <Button variant="outline">Preview</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
