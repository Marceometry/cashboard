import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts'
import { COLORS } from './constants'
import { CustomizedLabel } from './CustomizedLabel'

type Props = {
  data: Array<{ name: string; value: number }>
}

export const PieChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RechartsPieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={CustomizedLabel}
          outerRadius={150}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
