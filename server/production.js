import "regenerator-runtime/runtime"

import express from "express"
import useragent from "express-useragent"
import cookies from "cookies"
import helmet from "helmet"
import compression from "compression"

import {
  publicMiddleware,
  assetsMiddleware,
  httpsMiddleware,
} from "./utils/sharedMiddlewares"

import getPort from "./utils/getPort"
import startMessage from "./utils/startMessage"
import prerenderProduction from "server/prerender/production"

const app = express()

// security middleware
// https://github.com/helmetjs/helmet - read more
app.use(helmet())

// gzip all the things
app.use(compression())

// forced redirect to https
app.use(httpsMiddleware)

app.use(useragent.express())

app.use(cookies.express())

app.use("/", publicMiddleware)

app.use("/assets", assetsMiddleware)

app.use("/", (req, res) => prerenderProduction(req, res))

app.listen(getPort(), startMessage(getPort()))


