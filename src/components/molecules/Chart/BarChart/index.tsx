import { masks } from '@/utils'
import { Text } from '@chakra-ui/react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from 'recharts'

type Props = {
  bars: Array<{
    dataKey: string
    label: string
    color: string
  }>
  data: Array<
    any & {
      name: string
    }
  >
}

export const BarChart = ({ data, bars }: Props) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <ComposedChart
        width={500}
        height={300}
        barSize={20}
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
          labelFormatter={(name: string) => `Dia ${name}`}
          formatter={(data: number) => masks.valueToMoney(data)}
          contentStyle={{ backgroundColor: '#2d3748' }}
        />
        <Legend />
        {bars.map((area) => (
          <Bar
            key={area.label}
            name={area.label}
            fill={area.color}
            dataKey={area.dataKey}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
