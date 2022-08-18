import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'

export const CODE_EXAMPLE = `[
  {
    "id": "${uuid()}", // string | null
    "type": "outcome", // 'income' | 'outcome'
    "date": "${new Date(`${format(new Date(), 'yyyy-MM-dd')} 00:00:00`).toISOString()}",
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
    "date": "${new Date(`${format(new Date(), 'yyyy-MM-dd')} 00:00:00`).toISOString()}",
    "category": "Categoria Exemplo",
    "description": "Exemplo",
    "amount": 15
  }
]
`
