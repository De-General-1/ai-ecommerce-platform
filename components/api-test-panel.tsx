"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { testApiIntegration, mockCampaignResponse } from "@/lib/integration-test"
import { useBasicCampaign, useComprehensiveCampaign } from "@/lib/queries"
import { CheckCircle, XCircle, Loader2, TestTube, Zap } from "lucide-react"

export function ApiTestPanel() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isTestingLocal, setIsTestingLocal] = useState(false)
  
  const basicCampaign = useBasicCampaign()
  const comprehensiveCampaign = useComprehensiveCampaign()

  const runLocalTest = async () => {
    setIsTestingLocal(true)
    try {
      const result = await testApiIntegration()
      setTestResults({ success: result, type: 'local', timestamp: new Date() })
    } catch (error) {
      setTestResults({ success: false, type: 'local', error: error?.toString(), timestamp: new Date() })
    } finally {
      setIsTestingLocal(false)
    }
  }

  const testBasicCampaign = () => {
    const testData = {
      product: {
        name: 'Test Product',
        category: 'electronics',
        description: 'A test product for API validation'
      },
      target_markets: ['US', 'Europe'],
      campaign_goals: ['brand_awareness']
    }
    
    basicCampaign.mutate(testData)
  }

  const testComprehensiveCampaign = () => {
    const testData = {
      product: {
        name: 'Test Product',
        category: 'electronics', 
        description: 'A test product for comprehensive API validation'
      },
      target_markets: ['US', 'Europe', 'Asia'],
      campaign_goals: ['brand_awareness', 'sales']
    }
    
    comprehensiveCampaign.mutate(testData)
  }

  const useMockData = () => {
    setTestResults({ 
      success: true, 
      type: 'mock', 
      data: mockCampaignResponse,
      timestamp: new Date() 
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5 text-blue-600" />
            API Integration Testing Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Local Integration Test */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Local Integration Test</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Test API client configuration and basic connectivity
                </p>
                <Button 
                  onClick={runLocalTest}
                  disabled={isTestingLocal}
                  className="w-full"
                  variant="outline"
                >
                  {isTestingLocal ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <TestTube className="w-4 h-4 mr-2" />
                      Run Local Test
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Basic Campaign Test */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Basic Campaign API</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Test /api/campaigns endpoint
                </p>
                <Button 
                  onClick={testBasicCampaign}
                  disabled={basicCampaign.isPending}
                  className="w-full"
                  variant="outline"
                >
                  {basicCampaign.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Test Basic API
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Comprehensive Campaign Test */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Comprehensive Campaign API</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Test /api/comprehensive-campaign endpoint
                </p>
                <Button 
                  onClick={testComprehensiveCampaign}
                  disabled={comprehensiveCampaign.isPending}
                  className="w-full"
                  variant="outline"
                >
                  {comprehensiveCampaign.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Test Comprehensive API
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Mock Data Test */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Mock Data Test</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Use mock response for UI testing
                </p>
                <Button 
                  onClick={useMockData}
                  className="w-full"
                  variant="outline"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  Use Mock Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {(testResults || basicCampaign.data || comprehensiveCampaign.data || basicCampaign.error || comprehensiveCampaign.error) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(testResults?.success || basicCampaign.data || comprehensiveCampaign.data) ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              Test Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Local Test Results */}
            {testResults && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={testResults.success ? "default" : "destructive"}>
                    {testResults.type.toUpperCase()} TEST
                  </Badge>
                  <span className="text-sm text-slate-500">
                    {testResults.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {testResults.error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    {testResults.error}
                  </div>
                )}
                {testResults.data && (
                  <Textarea
                    value={JSON.stringify(testResults.data, null, 2)}
                    readOnly
                    rows={10}
                    className="font-mono text-xs"
                  />
                )}
              </div>
            )}

            {/* Basic Campaign Results */}
            {basicCampaign.data && (
              <div>
                <Badge className="mb-2">BASIC CAMPAIGN SUCCESS</Badge>
                <Textarea
                  value={JSON.stringify(basicCampaign.data, null, 2)}
                  readOnly
                  rows={8}
                  className="font-mono text-xs"
                />
              </div>
            )}

            {/* Comprehensive Campaign Results */}
            {comprehensiveCampaign.data && (
              <div>
                <Badge className="mb-2">COMPREHENSIVE CAMPAIGN SUCCESS</Badge>
                <Textarea
                  value={JSON.stringify(comprehensiveCampaign.data, null, 2)}
                  readOnly
                  rows={8}
                  className="font-mono text-xs"
                />
              </div>
            )}

            {/* Error Results */}
            {(basicCampaign.error || comprehensiveCampaign.error) && (
              <div>
                <Badge variant="destructive" className="mb-2">API ERROR</Badge>
                <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                  {basicCampaign.error?.message || comprehensiveCampaign.error?.message}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}