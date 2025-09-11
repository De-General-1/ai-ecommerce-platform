export const apiClient = {
  async processFiles(files: string | any[], description: string, category: string, platform: string, onProgress: { (step: string, stepProgress: number): void; (step: string, stepProgress: number): void; (arg0: string, arg1: number): void }) {
    const fileKeys = []
    
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
      const { uploadUrl, fileKey } = await response.json()
      await fetch(uploadUrl, { method: "PUT", body: file })
      fileKeys.push(fileKey)
      onProgress?.("upload", ((i + 1) / files.length) * 100)
    }

    // Analysis
    onProgress?.("analysis", 0)
    const analysisResponse = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileKeys, description, category, platform })
    })
    const results = await analysisResponse.json()
    onProgress?.("analysis", 100)

    // Generation
    onProgress?.("generation", 0)
    for (let i = 0; i <= 100; i += 20) {
      onProgress?.("generation", i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // Optimization
    onProgress?.("optimization", 0)
    for (let i = 0; i <= 100; i += 25) {
      onProgress?.("optimization", i)
      await new Promise(resolve => setTimeout(resolve, 150))
    }
    
    return results
  }
}