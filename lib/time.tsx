export function parseAsDate(time: string): number {
  if (/^\d{4}-\d{2}$/.test(time)) return Date.parse(`${time}-01`)
  if (/^\d{4}-\d{2}-\d{2}$/.test(time)) return Date.parse(time)
  return -1
}

export function renderDuration(
  beginning_time: string,
  ending_time: string | null
): string {
  if (ending_time === null) return `${renderTime(beginning_time)} ～`
  if (beginning_time === ending_time)
    return renderTime(beginning_time)
  return `${renderTime(beginning_time)} ～ ${renderTime(
    ending_time
  )} `
}

export function renderTime(time: string): string {
  let res
  res = /^(\d{4})$/.exec(time)
  if (res !== null) return `${parseInt(res[1])} 年`
  res = /^(\d{4})-(\d{2})$/.exec(time)
  if (res !== null)
    return `${parseInt(res[1])} 年 ${parseInt(res[2])} 月`
  res = /^(\d{4})-(\d{2})-(\d{2})$/.exec(time)
  if (res !== null)
    return `${parseInt(res[1])} 年 ${parseInt(res[2])} 月 ${parseInt(
      res[3]
    )} 日`
}
