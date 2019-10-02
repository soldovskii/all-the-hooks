import webpack from "webpack"

export const moduleConcatenation = () => new webpack.optimize.ModuleConcatenationPlugin()

export const namedModules = () => new webpack.NamedModulesPlugin()

export const hmr = () => new webpack.HotModuleReplacementPlugin()

