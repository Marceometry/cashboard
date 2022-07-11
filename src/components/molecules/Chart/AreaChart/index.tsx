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
  data: Array<{
    name: string
    value: number
  }>
  areaLabel: string
  areaColor?: string
  isMonth?: boolean
}

export const AreaChart = ({ data, areaLabel, areaColor, isMonth }: Props) => {
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
        <Area
          type='monotone'
          dataKey='value'
          name={areaLabel}
          fill={areaColor}
          stroke={areaColor}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
