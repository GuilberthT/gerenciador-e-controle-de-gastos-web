import axios from './axiosInstance.js'

export async function getTotalExpenses(month: string): Promise<number> {
  const response = await axios.get<{ data:number}>(`/reports/totalExpenses?month=${month}`)
  return response.data.data
}