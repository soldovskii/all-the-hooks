import "isomorphic-fetch"
import Cookies from "cookies"
import React from "react"
import ReactDomServer from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { ReduxAsyncConnect, loadOnServer } from "redux-connect"
import { NodeCookiesWrapper } from "redux-persist-cookie-storage"
import getResponsiveInfo from "./utils/getResponsiveInfo"
import getLegacyInfo from "./utils/getLegacyInfo"
import getSideEffects from "./utils/getSideEffects"
import { production as getStatics } from "./utils/getStatics"
import { renderProdPage } from "./utils/getRenderPage"

import createStore from "flux/@createStore"
import routes from "app/routes"
import { parse as parseUrl } from "url"

export default function prerenderProduction(req, res) {
  const cookieJar = new NodeCookiesWrapper(new Cookies(req, res))
  const { useragent = {} } = req
  //
  const responsive = getResponsiveInfo(useragent)
  const isLegacy = getLegacyInfo(useragent)
  const statics = getStatics({ isLegacy })
  //
  const url = req.originalUrl || req.url
  const location = parseUrl(url)

  // if (GLOBALS.USE_HTTP_BASIC_AUTH) {
  //   if (!checkAuth(req)) {
  //     res.setHeader(...authHeader)
  //     res.status(401).send('')
  //     return
  //   }
  // }

  // 1. load data
  createStore({ responsive }, cookieJar)
    .then(({ store }) => {
      loadOnServer({ store, location, routes })
        .then(() => {
          const context = {}

          const appHTML = ReactDomServer.renderToString(
            <Provider store={store} key="provider">
              <StaticRouter location={location} context={context}>
                <ReduxAsyncConnect routes={routes} />
              </StaticRouter>
            </Provider>,
          )

          // handle redirects
          if (context.url) {
            res.set("Location", context.url)
            return res.sendStatus(302)
          }

          const { status, sideEffects } = getSideEffects()

          // 3. render the Redux initial data into the server markup
          const html = renderProdPage(
            appHTML,
            store,
            sideEffects,
            statics,
            responsive,
          )

          res.status(status).send(html)
        })
        .catch(e => {
          console.log("loadOnServerError", e)
        })
    })
    .catch(e => console.log("createStoreError", e))
}
