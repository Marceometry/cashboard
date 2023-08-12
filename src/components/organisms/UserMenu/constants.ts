import { v4 as uuid } from 'uuid'
import { getDateMidnight } from '@/utils'

const getFormattedDate = () => {
  return getDateMidnight().toISOString()
}

export const CODE_EXAMPLE = `{
  "transactions": [
    {
      "id": "${uuid()}", // string | null
      "type": "outcome", // 'income' | 'outcome'
      "paymentMethod": "pix", // 'pix' | 'cash' | 'credit' | 'debit'
      "amount": 500, // valor em centavos
      "date": "${getFormattedDate()}",
      "datePayed": "${getFormattedDate()}",
      "category": "Comida",
      "description": "Coxinha"
    }
  ],
  "recurrences": [
    {
      "id": "${uuid()}",
      "type": "outcome",
      "paymentMethod": "credit",
      "amount": 3599,
      "installments": 10, // number | null
      "startDate": "${getFormattedDate()}",
      "category": "Estudo",
      "description": "Cursinho",
      "isActive": true,
      "transactions": [
        {
          "date": "${getFormattedDate()}",
          "id": "${uuid()}" // string | ""
        }
      ]
    },
  ]
}
`

export const FORMATTED_CODE_EXAMPLE = `{
  "transactions": [
    {
      "id": null,
      "type": "outcome",
      "paymentMethod": "pix",
      "amount": 500,
      "date": "${getFormattedDate()}",
      "datePayed": "${getFormattedDate()}",
      "category": "Comida",
      "description": "Coxinha"
    }
  ],
  "recurrences": [
    {
      "id": "${uuid()}",
      "type": "outcome",
      "paymentMethod": "credit",
      "amount": 3599,
      "startDate": "${getFormattedDate()}",
      "category": "Estudo",
      "description": "Cursinho",
      "installments": 10,
      "isActive": true,
      "transactions": [
        {
          "date": "${getFormattedDate()}",
          "id": "${uuid()}"
        }
      ]
    },
  ]
}
`
