import { Payment } from 'types'

export interface PaymentResponse {
  payments: Payment[]
  total: number
  page: number
  pageSize: number
}
