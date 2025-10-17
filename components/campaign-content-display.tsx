"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Download, ExternalLink } from "lucide-react"

interface CampaignContentDisplayProps {
  content: string
  campaignId?: string
  status?: string
}

export function CampaignContentDisplay({ content, campaignId, status }: CampaignContentDisplayProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
  }

  const downloadContent = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `campaign-${campaignId || 'strategy'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-900">Campaign Strategy</CardTitle>
            {campaignId && (
              <p className="text-slate-600 text-sm mt-1">Campaign ID: {campaignId}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {status && (
              <Badge className={
                status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                status === 'awaiting_assets' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                'bg-blue-100 text-blue-700 border-blue-200'
              }>
                {status === 'awaiting_assets' ? 'Assets Generating' : status}
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={downloadContent}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-50 rounded-xl p-6 max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
            {content}
          </pre>
        </div>
        
        {status === 'awaiting_assets' && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-center gap-2 text-yellow-800">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Visual assets are being generated in the background</span>
            </div>
            <p className="text-yellow-700 text-sm mt-1">
              Thumbnails, social media posts, and ad creatives will be available shortly. 
              You can download the strategy now and assets will be added when ready.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}