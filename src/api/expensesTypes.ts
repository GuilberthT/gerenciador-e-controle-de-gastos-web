import axios from './axiosInstance.js'

interface ExpenseType {
  id: number
  name: string
}

export async function getExpensesTypes(): Promise<ExpenseType[]> {
  const response = await axios.get<{ data: ExpenseType[] }>('/expenseTypes')
  return response.data.data
}
