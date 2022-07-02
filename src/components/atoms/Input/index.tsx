import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'

type Props = {
  name: string
  state: any
  setState: React.Dispatch<React.SetStateAction<any>>
  label?: string
  type?: string
  helperText?: string
  required?: boolean
  showError?: boolean
}

export const Input = ({
  name,
  type,
  state,
  setState,
  label,
  helperText,
  required,
  showError,
}: Props) => {
  const [error, setError] = useState('')

  const handleError = useCallback(
    (value: string) => {
      if (required && !value) return 'Este campo é obrigatório'
      return ''
    },
    [required]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const hasError = handleError(value)
    setError(hasError)
    setState((oldState: any) => ({
      ...oldState,
      [name]: value,
    }))
  }

  return (
    <FormControl>
      {label ? (
        <FormLabel htmlFor={name}>
          {label}
          {required ? '*' : ''}
        </FormLabel>
      ) : (
        ''
      )}
      <ChakraInput
        id={name}
        type={type}
        required={required}
        value={state[name]}
        onChange={handleChange}
      />
      {helperText && !error ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        ''
      )}
      {showError && error ? <FormErrorMessage>{error}</FormErrorMessage> : ''}
    </FormControl>
  )
}
