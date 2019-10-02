import WebpackBar from "webpackbar"


export default (config = {}) => {
  const { entry } = config

  return new WebpackBar({ name: entry, profile: true })
}
