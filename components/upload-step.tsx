"use client"

import { useState, useCallback, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, ImageIcon, Sparkles, Target, Globe, Shirt, Palette, Home, Smartphone, Coffee, Dumbbell, Package, Music, Camera, Youtube, Users, Twitter, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadStepProps {
  onComplete: (productData: { name: string, description: string, category: string, platform: string }) => void
}

export function UploadStep({ onComplete }: UploadStepProps) {
  const [files, setFiles] = useState<File[]>([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [platform, setPlatform] = useState("")
  
  // Memoize blob URLs to prevent recreation on every render
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
    multiple: false,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (name && description && category && platform) {
      onComplete({ name, description, category, platform })
    }
  }

  const isValid = name && description && category && platform

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-slate-900">Upload Product Images</CardTitle>
              <p className="text-slate-600 mt-1">Start by uploading high-quality images of your product</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group",
              isDragActive 
                ? "border-indigo-400 bg-indigo-50 scale-105" 
                : "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 hover:scale-102",
            )}
          >
            <input {...getInputProps()} />
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ImageIcon className="w-10 h-10 text-indigo-600" />
            </div>
            {isDragActive ? (
              <div>
                <p className="text-indigo-600 font-semibold text-lg mb-2">Drop your images here!</p>
                <p className="text-indigo-500">Release to upload your product photos</p>
              </div>
            ) : (
              <div>
                <p className="text-slate-900 font-semibold text-lg mb-2">Drag & drop images here, or click to browse</p>
                <p className="text-slate-600 mb-4">PNG, JPG, JPEG up to 10MB each</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  AI works best with clear, well-lit photos
                </div>
              </div>
            )}
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Uploaded Images ({files.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                    <p className="text-xs text-slate-600 mt-2 truncate font-medium">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-slate-900">Product Details</CardTitle>
              <p className="text-slate-600 mt-1">Help our AI understand your product and target audience</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-8">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter your product name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Product Description
            </label>
            <Textarea
              placeholder="Describe your product, its key features, benefits, and target audience. The more details you provide, the better our AI can create personalized campaigns..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="resize-none border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl"
            />
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Tip: Include target demographics, use cases, and unique selling points
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Product Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl">
                  <SelectValue placeholder="Choose your product category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">
                    <div className="flex items-center gap-2">
                      <Shirt className="w-4 h-4" />
                      Fashion & Apparel
                    </div>
                  </SelectItem>
                  <SelectItem value="beauty">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Beauty & Cosmetics
                    </div>
                  </SelectItem>
                  <SelectItem value="home">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Home & Garden
                    </div>
                  </SelectItem>
                  <SelectItem value="electronics">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Electronics & Tech
                    </div>
                  </SelectItem>
                  <SelectItem value="food">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4" />
                      Food & Beverage
                    </div>
                  </SelectItem>
                  <SelectItem value="fitness">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4" />
                      Health & Fitness
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Other
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Primary Platform
              </label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="h-12 border-slate-200 focus:border-green-400 focus:ring-green-400/20 rounded-xl">
                  <SelectValue placeholder="Select your main platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tiktok">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      TikTok
                    </div>
                  </SelectItem>
                  <SelectItem value="instagram">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Instagram
                    </div>
                  </SelectItem>
                  <SelectItem value="youtube">
                    <div className="flex items-center gap-2">
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </div>
                  </SelectItem>
                  <SelectItem value="facebook">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Facebook
                    </div>
                  </SelectItem>
                  <SelectItem value="twitter">
                    <div className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter/X
                    </div>
                  </SelectItem>
                  <SelectItem value="linkedin">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      LinkedIn
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={handleSubmit} 
          disabled={!isValid} 
          size="lg" 
          className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Generate AI Campaigns
        </Button>
      </div>
    </div>
  )
}
