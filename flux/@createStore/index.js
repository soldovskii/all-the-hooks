import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux"

import {
  persistStore,
  persistReducer,
  getStoredState,
} from "redux-persist"

import CookiesJS from "cookies-js"
import { CookieStorage } from "redux-persist-cookie-storage"
import { reducer as reduxAsyncConnect } from "redux-connect"

import thunk from "redux-thunk"

import devToolsExtension from "./utils/devToolsExtension"

import isServer from "helpers/isServer"
import isClient from "helpers/isClient"

import reducers from "flux/reducers"

export default async function create(initialState, cookies) {
  const combinedReducers = combineReducers({
    ...reducers,
    reduxAsyncConnect,
  })

  const middleware = applyMiddleware(thunk)

  const enhances = GLOBALS.PRESET_ENV === "development"
    ? compose(middleware, devToolsExtension())
    : compose(middleware)

  if (isServer) {
    const persistConfig = {
      key: "root",
      whitelist: ["account"],
      storage: new CookieStorage(cookies),
    }

    let preloadedState
    try {preloadedState = await getStoredState(persistConfig)} catch (e) {preloadedState = {}}
    const { account } = preloadedState || {}

    if (account) {
      initialState = { ...initialState, account }
    }

    const store = createStore(combinedReducers, initialState, enhances)
    return { store }
  }

  if (isClient) {
    CookiesJS.defaults.secure = GLOBALS.USE_HTTP_SSL

    const persistConfig = {
      key: "root",
      whitelist: ["account"],
      storage: new CookieStorage(CookiesJS),
    }

    const persistedReducer = persistReducer(persistConfig, combinedReducers)
    const store = createStore(persistedReducer, initialState, enhances)
    const persistor = persistStore(store, {})

    return { store, persistor }
  }
}
