"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface PlatformChartProps {
  campaigns: any[]
}

export function PlatformChart({ campaigns }: PlatformChartProps) {
  // Process platform data from campaigns
  const platformData =
    campaigns?.reduce((acc: any, campaign) => {
      campaign.platforms?.forEach((platform: string) => {
        acc[platform] = (acc[platform] || 0) + 1
      })
      return acc
    }, {}) || {}

  const chartData = Object.entries(platformData).map(([platform, count]) => ({
    name: platform,
    value: count as number,
    percentage: Math.round(
      ((count as number) / Object.values(platformData).reduce((a: number, b: number) => a + b, 0)) * 100,
    ),
  }))

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-background border rounded-lg p-3 shadow-lg">
                      <p className="font-medium">{data.name}</p>
                      <p className="text-sm">
                        <span className="text-primary font-medium">{data.value}</span> campaigns
                      </p>
                      <p className="text-sm text-muted-foreground">{data.percentage}% of total</p>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
