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

export const browser = (config = {}) => {
  const { __DIR, production } = config

  const alias = {
    "app": path.join(__DIR, "app"),
    "client": path.join(__DIR, "client"),
    "flux": path.join(__DIR, "flux"),
    "helpers": path.join(__DIR, "helpers"),
  }

  if (!production) {
    alias["react-dom"] = "@hot-loader/react-dom"// FOR HOT RELOAD !!!
  }

  return {
    ...shared,
    modules: [__DIR, "node_modules"],
    alias,
  }
}

export const server = (config = {}) => {
  const { __DIR, production } = config

  const alias = {
    "app": path.join(__DIR, "app"),
    "client": path.join(__DIR, "client"),
    "flux": path.join(__DIR, "flux"),
    "helpers": path.join(__DIR, "helpers"),
    "build": path.join(__DIR, "build"),
    "server": path.join(__DIR, "server"),
  }

  if (production) {
    alias["react-dom"] = path.join(__DIR, "proj_modules/react-dom")
  }

  return {
    ...shared,
    modules: [__DIR, "node_modules"],
    alias,
  }
}
