"use client"

import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dynamic import for recharts to reduce bundle size
const BarChart = dynamic(() => import("recharts").then(mod => ({ default: mod.BarChart })), { ssr: false })
const Bar = dynamic(() => import("recharts").then(mod => ({ default: mod.Bar })), { ssr: false })
const XAxis = dynamic(() => import("recharts").then(mod => ({ default: mod.XAxis })), { ssr: false })
const YAxis = dynamic(() => import("recharts").then(mod => ({ default: mod.YAxis })), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then(mod => ({ default: mod.CartesianGrid })), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then(mod => ({ default: mod.Tooltip })), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => ({ default: mod.ResponsiveContainer })), { ssr: false })

interface EngagementChartProps {
  data: any[]
}

export function EngagementChart({ data }: EngagementChartProps) {
  const chartData =
    data?.map((item, index) => ({
      name: `Idea ${index + 1}`,
      engagement: item.engagement_score,
      platform: item.platform,
      topic: item.topic,
    })) || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Engagement Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-background border rounded-lg p-3 shadow-lg">
                      <p className="font-medium">{data.topic}</p>
                      <p className="text-sm text-muted-foreground">{data.platform}</p>
                      <p className="text-sm">
                        <span className="text-primary font-medium">{data.engagement}%</span> engagement
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
