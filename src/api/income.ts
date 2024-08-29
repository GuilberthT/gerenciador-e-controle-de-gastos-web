import axios from './axiosInstance.js'

interface Income {
  id?: number;
  description: String;
  amount: Number;
  date: String;
  category: String;
}

export async function getIncomes(): Promise<Income[]> {
  const response = await axios.get<{ data: Income[] }>('/incomes')
  return response.data.data
}