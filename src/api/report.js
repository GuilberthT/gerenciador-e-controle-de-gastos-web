import axios from './axiosInstance.js'

export async function getTotalExpenses(month) {
  const data = await axios.get(`/reports/totalExpenses?month=${month}`)

  return data.data
}
