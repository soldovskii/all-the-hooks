const shared = {
  test: /\.js|jsx$/,
  exclude: /node_modules/,
}

export const server = (config = {}) => {
  return {
    ...shared,
    use: ["babel-loader"],
  }
}

export const browser = (config = {}) => {
  const { production } = config

  return {
    ...shared,
    use: ["babel-loader"],
  }
}
