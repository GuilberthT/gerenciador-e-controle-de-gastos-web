import axios from './axiosInstance.js'

export async function getExpensesTypes() {
  const data = await axios.get('/expenseTypes')

  return data.data
}
