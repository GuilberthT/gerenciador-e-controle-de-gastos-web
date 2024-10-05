import axios from './axiosInstance'

export interface IncomeType {
  _id: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export async function getIncomeTypes(): Promise<IncomeType[]> {
  const response = await axios.get<IncomeType[]> ('/incomeTypes')

  return response.data
}
