"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount: number, error: any) => {
          // Don't retry on 4xx errors
          if (error?.status >= 400 && error?.status < 500) return false
          return failureCount < 3
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: (failureCount: number, error: any) => {
          // Retry network errors but not client errors
          if (error?.status >= 400 && error?.status < 500) return false
          return failureCount < 2
        },
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}