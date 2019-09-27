export const server = (config = {}) => {
  const { production } = config

  if (production) {
    return {
      server: "./server/production.js",
    }
  } else {
    return {
      server: "./server/development.js",
    }
  }
}

export const browser = (config = {}) => {
  const { production } = config

  if (production) {
    return {
      "app": [
        "./app/index.jsx",
      ],
    }
  } else {
    return {
      "app": [
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?overlay=true",
        "./app/index.jsx",
      ],
    }
  }
}
