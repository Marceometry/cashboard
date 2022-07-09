export const filterByText = (data: any[], columns: any[], text: string) => {
  if (!text) return data
  return data.filter((item) => {
    return !!columns.filter((column) =>
      String(item[column.field]).toLowerCase().includes(text.toLowerCase())
    ).length
  })
}
