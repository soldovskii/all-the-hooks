import ProgressBarPlugin from "progress-bar-webpack-plugin"
import "colors"

export default (config = {}) => {
  const {entry} = config

  return new ProgressBarPlugin({
    format: `${entry.green} ${"[:bar][:percent]".yellow} ${":elapsed seconds".green}`,
    clear: false,
  })
}
