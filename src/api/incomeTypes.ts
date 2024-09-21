import axios from './axiosInstance'

interface IncomeType {
  id: number
  name: string
}

export async function getIncomeTypes(): Promise<IncomeType[]> {
  const response = await axios.get<{ data: IncomeType[] }> ('/incomeTypes')
  return response.data.data
}
