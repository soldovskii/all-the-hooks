import path from "path"

import { server as serverEntry } from "./utils/entry"
import { server as serverResolve } from "./utils/resolve"
import { server as serverOutput } from "./utils/output"
import { server as serverExternals } from "./utils/externals"

import { server as serverBabelLoader } from "./loaders/babel"

import { moduleConcatenation, namedModules } from "./plugins/webpack"

const config = {
  __DIR: path.resolve("./"),
}


// process.traceDeprecation = true

export function serverConfig(options) {
  const { production = false } = options
  const props = { ...config, ...options }

  return {
    target: "node",
    mode: production ? "production" : "development",
    context: config.__DIR,
    entry: serverEntry(props),
    resolve: serverResolve(props),
    output: serverOutput(props),
    externals: serverExternals(),
    module: {
      rules: [
        serverBabelLoader(props),
      ],
    },
    plugins: [
      moduleConcatenation(props),
      namedModules(props),
    ].filter(Boolean),
    optimization: {
      minimize: false
    }
  }
}
