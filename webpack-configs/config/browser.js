import path from "path"
import dotenv from "./utils/dotenv"
import stats from "./utils/stats"
import { browser as browserResolve } from "./utils/resolve"
import { browser as browserOutput } from "./utils/output"
import { browser as browserEntry } from "./utils/entry"

// loaders
import mustacheLoader from "./loaders/mustache"
import staticsLoader from "./loaders/statics"
import svgLoader from "./loaders/svg"
import { browser as browserBabelLoader } from "./loaders/babel"
import { browser as browserCssLoader } from "./loaders/css"

// plugins
import globals from "./plugins/globals"
import extractCss from "./plugins/extractCss"
import statsPlugin from "./plugins/stats"
import progress from "./plugins/progress"
import compression from "./plugins/compression"
import optimization from "./plugins/optimization"
import { moduleConcatenation, hmr, namedModules } from "./plugins/webpack"

const config = {
  DIR: path.resolve("./"),
}

dotenv(config.DIR)

// process.traceDeprecation = true

export function browserConfig(options) {
  const { production = false } = options
  const props = { ...config, ...options }

  return {
    mode: production ? "production" : "development",
    context: config.DIR,
    entry: browserEntry(props),
    resolve: browserResolve(props),
    output: browserOutput(props),
    devtool: production ? false : "eval",
    stats: stats(),
    module: {
      rules: [
        browserBabelLoader(props),
        browserCssLoader(props),
        mustacheLoader(props),
        staticsLoader(props),
        svgLoader(props),
      ],
    },
    plugins: [
      globals(props),
      moduleConcatenation(props),
      namedModules(props),
      statsPlugin(props),
      progress({ entry: "browser" }),
      production ? null : hmr(),
      production ? extractCss(props) : null,
      production ? compression(props) : null,
    ].filter(Boolean),
    optimization: optimization(props),
  }
}
