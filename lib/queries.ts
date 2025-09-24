import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
  // 1. Get presigned URL
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
  const { uploadUrl, requiredHeaders, imageHash } = await response.json()
  
  // 2. Upload with EXACT headers
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: requiredHeaders, // Use these exact headers!
    body: file
  })
  
  if (!uploadResponse.ok) throw new Error("File upload failed")
  
  return { imageHash, filename: file.name }
}

async function checkStatus(imageHash: string): Promise<StatusResponse> {
  const statusEndpoint = process.env.NEXT_PUBLIC_STATUS_ENDPOINT || 'https://1mpyrh4oq9.execute-api.eu-west-2.amazonaws.com/dev/status'
  const response = await fetch(`${statusEndpoint}/${imageHash}`)
  if (!response.ok) throw new Error("Status check failed")
  return response.json()
}

async function getProductData(imageHash: string): Promise<ProductDataResponse> {
  const productEndpoint = process.env.NEXT_PUBLIC_PRODUCT_ENDPOINT || 'https://1mpyrh4oq9.execute-api.eu-west-2.amazonaws.com/dev/product'
  const response = await fetch(`${productEndpoint}/${imageHash}`)
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
    onSuccess: () => {
      // Invalidate status queries to start polling
      queryClient.invalidateQueries({ queryKey: ['status'] })
    }
  })
}