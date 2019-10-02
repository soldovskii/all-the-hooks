import path from "path"
import dotenv from "./utils/dotenv"
import stats from "./utils/stats"
import { server as serverEntry } from "./utils/entry"
import { server as serverResolve } from "./utils/resolve"
import { server as serverOutput } from "./utils/output"
import { server as serverExternals } from "./utils/externals"

// loaders
import mustacheLoader from "./loaders/mustache"
import staticsLoader from "./loaders/statics"
import svgLoader from "./loaders/svg"
import { server as serverBabelLoader } from "./loaders/babel"
import { server as serverCssLoader } from "./loaders/css"

// plugins
import globals from "./plugins/define"
import progress from "./plugins/progress"
import { moduleConcatenation, namedModules } from "./plugins/webpack"

const config = {
  DIR: path.resolve("./"),
}

dotenv(config.DIR)

// process.traceDeprecation = true

export function serverConfig(options) {
  const { production = false } = options
  const props = { ...config, ...options }

  return {
    target: "node",
    mode: production ? "production" : "development",
    context: config.DIR,
    entry: serverEntry(props),
    resolve: serverResolve(props),
    output: serverOutput(props),
    externals: serverExternals(),
    stats: stats(),
    module: {
      rules: [
        serverBabelLoader(props),
        serverCssLoader(props),
        mustacheLoader(props),
        staticsLoader(props),
        svgLoader(props),
      ],
    },
    plugins: [
      globals(props),
      moduleConcatenation(props),
      namedModules(props),
      progress({ entry: "server" }),
    ].filter(Boolean),
    optimization: {
      minimize: false
    }
  }
}
