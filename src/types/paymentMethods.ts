export enum PaymentMethods {
  pix = 'Pix',
  cash = 'Dinheiro',
  credit = 'Crédito',
  debit = 'Débito',
  other = 'Outro',
}

export const paymentMethods = Object.entries(PaymentMethods)

export type PaymentMethod = keyof typeof PaymentMethods

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
