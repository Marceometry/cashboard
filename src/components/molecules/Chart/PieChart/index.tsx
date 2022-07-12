import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts'
import { CHART_COLORS } from '@/constants'
import { EmptyData } from '@/components'
import { CustomizedLabel } from './CustomizedLabel'

type Props = {
  data: Array<{ name: string; value: number }>
}

export const PieChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      {data.length ? (
        <RechartsPieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            label={CustomizedLabel}
            outerRadius={200}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      ) : (
        <EmptyData />
      )}
    </ResponsiveContainer>
  )
}
