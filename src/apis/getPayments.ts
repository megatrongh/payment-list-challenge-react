import axios from 'axios'
import { API_URL } from 'constants/index'
import { Payment } from 'types'

export interface PaymentResponse {
  payments: Payment[]
  total: number
  page: number
  pageSize: number
}

interface GetPaymentsParams {
  search?: string
  currency?: string
  page?: number
  pageSize?: number
}

export async function getPayments(params: GetPaymentsParams): Promise<PaymentResponse> {
  const { search, currency, page = 1, pageSize = 5 } = params
  const url = new URL(API_URL, window.location.origin)
  if (search) url.searchParams.set('search', search)
  if (currency) url.searchParams.set('currency', currency)
  url.searchParams.set('page', page.toString())
  url.searchParams.set('pageSize', pageSize.toString())

  const response = await axios.get<PaymentResponse>(url.toString(), {
    validateStatus: (status) => status < 500,
  })

  if (response.status === 404 || response.status === 401) {
    return { payments: [], total: 0, page: 1, pageSize }
  }

  return response.data
}
