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
  const { DIR, production } = config

  const alias = {
    "app": path.join(DIR, "app"),
    "client": path.join(DIR, "client"),
    "flux": path.join(DIR, "flux"),
    "helpers": path.join(DIR, "helpers"),
  }

  if (!production) {
    alias["react-dom"] = "@hot-loader/react-dom"// FOR HOT RELOAD !!!
  }

  return {
    ...shared,
    modules: [DIR, "node_modules"],
    alias,
  }
}

export const server = (config = {}) => {
  const { DIR, production } = config

  const alias = {
    "app": path.join(DIR, "app"),
    "client": path.join(DIR, "client"),
    "flux": path.join(DIR, "flux"),
    "helpers": path.join(DIR, "helpers"),
    "build": path.join(DIR, "build"),
    "server": path.join(DIR, "server"),
  }

  return {
    ...shared,
    modules: [DIR, "node_modules"],
    alias,
  }
}
