import serialize from "serialize-javascript"
import {app, partials} from "server/templates"
import sprite from "svg-sprite-loader/runtime/sprite.build"

export function renderProdPage(html, store, sideEffects, statics, responsive) {
  const state = (store && store.getState()) || {}

  const initialState = encodeURIComponent(serialize(state, {isJSON: true}))

  const spriteContent = sprite.stringify()

  return app.render({
    html,
    initialState,
    statics,
    GLOBALS,
    spriteContent,
    ...sideEffects,
    ...responsive,
  }, partials)
}

export function renderDevPage(statics = {}, initialState = "{}", responsive) {
  return app.render({
    html: "",
    initialState,
    statics,
    GLOBALS,
    ...responsive,
  }, partials)
}
