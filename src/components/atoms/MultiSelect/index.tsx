import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useColorModeValue } from '@chakra-ui/react'
import { CreatableSelect } from 'chakra-react-select'
import { FormControl } from '@/components'

type Option = {
  label: string
  value: string
  colorScheme?: string
}

type Props = {
  options: Option[]
  name: string
  label?: string
  placeholder?: string
  required?: boolean
}

export const MultiSelect = ({
  name,
  label,
  placeholder,
  required,
  options,
}: Props) => {
  const { control } = useFormContext()
  const [createdOptions, setCreatedOptions] = useState<Option[]>([])
  const menuListBg = useColorModeValue('whitesmoke', 'gray.800')

  const allOptions = [...options, ...createdOptions]

  return (
    <FormControl label={label} name={name} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <CreatableSelect
            isMulti
            ref={ref}
            options={options}
            placeholder={placeholder}
            size={{ base: 'sm', sm: 'md' }}
            chakraStyles={{ menuList: (s) => ({ ...s, bg: menuListBg }) }}
            formatCreateLabel={(value) => `Adicionar "${value}"`}
            onChange={(values) => onChange(values.map((val) => val.value))}
            value={value?.map((val: string) =>
              allOptions.find((c) => c.value === val)
            )}
            onCreateOption={(option) => {
              const values = value || []
              onChange([...values, option])
              setCreatedOptions((oldState) => [
                ...oldState,
                { label: option, value: option },
              ])
            }}
          />
        )}
      />
    </FormControl>
  )
}
