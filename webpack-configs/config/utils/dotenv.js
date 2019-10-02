import "colors"
import path from "path"

const validAppEnvs = ["development", "staging", "production"]
const { PRESET_ENV = "development" } = process.env

if (!validAppEnvs.includes(PRESET_ENV)) {
  console.log(
    "The ENV_PRESET environment variable is invalid.".yellow,
    `One of${JSON.stringify(validAppEnvs)} required`.yellow,
    "\"development\" will be used as default".yellow,
  )
}

export default function getEnvVariables(DIR) {
  const dotenvFiles = [
    path.join(DIR, `.env.${PRESET_ENV}`),
    path.join(DIR, ".env"),
  ]

  dotenvFiles.forEach(dotenvFile => {
    require("dotenv").config({ path: dotenvFile })
  })
}
