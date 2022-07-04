const expensesToTransactions = (expenses, month, year = '2022') => {
  const transactions = expenses.map((item) => ({
    description: item.name,
    amount: item.price,
    date: new Date(`${year}-${month}-${item.date} 00:00:00`),
    type: 'outcome',
    category: '',
  }))
  return transactions
}
