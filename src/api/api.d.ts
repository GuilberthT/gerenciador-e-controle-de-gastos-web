declare module '@/api/expensesTypes' {
    export function getExpensesTypes(): Promise<any>;
  }
  
  declare module '@/api/expenses' {
    export function createExpense(expense: any): Promise<any>;
  }