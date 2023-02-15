import { useColorModeValue } from '@chakra-ui/react'
import {
  Area,
  Bar,
  CartesianGrid,
  Legend,
  ComposedChart as RechartsComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { EmptyData } from '@/components'
import { currency } from '@/utils'

export type LabelType = 'month' | 'year' | 'day'

type Section = {
  dataKey?: string
  label: string
  color: string
}

type Data = any & {
  name: string
}

type Props = {
  type?: 'bar' | 'area'
  labelType?: LabelType
  sections: Section[]
  data: Data[]
}

export const ComposedChart = ({
  data,
  sections,
  labelType,
  type = 'area',
}: Props) => {
  const tooltipBg = useColorModeValue('#f7fafc', '#2d3748')

  const getLabel = () => {
    let label = ''
    switch (labelType) {
      case 'month':
        label = 'Mês '
        break
      case 'year':
        label = 'Ano '
        break
      case 'day':
        label = 'Dia '
        break
    }
    return label
  }

  return (
    <ResponsiveContainer width='100%' height='100%'>
      {data.length ? (
        <RechartsComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='1 1' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: tooltipBg }}
            formatter={(data: number) => currency.valueToMoney(data)}
            labelFormatter={(name: string) => `${getLabel()}${name}`}
          />
          <Legend />
          {sections.map((section) =>
            type === 'bar' ? (
              <Bar
                key={section.label}
                name={section.label}
                fill={section.color}
                dataKey={section.dataKey || 'value'}
              />
            ) : (
              <Area
                type='monotone'
                key={section.label}
                name={section.label}
                fill={section.color}
                stroke={section.color}
                dataKey={section.dataKey || 'value'}
              />
            )
          )}
        </RechartsComposedChart>
      ) : (
        <EmptyData />
      )}
    </ResponsiveContainer>
  )
}
