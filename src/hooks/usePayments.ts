import { useSuspenseQuery } from '@tanstack/react-query'
import { getPayments, PaymentResponse } from 'apis/getPayments'
import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME, QUERY_KEYS } from 'constants/index'

interface UsePaymentsParams {
  search: string
  currency: string
  page: number
  pageSize: number
}

export function usePayments(params: UsePaymentsParams) {
  const { search, currency, page, pageSize } = params
  return useSuspenseQuery<PaymentResponse, Error>({
    queryKey: [QUERY_KEYS.PAYMENTS, { search, currency, page, pageSize }],
    queryFn: () => getPayments(params),
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  })
}
