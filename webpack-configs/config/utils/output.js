import path from "path"

export function server(config = {}) {
  const { __DIR, production } = config

  return {
    path: path.join(__DIR, "build"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    sourceMapFilename: "[file].map",
    publicPath: "/assets/",
    library: "server",
    libraryTarget: "commonjs2",
  }
}

export function browser(config) {
  const { __DIR, production } = config

  if (production) {
    return {
      path: path.join(__DIR, "build"),
      filename: "[name]@[chunkhash:12].js",
      chunkFilename: "[name]@[chunkhash:12].js",
      sourceMapFilename: "[file].map",
      publicPath: "/assets/",
    }
  } else {
    return {
      path: path.join(__DIR, "build"),
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/assets/",
    }
  }
}
