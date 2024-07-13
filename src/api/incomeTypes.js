import axios from './axiosInstance.js'

export async function getIncomeTypes() {
  const data = await axios.get('/incomeTypes')

  return data.data
}
