export default function(config) {
  return {
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    colors: true,
    errors: true,
    errorDetails: true,
    assets: false,
    builtAt: false,
    timings: false,
    version: false,
    hash: false,
    entrypoints: false,
    warnings: false,
  }
}
