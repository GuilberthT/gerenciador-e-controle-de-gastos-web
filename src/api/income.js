import axios from './axiosInstance.js'

export async function getIncomes() {
  const data = await axios.get('/incomes')
  return data.data
}

export async function createIncome(income) {
  const data = await axios.post('/incomes', income)
  return data.data
}

export async function getTotalIncomes(month) {
  const data = await axios.get(`/incomes/total/${month}`)
  return data.data
}
