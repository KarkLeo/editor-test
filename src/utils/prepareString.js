
/**
 * Add tags for string by config.
 * The config is array with tag information.
 * It is start and end index in the base string and a tag function.
 * A tag function return string with a tag: (str) => str
 * */
export const prepareString = (str, config) => {
  if (!config.length) return str

  const res = []

  res.push({
    value: str.slice(0, config[0].start),
    tag: null,
  })

  config.forEach((i, index, arr) => {
    res.push({
      value: str.slice(i.start, i.end),
      tag: i.tag
    })
    if (arr[index + 1]) {
      res.push({
        value: str.slice(i.end, arr[index + 1].start),
        tag: null
      })
    }
  })

  res.push({
    value: str.slice(config[config.length - 1].end, str.length),
    tag: null
  })

  return res.map(i => i.tag ? i.tag(i.value) : i.value).join('')
}