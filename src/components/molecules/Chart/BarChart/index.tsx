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
        <Tooltip />
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
