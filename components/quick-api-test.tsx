"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBasicCampaign } from "@/lib/queries"
import { Loader2, TestTube } from "lucide-react"

export function QuickApiTest() {
  const basicCampaign = useBasicCampaign()

  const testBasicApi = () => {
    const testData = {
      product: {
        name: 'Test Coffee Maker',
        category: 'electronics',
        description: 'Premium coffee maker for testing API integration'
      },
      target_markets: ['US'],
      campaign_goals: ['brand_awareness']
    }
    
    console.log('Testing Basic Campaign API with:', testData)
    basicCampaign.mutate(testData)
  }

  return (
    <Card className="max-w-md mx-auto m-4 border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="w-5 h-5" />
          Quick API Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testBasicApi}
          disabled={basicCampaign.isPending}
          className="w-full"
        >
          {basicCampaign.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testing API...
            </>
          ) : (
            'Test Basic Campaign API'
          )}
        </Button>
        
        {basicCampaign.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
            Error: {basicCampaign.error.message}
          </div>
        )}
        
        {basicCampaign.data && (
          <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
            API Success! Check console for details.
          </div>
        )}
      </CardContent>
    </Card>
  )
}