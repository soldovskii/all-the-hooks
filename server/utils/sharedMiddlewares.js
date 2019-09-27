import path from "path"
import express from "express"
import expressStaticGzip from "express-static-gzip"

export const publicMiddleware = express.static(
  path.join("server/public"),
)

export const assetsMiddleware = expressStaticGzip("build")

export const httpsMiddleware = (req, res, next) => {
  if (req.header("x-forwarded-proto") === "http") {
    res.redirect(301, `https://${req.get("host")}${req.url}`)
  } else {
    next()
  }
}
