import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Video, FileText, Download, Eye, Play, ExternalLink } from "lucide-react"
import type { GeneratedAssets } from "@/lib/types"

interface GeneratedAssetsProps {
  assets: GeneratedAssets
}

export function GeneratedAssets({ assets }: GeneratedAssetsProps) {
  const downloadAsset = (url: string, filename: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.target = '_blank'
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Video Scripts */}
      {assets?.video_scripts && assets.video_scripts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Video Scripts ({assets.video_scripts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assets.video_scripts.map((script, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{script.platform}</Badge>
                    <span className="text-sm text-slate-600">{script.duration}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => downloadAsset(script.url, `${script.platform}-script.txt`)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <h4 className="font-medium mb-2">{script.title}</h4>
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <a href={script.url} target="_blank" rel="noopener noreferrer">
                      <Eye className="w-4 h-4 mr-2" />
                      View Script
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Social Media Images */}
      {assets?.social_images && assets.social_images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Social Media Images ({assets.social_images.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.social_images.map((image, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-slate-100 flex items-center justify-center">
                    <img 
                      src={image.url} 
                      alt={`${image.platform} social media post`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder.svg'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{image.platform}</Badge>
                      <span className="text-xs text-slate-500">{image.format}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{image.prompt}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => downloadAsset(image.url, `${image.platform}-post.png`)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={image.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Thumbnails */}
      {assets?.thumbnails && assets.thumbnails.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Video Thumbnails ({assets.thumbnails.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.thumbnails.map((thumbnail, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-slate-100 flex items-center justify-center relative">
                    <img 
                      src={thumbnail.url} 
                      alt={`${thumbnail.type} thumbnail`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder.svg'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{thumbnail.type}</Badge>
                      <span className="text-xs text-slate-500">{thumbnail.format}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => downloadAsset(thumbnail.url, `${thumbnail.type}-thumbnail.png`)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={thumbnail.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ad Creatives */}
      {assets?.ad_creatives && assets.ad_creatives.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Ad Creatives ({assets.ad_creatives.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.ad_creatives.map((ad, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-slate-100 flex items-center justify-center">
                    <img 
                      src={ad.url} 
                      alt={`${ad.type} ad creative`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder.svg'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{ad.type}</Badge>
                      <span className="text-xs text-slate-500">{ad.format}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => downloadAsset(ad.url, `${ad.type}-ad.png`)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={ad.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {(!assets?.video_scripts?.length && !assets?.social_images?.length && !assets?.thumbnails?.length && !assets?.ad_creatives?.length) && (
        <Card>
          <CardContent className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Visual Assets Generated</h3>
            <p className="text-slate-600">Visual assets will appear here when generated by the comprehensive campaign.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
