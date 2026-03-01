import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

export const DEFAULT_PARAMS = {
  search: '',
  currency: '',
  page: 1,
  pageSize: 5,
}

export function usePaymentParams() {
  return useQueryStates({
    search: parseAsString.withDefault(DEFAULT_PARAMS.search),
    currency: parseAsString.withDefault(DEFAULT_PARAMS.currency),
    page: parseAsInteger.withDefault(DEFAULT_PARAMS.page),
    pageSize: parseAsInteger.withDefault(DEFAULT_PARAMS.pageSize),
  })
}

export type PaymentParams = ReturnType<typeof usePaymentParams>[0]
export type SetPaymentParams = ReturnType<typeof usePaymentParams>[1]
