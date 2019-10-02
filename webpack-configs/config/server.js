import path from "path"
import webpack from "webpack"
import nodeExternals from "webpack-node-externals"

const moduleConcatenation = () => new webpack.optimize.ModuleConcatenationPlugin()
const namedModules = () => new webpack.NamedModulesPlugin()
const processEnv = () => new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production") } })

const config = {
  __DIR: path.resolve("./"),
}

export function serverConfig() {
  return {
    target: "node",
    mode: "production",
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
        },
      ],
    },
    plugins: [
      moduleConcatenation(),
      namedModules(),
      processEnv(),
    ],
    externals: [
      nodeExternals()
    ],
    optimization: {
      minimize: false,
    },
  }
}
