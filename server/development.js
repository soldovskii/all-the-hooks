import "regenerator-runtime/runtime"

import express from "express"
import useragent from "express-useragent"
import cookies from "cookies"

import {publicMiddleware} from "./utils/sharedMiddlewares"
import {
  webpackDevMiddleware,
  webpackHotMiddleware,
} from "./utils/webpackMiddlewares"

import PORT from "./utils/PORT"
import startMessage from "./utils/startMessage"
import prerenderDevelopment from "server/prerender/development"

const app = express()

app.use("/", publicMiddleware)

app.use(webpackDevMiddleware)
app.use(webpackHotMiddleware)

app.use(useragent.express())

app.use(cookies.express())

app.use("/", (req, res) => prerenderDevelopment(req, res))

app.listen(PORT, startMessage("development", PORT))
