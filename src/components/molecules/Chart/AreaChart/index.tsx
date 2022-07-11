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
  areaLabel: string
  areaColor?: string
  data: Array<{
    name: string
    value: number
  }>
}

export const AreaChart = ({
  data,
  areaLabel,
  areaColor = '#48bb78',
}: Props) => {
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
        <Tooltip />
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
