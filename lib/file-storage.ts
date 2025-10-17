// Simple file storage utility
export const fileStorage = {
  store: (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data))
    }
  },
  
  retrieve: (key: string) => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    }
    return null
  },
  
  remove: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  },
  
  storeFiles: (files: any) => {
    // Handle both File arrays and other data
    if (Array.isArray(files)) {
      const fileData = files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }))
      fileStorage.store('uploadedFiles', fileData)
    } else {
      fileStorage.store('uploadedFiles', files)
    }
  },
  
  getFiles: (key: string) => {
    return fileStorage.retrieve(key) || []
  }
}