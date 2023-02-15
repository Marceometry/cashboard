export type ChartType = {
  name: string
  value: number
}

export type DataModel = {
  outcome: number
  income: number
  name: string
  fraction: number
}

export type Response = {
  data: DataModel[]
  chartData: {
    name: string
    value: number
  }[]
}
