import nodeExternals from "webpack-node-externals"

export function server() {
  return [nodeExternals()]
}
