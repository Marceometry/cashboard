import * as z from 'zod'
import { DATE_INPUT_REGEX } from '@/utils'

export const zodValidator = {
  array: z.array(z.string()),
  string: z.string().trim(),
  required: z.string().trim().min(1, 'Esse campo é obrigatório'),
  date: z
    .string({ invalid_type_error: 'Data inválida' })
    .regex(DATE_INPUT_REGEX),
}
