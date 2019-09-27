import { useStore } from "react-redux"

import {
  getFullUrl,
  prepareBody,
  prepareHeaders,
  prepareUrl,
  finishUrl,
  appendHeader,
  handleErrors,
  toJson,
} from "./utils"

export default function(props = {}) {
  const {
    url,
    fullUrl = false,
    params,
    body,
    mode = "cors",
    method = "GET",
    headers = {},
    noHeaders = false,
    contentType = "application/json",
  } = props

  const {
    getState = () => {},
    dispatch = () => {},
  } = useStore()

  const state = getState()

  const options = {
    method,
    mode,
    body: prepareBody(body, method),
    headers: prepareHeaders(headers, method, contentType, noHeaders),
  }

  let totalUrl
  totalUrl = getFullUrl({ url, fullUrl })
  totalUrl = prepareUrl(totalUrl, method, params)
  totalUrl = finishUrl(totalUrl)

  const fetchWrap = () => {
    // const token = selectToken(state)
    //
    // if (token) {
    //   appendHeader(options.headers, 'Authorization', 'bearer ' + token)
    // }

    return fetch(totalUrl, options)
      .then(handleErrors) // handle request error
      .then(toJson)
      .catch(error => { // handle network error like timeout
        if (error.status) {
          return Promise.reject(error)
        } else {
          const errorObject = {}
          errorObject.status = null
          errorObject.message = "Network error"
          errorObject.extra = `Error: ${error.message}`

          return Promise.reject(errorObject)
        }
      })
  }

  return fetchWrap()
}
