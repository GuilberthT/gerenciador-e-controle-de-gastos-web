import axios from './axiosInstance.js'

export async function getExpenses() {
  try {
    const data = await axios.get('/expenses')
    
    return data.data
  } catch (error) {
    console.log(error) 
    return error
  }
}

export async function createExpense(expense) {
  const data = await axios.post('/expenses', expense)
  return data.data
}
