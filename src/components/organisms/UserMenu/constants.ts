import { v4 as uuid } from 'uuid'
import { getDateMidnight } from '@/utils'

const getFormattedDate = () => {
  return getDateMidnight().toISOString()
}

export const CODE_EXAMPLE = `[
  {
    "id": "${uuid()}", // string | null
    "type": "outcome", // 'income' | 'outcome'
    "paymentMethod": "pix", // 'pix' | 'cash' | 'credit' | 'debit'
    "date": "${getFormattedDate()}",
    "datePayed": "${getFormattedDate()}",
    "category": "Categoria Exemplo",
    "description": "Exemplo",
    "amount": 15
  }
]
`

export const FORMATTED_CODE_EXAMPLE = `[
  {
    "id": null,
    "type": "outcome",
    "paymentMethod": "pix",
    "date": "${getFormattedDate()}",
    "datePayed": "${getFormattedDate()}",
    "category": "Categoria Exemplo",
    "description": "Exemplo",
    "amount": 15
  }
]
`
