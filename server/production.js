import "regenerator-runtime/runtime"

import express from "express"
import React from "react"
import ReactDomServer from "react-dom/server"

const ThemeContext = React.createContext("light")
const Span = () => {
  return (
    <ThemeContext.Provider value="dark">
      <ThemeContext.Consumer>
        {theme => <span>{theme}</span>}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  )
}


const app = express()
app.use("/", (req, res) => {
  const appHTML = ReactDomServer.renderToString(<Span />)

  console.log(appHTML)

  res.send(appHTML)
})

app.listen(8080, () => console.log("running on http://localhost:8080")
)


