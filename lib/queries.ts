import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { config } from './config'

// Types
interface UploadFileParams {
  file: File
  description: string
  category: string
  platform: string
}

interface StatusResponse {
  pipeline_status: string
  next_step: string
  imageHash: string
}

interface ProductDataResponse {
  pipeline_status: string
  originalData: any
  parsedCampaigns: any
  youtubeResults: any[]
}

// API Functions
async function uploadFile({ file, description, category, platform }: UploadFileParams) {
  const response = await fetch("/api/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      filename: file.name, 
      filetype: file.type,
      description,
      category,
      platform
    })
  })
  
  if (!response.ok) throw new Error("Upload URL failed")
  const { uploadUrl, imageHash } = await response.json()
  
  const uploadResponse = await fetch(uploadUrl, { method: "PUT", body: file })
  if (!uploadResponse.ok) throw new Error("File upload failed")
  
  return { imageHash, filename: file.name }
}

async function checkStatus(imageHash: string): Promise<StatusResponse> {
  const response = await fetch(`${config.api.statusEndpoint}/${imageHash}`)
  if (!response.ok) throw new Error("Status check failed")
  return response.json()
}

async function getProductData(imageHash: string): Promise<ProductDataResponse> {
  const response = await fetch(`${config.api.productEndpoint}/${imageHash}`)
  if (!response.ok) throw new Error("Product data fetch failed")
  return response.json()
}

// Hooks
export function useUploadFile() {
  return useMutation({
    mutationFn: uploadFile,
  })
}

export function useStatusPolling(imageHash: string | null, enabled: boolean = true) {
  return useQuery({
    queryKey: ['status', imageHash],
    queryFn: () => checkStatus(imageHash!),
    enabled: enabled && !!imageHash,
    refetchInterval: (query) => {
      return query.state.data?.pipeline_status === 'completed' ? false : 5000
    },
    refetchIntervalInBackground: true,
  })
}

export function useProductData(imageHash: string | null, enabled: boolean = false) {
  return useQuery({
    queryKey: ['product', imageHash],
    queryFn: () => getProductData(imageHash!),
    enabled: enabled && !!imageHash,
  })
}

// Combined hook for the full process
export function useProcessFiles() {
  const queryClient = useQueryClient()
  const uploadMutation = useUploadFile()
  
  return useMutation({
    mutationFn: async ({ 
      files, 
      description, 
      category, 
      platform, 
      onProgress 
    }: {
      files: File[]
      description: string
      category: string
      platform: string
      onProgress?: (step: string, progress: number) => void
    }) => {
      const imageHashes: string[] = []
      
      // Upload files
      onProgress?.("upload", 0)
      for (let i = 0; i < files.length; i++) {
        const result = await uploadFile({ 
          file: files[i], 
          description, 
          category, 
          platform 
        })
        imageHashes.push(result.imageHash)
        onProgress?.("upload", ((i + 1) / files.length) * 100)
      }
      
      // Store in localStorage
      localStorage.setItem('imageHashes', JSON.stringify(imageHashes))
      
      return { imageHashes, primaryHash: imageHashes[0] }
    },
    onSuccess: (data: any) => {
      // Invalidate status queries to start polling
      queryClient.invalidateQueries({ queryKey: ['status'] })
    }
  })
}