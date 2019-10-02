import path from "path"
import git from "git-rev-sync"
import webpack from "webpack"

import snakeCase from "lodash/snakeCase"
import reduce from "lodash/reduce"

function getEnvName(name) {
  return snakeCase(name).toUpperCase()
}

function getEnvValue(name, defaultValue) {
  const envValue = process.env[name]

  return typeof envValue === "undefined" ? defaultValue : envValue
}

function tryToNumber(value) {
  const number = Number(value)

  if (isNaN(number)) {
    throw new Error("not a number")
  } else {
    return number
  }
}

function sanitizeValue(value) {
  if (typeof value === "boolean") {
    return value
  }

  if (value === null) {
    return null
  }

  if (value === "true") {
    return true
  }

  if (value === "false") {
    return false
  }

  try {
    return tryToNumber(value)
  } catch (error) {
    return JSON.stringify(value)
  }
}

function getNameAndValue(defaultValue = null, name = "") {
  const globalizedName = getEnvName(name)
  const value = getEnvValue(globalizedName, defaultValue)

  return [globalizedName, sanitizeValue(value)]
}

function composeGlobals(globals = {}) {
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

const extractNodeEnv = () => {
  return JSON.stringify(process.env.NODE_ENV || "development")
}

const extractGitCommit = () => {
  try {
    return git.long()
  } catch (e) {
    return process.env.SOURCE_VERSION || "impossible to set GIT_COMMIT"
  }
}

const globalsTemplate = {
  GIT_COMMIT: extractGitCommit(),
  BACKEND_URL: null,
  BASE_URL: null,
  PORT: null,
  USE_HTTP_AUTH: false,
  USE_HTTP_SSL: null,
  PRESET_ENV: "development",
  NODE_ENV: null,
}

export default (config = {}) => {
  const { DIR } = config

  const composedGlobals = {
    __dirname: JSON.stringify(DIR),
    __filename: JSON.stringify(path.join(DIR, "index.js")),
    "process.env.NODE_ENV": extractNodeEnv(),
    "NODE_ENV": extractNodeEnv(),
    GLOBALS: composeGlobals(globalsTemplate),
  }

  return new webpack.DefinePlugin(composedGlobals)
}
