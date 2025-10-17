"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, ImageIcon, Sparkles, Target, Globe, Users, Brain, Lightbulb, MapPin, DollarSign, TrendingUp, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

interface SmartDataCollectionProps {
  selectedGoal: any
  aiTeam: any[]
  onComplete: (data: any) => void
}

export function SmartDataCollection({ selectedGoal, aiTeam, onComplete }: SmartDataCollectionProps) {
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    productDescription: "",
    category: "",
    targetPlatform: "",
    targetMarkets: [] as string[],
    budget: "",
    timeline: "",
    brandVoice: "",
    competitorUrls: "",
    existingCampaigns: ""
  })


  const fileUrls = useMemo(() => {
    return files.map(file => URL.createObjectURL(file))
  }, [files])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: true,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const regions = [
    { id: "north-america", name: "North America", flag: "🇺🇸", cost: 8 },
    { id: "europe", name: "Europe", flag: "🇪🇺", cost: 12 },
    { id: "asia-pacific", name: "Asia Pacific", flag: "🇯🇵", cost: 15 },
    { id: "latin-america", name: "Latin America", flag: "🇧🇷", cost: 10 },
    { id: "middle-east", name: "Middle East", flag: "🇦🇪", cost: 14 },
    { id: "africa", name: "Africa", flag: "🇿🇦", cost: 11 }
  ]

  const addRegion = (regionId: string) => {
    if (!selectedRegions.includes(regionId)) {
      const newRegions = [...selectedRegions, regionId]
      setSelectedRegions(newRegions)
      const additionalCost = regions.find(r => r.id === regionId)?.cost || 0
      setCurrentPrice((prev: number) => prev + additionalCost)
    }
  }

  const removeRegion = (regionId: string) => {
    const newRegions = selectedRegions.filter(r => r !== regionId)
    setSelectedRegions(newRegions)
    const removedCost = regions.find(r => r.id === regionId)?.cost || 0
    setCurrentPrice((prev: number) => prev - removedCost)
  }

  const addCompetitor = (url: string) => {
    if (url && !competitorUrls.includes(url)) {
      setCompetitorUrls([...competitorUrls, url])
      setCurrentPrice((prev: number) => prev + 5)
    }
  }

  const removeCompetitor = (url: string) => {
    setCompetitorUrls(competitorUrls.filter(u => u !== url))
    setCurrentPrice((prev: number) => prev - 5)
  }

  const handleSubmit = () => {
    const isValid = files.length > 0 && formData.productDescription && formData.category
    if (isValid) {
      // Map UI data to API format
      const campaignData = {
        files,
        productDescription: formData.productDescription,
        category: formData.category,
        targetPlatform: formData.targetPlatform,
        product: {
          name: formData.productDescription.split(' ').slice(0, 3).join(' ') || 'Product',
          category: formData.category,
          description: formData.productDescription
        },
        target_markets: isGlobalGoal ? selectedRegions.map(r => regions.find(reg => reg.id === r)?.name || r) : [formData.targetPlatform || 'global'],
        campaign_goals: [selectedGoal.id === 'viral-content' ? 'engagement' : selectedGoal.id === 'global-viral' ? 'brand_awareness' : 'sales'],
        selectedRegions: isGlobalGoal ? selectedRegions : [],
        competitorUrls: isPerformanceGoal ? competitorUrls : [],
        finalPrice: currentPrice,
        useComprehensive: files.length > 0 // Use comprehensive if images provided
      }
      onComplete(campaignData)
    }
  }

  const isBasicValid = files.length > 0 && formData.productDescription && formData.category
  const isAdvancedValid = isBasicValid && formData.targetPlatform

  // Dynamic form fields based on selected goal and AI team
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [currentPrice, setCurrentPrice] = useState(selectedGoal.price || 0)
  const [competitorUrls, setCompetitorUrls] = useState<string[]>([])
  
  const isGlobalGoal = selectedGoal.id === "global-viral"
  const isPerformanceGoal = selectedGoal.id === "improve-existing"
  const isViralGoal = selectedGoal.id === "viral-content"

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          <Brain className="w-4 h-4" />
          Smart Data Collection
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
          Tell Us About
          <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Your Product
          </span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Your AI team will use this information to create the perfect campaign for "{selectedGoal.title}"
        </p>
      </div>

      {/* AI Team Preview */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-slate-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-slate-900">Your Marketing Team is Standing By</span>
            </div>
            <div className="flex -space-x-2">
              {aiTeam.map((agent, index) => {
                const iconMap = { Brain, Palette, TrendingUp, Globe, Users }
                const Icon = iconMap[agent.iconName as keyof typeof iconMap] || Brain
                return (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${agent.gradient} flex items-center justify-center border-2 border-white shadow-md`}
                    title={agent.name}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Upload */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-slate-900">Product Images</CardTitle>
                <p className="text-slate-600 text-sm mt-1">Upload high-quality images of your product</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group",
                isDragActive 
                  ? "border-blue-400 bg-blue-50 scale-105" 
                  : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50",
              )}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ImageIcon className="w-8 h-8 text-blue-600" />
              </div>
              {isDragActive ? (
                <div>
                  <p className="text-blue-600 font-semibold text-lg mb-2">Drop your images here!</p>
                  <p className="text-blue-500">Release to upload your product photos</p>
                </div>
              ) : (
                <div>
                  <p className="text-slate-900 font-semibold text-lg mb-2">Drag & drop images here</p>
                  <p className="text-slate-600 mb-4">PNG, JPG, JPEG up to 10MB each</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Works best with clear, well-lit photos
                  </div>
                </div>
              )}
            </div>

            {files.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Uploaded Images ({files.length})
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <img
                          src={fileUrls[index] || "/placeholder.svg"}
                          alt={file.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-slate-900">Product Details</CardTitle>
                <p className="text-slate-600 text-sm mt-1">Help your AI team understand your product</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product Description */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Product Description
              </label>
              <Textarea
                placeholder="Describe your product, its key features, benefits, and target audience..."
                value={formData.productDescription}
                onChange={(e) => updateFormData("productDescription", e.target.value)}
                rows={4}
                className="resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
              />
            </div>

            {/* Category & Platform */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Category
                </label>
                <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                  <SelectTrigger className="h-12 border-slate-200 focus:border-emerald-400 rounded-xl">
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                    <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="electronics">Electronics & Tech</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="fitness">Health & Fitness</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Primary Platform
                </label>
                <Select value={formData.targetPlatform} onValueChange={(value) => updateFormData("targetPlatform", value)}>
                  <SelectTrigger className="h-12 border-slate-200 focus:border-emerald-400 rounded-xl">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter/X</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal-Specific Fields */}
      {isGlobalGoal && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900">Target Regions</CardTitle>
                  <p className="text-slate-600 text-sm mt-1">Select regions for global viral campaigns</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">${currentPrice}</div>
                <div className="text-xs text-slate-500">total cost</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {regions.map((region) => {
                const isSelected = selectedRegions.includes(region.id)
                return (
                  <Button
                    key={region.id}
                    variant="outline"
                    className={`h-auto p-4 justify-start transition-all ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-md' 
                        : 'hover:bg-blue-50/50 hover:border-blue-200'
                    }`}
                    onClick={() => isSelected ? removeRegion(region.id) : addRegion(region.id)}
                  >
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{region.flag}</span>
                        <span className="font-medium text-sm">{region.name}</span>
                      </div>
                      <div className="text-xs text-slate-500">+${region.cost}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
            {selectedRegions.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">Selected Regions</span>
                  <span className="text-sm text-blue-600">{selectedRegions.length} regions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedRegions.map((regionId) => {
                    const region = regions.find(r => r.id === regionId)
                    return (
                      <Badge key={regionId} className="bg-blue-100 text-blue-700 border-blue-200">
                        {region?.flag} {region?.name}
                        <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeRegion(regionId)} />
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isPerformanceGoal && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900">Competitor Analysis</CardTitle>
                  <p className="text-slate-600 text-sm mt-1">Add competitors for deeper insights</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">${currentPrice}</div>
                <div className="text-xs text-slate-500">total cost</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                placeholder="Enter competitor YouTube channel or website URL"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement
                    if (target.value) {
                      addCompetitor(target.value)
                      target.value = ''
                    }
                  }
                }}
                className="border-slate-200 rounded-xl"
              />
              <p className="text-xs text-slate-500">Press Enter to add • Each competitor adds $5</p>
            </div>
            {competitorUrls.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">Competitors to Analyze</span>
                  <span className="text-sm text-green-600">{competitorUrls.length} added</span>
                </div>
                <div className="space-y-2">
                  {competitorUrls.map((url, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-slate-700 truncate flex-1">{url}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCompetitor(url)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isViralGoal && (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900">Viral Content Preferences</CardTitle>
                  <p className="text-slate-600 text-sm mt-1">Optimize for maximum engagement</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">${currentPrice}</div>
                <div className="text-xs text-slate-500">total cost</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-900">Content Style</label>
                <Select value={formData.brandVoice} onValueChange={(value) => updateFormData("brandVoice", value)}>
                  <SelectTrigger className="border-slate-200 rounded-xl">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trendy">Trendy & Hip</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="entertaining">Entertaining</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-900">Target Audience</label>
                <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                  <SelectTrigger className="border-slate-200 rounded-xl">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gen-z">Gen Z (16-24)</SelectItem>
                    <SelectItem value="millennials">Millennials (25-40)</SelectItem>
                    <SelectItem value="gen-x">Gen X (41-56)</SelectItem>
                    <SelectItem value="all">All Ages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <div className="text-center pt-8">
        <div className="mb-6 p-6 bg-slate-50 rounded-2xl max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600">Base Campaign</span>
            <span className="font-medium">${selectedGoal.price}</span>
          </div>
          {isGlobalGoal && selectedRegions.length > 0 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">{selectedRegions.length} Additional Regions</span>
              <span className="font-medium">+${currentPrice - selectedGoal.price}</span>
            </div>
          )}
          {isPerformanceGoal && competitorUrls.length > 0 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">{competitorUrls.length} Competitor Analysis</span>
              <span className="font-medium">+${competitorUrls.length * 5}</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">Total Cost</span>
              <span className="text-2xl font-bold text-blue-600">${currentPrice}</span>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={!isBasicValid}
          size="lg"
          className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Campaign • ${currentPrice}
        </Button>
        <p className="text-sm text-slate-500 mt-3">
          Your specialized team will create your {selectedGoal.title.toLowerCase()} campaign
        </p>
      </div>
    </div>
  )
}