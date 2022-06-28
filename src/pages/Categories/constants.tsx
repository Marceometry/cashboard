export const columns = [
  {
    label: 'Categoria',
    field: 'name',
  },
  {
    label: 'Custos',
    field: 'outcome',
    customRender: ({ outcome }: any) => `R$ ${outcome.toLocaleString()}`,
  },
  {
    label: 'Fração',
    field: 'fraction',
    customRender: ({ fraction }: any) => `${fraction}%`,
  },
]
