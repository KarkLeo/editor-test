const addZeroToNumber = (str) => ('0' + str).slice(-2)

export const getTimeStr = () => {
  const date = new Date()

  /** Rounded to *5 minute */
  const partMin = date.getMinutes() % 5
  if(partMin > 0)
    date.setMinutes(date.getMinutes() + 5 - partMin)

  return addZeroToNumber(date.getHours()) + ':' + addZeroToNumber(date.getMinutes())
}