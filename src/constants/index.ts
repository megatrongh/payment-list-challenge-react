export const API_URL = '/api/payments'

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'ZAR', 'JPY', 'CZK'] as const

export const STATUSES = ['completed', 'failed', 'pending', 'refunded'] as const

export const QUERY_KEYS = {
  PAYMENTS: 'payments',
}

export const MINUTE = 1000 * 60
export const DEFAULT_STALE_TIME = 5 * MINUTE
export const DEFAULT_GC_TIME = 10 * MINUTE
