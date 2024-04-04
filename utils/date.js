export function talkDate (date) {
  const intl = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' })
  return intl.format(date)
}

export function getTime (date) {
  const intl = new Intl.DateTimeFormat('id-ID', { timeStyle: 'short' })
  return intl.format(date)
}
