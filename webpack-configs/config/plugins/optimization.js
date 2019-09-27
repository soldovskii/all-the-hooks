import UglifyJsPlugin from "uglifyjs-webpack-plugin"

const reactToolsList = ["react-tooltip"]

const isNodeModules = mod => mod.context.includes("node_modules")
const isReactTools = mod => reactToolsList.some(str => mod.context.includes(str))

const isVendor = mod => isNodeModules(mod) && !isReactTools(mod)
const isReactTooltip = mod => mod.context.includes("react-tooltip")

const shared = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: isVendor,
        chunks: "all",
        name: "vendor",
      },
      reactTooltip: {
        test: isReactTooltip,
        name: "reactTooltip",
        chunks: "all",
      }
    },
  },
}

export default (config = {}) => {
  const { production } = config

  if (production) {
    return {
      ...shared,
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          sourceMap: true,
          extractComments: false,
        }),
      ],
    }
  } else {
    return {
      ...shared,
    }
  }
}
