// Formata um número como dinheiro: 1500 -> "R$ 1.500,00"
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Converte a data que vem da API em um Date.
// Registros antigos guardam "DD/MM/AAAA", que o JavaScript leria no padrão
// americano (mês/dia). Por isso tratamos esse formato separadamente.
export function parseApiDate(value: string): Date | null {
  const brazilian = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)

  const date = brazilian
    ? new Date(Date.UTC(Number(brazilian[3]), Number(brazilian[2]) - 1, Number(brazilian[1])))
    : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date
}

// Formata a data da API como "DD/MM/AAAA".
// As datas são lidas em UTC: no fuso de Cuiabá (UTC-4), 25/10 viraria 24/10.
export function formatDate(value: string): string {
  const date = parseApiDate(value)

  if (!date) {
    return value
  }

  const [year, month, day] = date.toISOString().slice(0, 10).split('-')
  return `${day}/${month}/${year}`
}
