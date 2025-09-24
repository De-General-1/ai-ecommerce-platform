// Track processing state to prevent duplicates
let isProcessing = false
let currentProcessingKey = ''

export const apiClient = {
  async processFiles(files: File[], description: string, category: string, platform: string, onProgress: { (step: string, stepProgress: number): void; (step: string, stepProgress: number): void; (arg0: string, arg1: number): void }) {
    console.log('processFiles called with:', files.length, 'files')
    
    // Create a unique key for this processing request
    const processingKey = `${files.map(f => f.name + f.size).join('-')}-${description}-${category}-${platform}`
    
    // Prevent duplicate processing
    if (isProcessing && currentProcessingKey === processingKey) {
      console.log('Duplicate processing request ignored')
      return new Promise(() => {}) // Never resolves, preventing duplicate completion
    }
    
    isProcessing = true
    currentProcessingKey = processingKey
    
    try {
      const imageHashes = []
    
    // Upload files
    onProgress?.("upload", 0)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
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
      const { uploadUrl, imageHash,requiredHeaders } = await response.json()
      await fetch(uploadUrl, { method: "PUT", body: file, headers: requiredHeaders })
      
      console.log({imageHash})
      imageHashes.push(imageHash)
      
      onProgress?.("upload", ((i + 1) / files.length) * 100)
    }
    
    // Store hashes in localStorage
    localStorage.setItem('imageHashes', JSON.stringify(imageHashes))

    // Poll status for the first image hash to track progress
    const primaryHash = imageHashes[0]
    let currentStep = "analysis"
    let isCompleted = false
    
    while (!isCompleted) {
      const statusData = await this.checkStatus(primaryHash)
      
      if (statusData.pipeline_status === "completed") {
        isCompleted = true
        onProgress?.("optimization", 100)
        break
      }
      
      // Update progress based on next_step
      switch (statusData.next_step) {
        case "content_generation":
          if (currentStep !== "analysis") break
          onProgress?.("analysis", 100)
          onProgress?.("generation", 0)
          currentStep = "generation"
          break
        case "optimization":
          if (currentStep !== "generation") break
          onProgress?.("generation", 100)
          onProgress?.("optimization", 0)
          currentStep = "optimization"
          break
        default:
          // Still in analysis phase
          onProgress?.("analysis", 50)
      }
      
      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
    
      // Get final product data
      const productData = await this.getProductData(primaryHash)
      
      return { ...productData, imageHashes }
    } finally {
      // Reset processing state
      isProcessing = false
      currentProcessingKey = ''
    }
  },

  // Check status using image hash
  async checkStatus(imageHash: string) {
    const response = await fetch(`https://x3dp4d9bib.execute-api.eu-west-2.amazonaws.com/dev/status/${imageHash}`)
    return await response.json()
  },

  // Get product data using image hash
  async getProductData(imageHash: string) {
    const response = await fetch(`https://x3dp4d9bib.execute-api.eu-west-2.amazonaws.com/dev/product/${imageHash}`)
    return await response.json()
  },

  // Get stored data from localStorage
  getStoredData() {
    const imageHashes = JSON.parse(localStorage.getItem('imageHashes') || '[]')
    return { imageHashes }
  }
}