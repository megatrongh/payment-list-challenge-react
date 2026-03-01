import { CURRENCIES, STATUSES } from './constants'

export type Currency = (typeof CURRENCIES)[number]
export type Status = (typeof STATUSES)[number]

export type PaymentID = `pay_${number}` | `pay_${number}_${number}` // e.g. "pay_400" | "pay_123_1"

export interface Payment {
  id: PaymentID
  customerName: string
  amount: number
  customerAddress: string
  currency: Currency
  status: Status
  date: string
  description: string
}
