import path from "path"
import git from "git-rev-sync"
import webpack from "webpack"
import composeGlobals from "./globalsCompose"

export const extractNodeEnv = () => {
  return JSON.stringify(process.env.NODE_ENV || "development")
}

const extractGitCommit = () => {
  try {
    return git.long()
  } catch (e) {
    return process.env.SOURCE_VERSION || "impossible to set GIT_COMMIT"
  }
}

export const globalsTemplate = {
  GIT_COMMIT: extractGitCommit(),
  USE_HTTP_BASIC_AUTH: false,
  BACKEND_URL: null,
  BASE_URL: null,
  PORT: null,
  USE_SSL: null,
  ENV_PRESET: "development",
  NODE_ENV: null,
}

export default (config = {}) => {
  const { __DIR } = config

  const composedGlobals = {
    __dirname: JSON.stringify(__DIR),
    __filename: JSON.stringify(path.join(__DIR, "index.js")),
    "process.env.NODE_ENV": extractNodeEnv(),
    "NODE_ENV": extractNodeEnv(),
    GLOBALS: composeGlobals(globalsTemplate),
  }

  return new webpack.DefinePlugin(composedGlobals)
}
