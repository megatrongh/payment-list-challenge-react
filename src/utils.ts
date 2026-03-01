import { QueryClient, QueryClientConfig } from '@tanstack/react-query'

export function getQueryClient(config?: QueryClientConfig): QueryClient {
  return new QueryClient(config)
}
