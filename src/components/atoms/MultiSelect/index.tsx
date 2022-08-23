import { CreatableSelect } from 'chakra-react-select'
import { Controller, useFormContext } from 'react-hook-form'
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

  return (
    <FormControl label={label} name={name} required={required}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <CreatableSelect
            isMulti
            ref={ref}
            options={options}
            placeholder={placeholder}
            onChange={(values) => onChange(values.map((val) => val.value))}
            value={value.map((val: string) =>
              options.find((c) => c.value === val)
            )}
            formatCreateLabel={(value) => `Adicionar "${value}"`}
            chakraStyles={{ container: () => ({ width: '100%' }) }}
          />
        )}
      />
    </FormControl>
  )
}
