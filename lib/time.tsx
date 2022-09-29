export function parseAsDate(str: string): number {
  if (/^\d{4}-\d{2}$/.test(str)) return Date.parse(`${str}-01`)
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return Date.parse(str)
  return -1
}
