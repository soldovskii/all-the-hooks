import path from "path"
import webpack from "webpack"

import { server as serverExternals } from "./utils/externals"

export const moduleConcatenation = () => new webpack.optimize.ModuleConcatenationPlugin()
export const namedModules = () => new webpack.NamedModulesPlugin()

const config = {
  __DIR: path.resolve("./"),
}


export function serverConfig(options) {
  const { production = false } = options
  const props = { ...config, ...options }

  return {
    target: "node",
    mode: production ? "production" : "development",
    context: config.__DIR,
    entry: {
      server: "./server/production.js",
    },
    output: {
      path: path.join(config.__DIR, "build"),
      filename: "[name].js",
      library: "server",
      libraryTarget: "commonjs2",
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        }
      ],
    },
    plugins: [
      moduleConcatenation(props),
      namedModules(props),
    ],
    externals: serverExternals(),
    optimization: {
      minimize: false
    }
  }
}
