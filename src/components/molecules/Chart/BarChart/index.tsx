import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  barLabel: string
  barColor?: string
  data: Array<{
    name: string
    value: number
  }>
}

export const BarChart = ({ data, barLabel, barColor = '#48bb78' }: Props) => {
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
        <Tooltip />
        <Legend />
        <Bar name={barLabel} dataKey='value' fill={barColor} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
