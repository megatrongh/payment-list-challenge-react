import { CURRENCIES } from 'constants/index'
import { format } from 'date-fns'
import { Currency } from 'types'

import { QueryClient, QueryClientConfig } from '@tanstack/react-query'

export function getQueryClient(config?: QueryClientConfig): QueryClient {
  return new QueryClient(config)
}
export const formattedDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy, HH:mm:ss')
}

export function sanitizeString(value: string): string {
  return value.trim().replace(/[<>{}]/g, '')
}

export function sanitizeCurrency(value: string): Currency | '' {
  return CURRENCIES.includes(value as Currency) ? (value as Currency) : ''
}
