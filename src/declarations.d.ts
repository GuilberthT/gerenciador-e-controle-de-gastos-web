declare module '@/api/income.js' {
    export function getTotalIncomes(month: number): Promise<{ total: number }>
  }
  
  declare module '@/api/report.js' {
    export function getTotalExpenses(month: number): Promise<{ total: number }>
  }
  
  declare module '@/components/ExpenseDialog.vue' {
    const component: any
    export default component
  }
  
  declare module '@/components/IncomeDialog.vue' {
    const component: any
    export default component
  }
  
  declare module '@/constants/months' {
    export const months: Array<{ label: string; value: number }>
  }