import {prepareString} from "./prepareString";


/**
 * Tag functions
 */

const timeTag = (content) => `<span class="time">${content}</span>`
const projectTag = (content) => `<span class="project">${content}</span>`

/**
 * RegExp pattern for string processing
 */

const timePattern = /^([\d:]{1,5}) ?-? ?.*$/d
const projectPattern = /\s-\s([\w.@]+).*/d

/**
 * The main function that process the line string
 * */
export const patternReplacer = (str) => {

  const config = []

  const timeStr = timePattern.exec(str)
  if (timeStr && timeStr.indices && timeStr.indices[1]) {
    config.push({
      start: timeStr.indices[1][0],
      end: timeStr.indices[1][1],
      tag: timeTag
    })
  }

  const projectStr = projectPattern.exec(str)
  if (projectStr && projectStr.indices && projectStr.indices[1]) {
    config.push({
      start: projectStr.indices[1][0],
      end: projectStr.indices[1][1],
      tag: projectTag
    })
  }

  return prepareString(str, config)
}