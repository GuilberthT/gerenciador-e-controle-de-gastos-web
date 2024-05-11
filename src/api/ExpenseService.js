import axios from './axiosInstance.js';

const ExpenseService = {
  async getExpenses() {
    const response = await axios.get('/expenses');
    return response.data;
  },
  async createExpense(expense) {
    const response = await axios.post('/expenses', expense);
    return response.data;
  }
};

export default ExpenseService;
