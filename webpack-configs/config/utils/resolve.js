import path from "path"

const shared = {
  extensions: [".js", ".jsx"],

  mainFiles: [
    "index.connector.js",
    "index.connector.jsx",
    "index.js",
    "index.jsx",
  ],
}

export const server = (config = {}) => {
  const { __DIR, production } = config

  const alias = {
    "server": path.join(__DIR, "server"),
  }

  return {
    ...shared,
    modules: [__DIR, "node_modules"],
    alias,
  }
}
