export type PaymentMethodModel = {
  name: string
  income: number
  outcome: number
  balance: number
}

export type PaymentMethodsFilterModel = {
  month: number
  year: number
  maxAmount: number
  minAmount: number
}
