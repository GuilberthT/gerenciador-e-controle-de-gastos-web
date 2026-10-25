import axios from './axiosInstance'
import type { MonthTotal } from './expenses'
import type { IncomeType } from './incomeTypes'

export interface Income {
  _id: string
  description: string
  value: number
  incomeType: IncomeType | null
  date: string
  createdAt?: string
}

export interface CreateIncomePayload {
  description: string
  value: number
  incomeType: string
  date: string
}

export async function getIncomes(): Promise<Income[]> {
  const response = await axios.get<Income[]>('/incomes')
  return response.data
}

export async function createIncome(payload: CreateIncomePayload): Promise<Income> {
  const response = await axios.post<Income>('/incomes', payload)
  return response.data
}

export async function getTotalIncomes(month: number): Promise<MonthTotal> {
  const response = await axios.get<MonthTotal>(`/incomes/total/${month}`)
  return response.data
}
