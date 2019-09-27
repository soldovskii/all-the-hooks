export default (config = {}) => {
  // const {production} = config

  return {
    test: /\.svg$/,
    use: [
      {
        loader: "svg-sprite-loader",
        // options: { ... }
      },
      {
        loader: "svgo-loader",
        options: {
          plugins: [
            { removeTitle: true },
            { convertPathData: false },
            { convertColors: { shorthex: false } },
            { removeAttrs: { attrs: ["fill", "stroke"] } },
          ],
        },
      },
    ],
  }
}
