import axios from './axiosInstance'
import type { ExpenseType } from './expensesTypes'

export interface Expense {
  _id: string
  description: string
  value: number
  expenseType: ExpenseType | null
  date: string
  createdAt?: string
}

export interface CreateExpensePayload {
  description: string
  value: number
  expenseType: string
  date: string
}

export interface MonthTotal {
  total: number
}

export async function getExpenses(): Promise<Expense[]> {
  const response = await axios.get<Expense[]>('/expenses')
  return response.data
}

export async function createExpense(payload: CreateExpensePayload): Promise<Expense> {
  const response = await axios.post<Expense>('/expenses', payload)
  return response.data
}

export async function getTotalExpenses(month: number): Promise<MonthTotal> {
  const response = await axios.get<MonthTotal>(`/expenses/total/${month}`)
  return response.data
}

export async function deleteExpense(id: string): Promise<void> {
  await axios.delete(`/expenses/${id}`)
}
