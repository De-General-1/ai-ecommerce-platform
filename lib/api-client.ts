// Legacy API client - replaced by React Query hooks in queries.ts
// Keeping minimal functions for backward compatibility

export const apiClient = {
  // Get stored data from localStorage
  getStoredData() {
    const imageHashes = JSON.parse(localStorage.getItem('imageHashes') || '[]')
    return { imageHashes }
  }
}