import { masks } from '@/utils'
import { useColorModeValue } from '@chakra-ui/react'
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from 'recharts'

type Props = {
  areas: Array<{
    dataKey?: string
    label: string
    color: string
  }>
  data: Array<
    any & {
      name: string
    }
  >
  isMonth?: boolean
}

export const AreaChart = ({ data, areas, isMonth }: Props) => {
  const tooltipBg = useColorModeValue('#f7fafc', '#2d3748')

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ComposedChart
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
          labelFormatter={(name: string) =>
            `${isMonth ? 'Mês' : 'Dia'} ${name}`
          }
          formatter={(data: number) => masks.valueToMoney(data)}
          contentStyle={{ backgroundColor: tooltipBg }}
        />
        <Legend />
        {areas.map((area) => (
          <Area
            type='monotone'
            key={area.label}
            name={area.label}
            fill={area.color}
            stroke={area.color}
            dataKey={area.dataKey || 'value'}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
