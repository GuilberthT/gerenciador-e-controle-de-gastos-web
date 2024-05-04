import axios from '../axiosInstance.js'

export async function getExpenses() {
    const data = await axios.get('/expenses')
    
    return data.data
}

export async function createExpense(expense){
    const data = await axios.post('/expenses', expense)

    return data.data
}