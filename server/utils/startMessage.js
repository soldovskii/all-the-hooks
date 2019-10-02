import "colors"
import padEnd from "lodash/padEnd"

const formatMessage = (port, globals) =>
  `App listening on http://localhost:${port} in `.green +
  `${process.env.NODE_ENV} `.red +
  "mode with GLOBALS:".green +
  `
╔${padEnd("", 22, "═")}╦${padEnd("", 44, "═")}╗
${globals}
╚${padEnd("", 22, "═")}╩${padEnd("", 44, "═")}╝
`.green

export default function startMessage(port) {
  const globals = Object.keys(GLOBALS).map(k => `║ ${padEnd(k, 20)} ║ ${padEnd(GLOBALS[k], 42)} ║`).join(" \n")
  const message = formatMessage(port, globals)

  return error => {
    if (error) {
      errorMessage(port, error)
    }

    setTimeout(() => console.log(message), 1000)
  }
}

export const errorMessage = (type = "development", port = 8080, error) => {
  console.error(`${type} server failed to start on ${port}: ${error}`)
}
