// File storage utility for handling File objects across page navigation

class FileStorage {
  private files: Map<string, File[]> = new Map()
  
  storeFiles(key: string, files: File[]): void {
    this.files.set(key, files)
    console.log(`📁 Stored ${files.length} files with key: ${key}`)
  }
  
  getFiles(key: string): File[] {
    const files = this.files.get(key) || []
    console.log(`📁 Retrieved ${files.length} files with key: ${key}`)
    return files
  }
  
  clearFiles(key: string): void {
    this.files.delete(key)
    console.log(`🗑️ Cleared files with key: ${key}`)
  }
  
  hasFiles(key: string): boolean {
    return this.files.has(key) && this.files.get(key)!.length > 0
  }
}

export const fileStorage = new FileStorage()