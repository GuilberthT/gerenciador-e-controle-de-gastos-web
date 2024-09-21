import axios from './axiosInstance'

interface ExpenseType {
  id: number
  name: string
}

export async function getExpensesTypes(): Promise<ExpenseType[]> {
  const response = await axios.get<{ data: ExpenseType[] }>('/expenseTypes')
  return response.data.data
}
