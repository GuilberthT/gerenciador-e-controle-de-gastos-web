import axios from './axiosInstance.js'

interface Expense {
  id?: number
  description: string
  amount: number
  category: string
  date: string
}

export async function getExpenses(): Promise<Expense[] | Error> {
  try {
    const response = await axios.get<{ data: Expense[] }>('/expenses')
    return response.data.data
  }
  catch (error) {
    return error as Error
  }
}

export async function createExpense(expense: Expense): Promise<Expense | Error> {
  try {
    const response = await axios.post<{ data: Expense }>('/expenses', expense)
    return response.data.data
  }
  catch (error) {
    return error as Error
  }
}
