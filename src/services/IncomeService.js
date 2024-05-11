import axios from './axiosInstance.js';

const IncomeService = {
  async getIncomes() {
    const response = await axios.get('/incomes');
    return response.data;
  },
  async createIncome(income) {
    const response = await axios.post('/incomes', income);
    return response.data;
  }
};

export default IncomeService;
