import "colors"
import path from "path"

const { ENV_PRESET = "development" } = process.env

export default function getEnvVariables(DIR) {
  const files = [
    path.join(DIR, `.env.${ENV_PRESET}`),
    path.join(DIR, ".env"),
  ]

  files.forEach(file => {
    require("dotenv").config({ path: file })
  })
}
