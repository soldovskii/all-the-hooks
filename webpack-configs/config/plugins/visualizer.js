import Visualizer from "webpack-visualizer-plugin"

export default ({entry = "browser"} = {}) => {
  return new Visualizer({filename: `./${entry}-stats.html`})
}
