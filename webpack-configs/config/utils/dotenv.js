import "colors"
import path from "path"

const validAppEnvs = ["development", "staging", "production"]
const { ENV_PRESET = "development" } = process.env

console.log(`CURRENT ENV_PRESET is "${ENV_PRESET}"`.green)

if (!validAppEnvs.includes(ENV_PRESET)) {
  console.log(
    "The ENV_PRESET environment variable is invalid.".yellow,
    `One of${JSON.stringify(validAppEnvs)} required`.yellow,
    "\"development\" will be used as default".yellow,
  )
}

export default function getEnvVariables(__DIR) {
  const dotenvFiles = [
    path.join(__DIR, `.env.${ENV_PRESET}`),
    path.join(__DIR, ".env"),
  ]

  dotenvFiles.forEach(dotenvFile => {
    require("dotenv").config({ path: dotenvFile })
  })
}
