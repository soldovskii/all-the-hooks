import snakeCase from "lodash/snakeCase"
import reduce from "lodash/reduce"

function globalizeName(name) {
  return snakeCase(name).toUpperCase()
}

function getValue(name, defaultValue) {
  const envValue = process.env[name]

  return typeof envValue === "undefined" ? defaultValue : envValue
}

function filterNumber(value) {
  if (/^([-+])?([0-9]+|Infinity)$/.test(value)) {
    return Number(value)
  }

  throw new Error("not a number")
}

function sanitizeValue(value) {
  if (typeof value === "boolean") {
    return value
  }

  if (value === "true") {
    return true
  }

  if (value === "false") {
    return false
  }

  try {
    return filterNumber(value)
  } catch (error) {
    return JSON.stringify(value)
  }
}

function getNameAndValue(defaultValue = null, name = "") {
  const globalizedName = globalizeName(name)
  const value = getValue(globalizedName, defaultValue)

  return [globalizedName, sanitizeValue(value)]
}

export default function composeGlobals(globals = {}) {
  return reduce(
    globals,
    (result, defaultValue, name) => {
      const [globalizedName, value] = getNameAndValue(defaultValue, name)

      result[globalizedName] = value

      return result
    },
    {},
  )
}
