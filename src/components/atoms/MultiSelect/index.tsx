import { CreatableSelect } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { FormControl } from '@/components'
import { useState } from 'react'

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
            formatCreateLabel={(value) => `Adicionar "${value}"`}
            chakraStyles={{ container: () => ({ width: '100%' }) }}
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
