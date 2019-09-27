import "regenerator-runtime/runtime"
import "isomorphic-fetch"
import "app/styles/app.styl"

import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { ReduxAsyncConnect } from "redux-connect"

import createStore from "flux/@createStore"
import routes from "app/routes"

const initialState = JSON.parse(decodeURIComponent(window.__INITIAL_STATE__))

createStore(initialState).then(({ store, persistor }) => {
  ReactDOM.hydrate(
    <Provider store={store} key="provider">
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ReduxAsyncConnect routes={routes} />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
    document.getElementById("app"),
  )
})
