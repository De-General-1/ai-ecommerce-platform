import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Video, Mail, FileText, Download, Eye } from "lucide-react"

interface GeneratedAssetsProps {
  assets: any
}

export function GeneratedAssets({ assets }: GeneratedAssetsProps) {
  return (
    <div className="space-y-6">
      {/* Image Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            AI Image Prompts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {assets?.image_prompts?.map((prompt: string, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <p className="text-sm mb-3">{prompt}</p>
              <div className="flex gap-2">
                <Button size="sm">Generate Image</Button>
                {/* <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button> */}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Video Scripts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Video Scripts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {assets?.video_scripts?.map((script: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary">{script.type}</Badge>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              <p className="text-sm">{script.content}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm">Use Script</Button>
                {/* <Button variant="outline" size="sm">
                  Edit
                </Button> */}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {assets?.email_templates?.map((template: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="mb-3">
                <h4 className="font-medium">Subject Line</h4>
                <p className="text-sm text-muted-foreground">{template.subject}</p>
              </div>
              <div className="mb-3">
                <h4 className="font-medium">Email Body</h4>
                <p className="text-sm text-muted-foreground">{template.body}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Use Template</Button>
                {/* <Button variant="outline" size="sm">
                  Customize
                </Button> */}
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Blog Outlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Blog Post Outlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {assets?.blog_outlines?.map((outline: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3">{outline.title}</h4>
              <div className="space-y-2 mb-4">
                {outline.points?.map((point: string, pointIndex: number) => (
                  <div key={pointIndex} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{point}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm">Write Blog Post</Button>
                <Button variant="outline" size="sm">
                  Expand Outline
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
