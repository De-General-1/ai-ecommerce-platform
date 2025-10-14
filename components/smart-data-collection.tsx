"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, ImageIcon, Sparkles, Target, Globe, Users, Brain, Lightbulb, MapPin, DollarSign } from "lucide-react"
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

  const addTargetMarket = (market: string) => {
    if (market && !formData.targetMarkets.includes(market)) {
      updateFormData("targetMarkets", [...formData.targetMarkets, market])
    }
  }

  const removeTargetMarket = (market: string) => {
    updateFormData("targetMarkets", formData.targetMarkets.filter(m => m !== market))
  }

  const handleSubmit = () => {
    const isValid = files.length > 0 && formData.productDescription && formData.category
    if (isValid) {
      onComplete({ files, ...formData })
    }
  }

  const isBasicValid = files.length > 0 && formData.productDescription && formData.category
  const isAdvancedValid = isBasicValid && formData.targetPlatform

  // Dynamic form fields based on selected goal and AI team
  const showAdvancedFields = selectedGoal.complexity === "Advanced"
  const showGlobalFields = aiTeam.some(agent => agent.id === "cultural-expert")
  const showMarketFields = aiTeam.some(agent => agent.id === "market-researcher")

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
                const Icon = agent.icon
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

      {/* Advanced Fields */}
      {showAdvancedFields && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Global Markets */}
          {showGlobalFields && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900">Target Markets</CardTitle>
                    <p className="text-slate-600 text-sm mt-1">Select markets for cultural adaptation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {["United States", "United Kingdom", "Japan", "Germany", "France", "Brazil", "India", "Australia"].map((market) => (
                    <Button
                      key={market}
                      variant="outline"
                      size="sm"
                      className={`justify-start ${formData.targetMarkets.includes(market) ? 'bg-green-50 border-green-300 text-green-700' : ''}`}
                      onClick={() => formData.targetMarkets.includes(market) ? removeTargetMarket(market) : addTargetMarket(market)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {market}
                    </Button>
                  ))}
                </div>
                {formData.targetMarkets.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {formData.targetMarkets.map((market) => (
                      <Badge key={market} variant="secondary" className="bg-green-100 text-green-700">
                        {market}
                        <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeTargetMarket(market)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Market Research */}
          {showMarketFields && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900">Additional Context</CardTitle>
                    <p className="text-slate-600 text-sm mt-1">Help your team with extra insights</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-900">Budget Range</label>
                  <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                    <SelectTrigger className="border-slate-200 rounded-xl">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1k">Under $1,000</SelectItem>
                      <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-plus">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-900">Competitor URLs</label>
                  <Textarea
                    placeholder="Share competitor websites or social profiles for analysis..."
                    value={formData.competitorUrls}
                    onChange={(e) => updateFormData("competitorUrls", e.target.value)}
                    rows={3}
                    className="resize-none border-slate-200 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center pt-8">
        <Button
          onClick={handleSubmit}
          disabled={!isBasicValid}
          size="lg"
          className="px-12 py-4 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Start Marketing Collaboration
        </Button>
        <p className="text-sm text-slate-500 mt-3">
          Your marketing team will begin working immediately after you submit
        </p>
      </div>
    </div>
  )
}