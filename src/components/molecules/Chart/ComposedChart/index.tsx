import { useColorModeValue } from '@chakra-ui/react'
import {
  ComposedChart as RechartsComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  Bar,
} from 'recharts'
import { EmptyData } from '@/components'
import { masks } from '@/utils'

type Section = {
  dataKey?: string
  label: string
  color: string
}

type Data = any & {
  name: string
}

type Props = {
  type: 'bar' | 'area'
  isMonth?: boolean
  sections: Section[]
  data: Data[]
}

export const ComposedChart = ({ data, sections, type, isMonth }: Props) => {
  const tooltipBg = useColorModeValue('#f7fafc', '#2d3748')

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
            formatter={(data: number) => masks.valueToMoney(data)}
            labelFormatter={(name: string) =>
              `${isMonth ? 'Mês' : 'Dia'} ${name}`
            }
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
