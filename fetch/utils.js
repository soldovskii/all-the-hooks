import {parse, stringify} from "query-string"

//** lodash
import isPlainObject from "lodash/isPlainObject"
import omit from "lodash/omit"

export const is = (o, type) => toString.call(o) === `[object ${type}]`
export const isURLSearchParams = o => is(o, "URLSearchParams")
export const isFormData = o => is(o, "FormData")
export const isBlob = o => is(o, "Blob")

const methodsWithBodyAllowed = ["POST", "PUT", "PATCH", "DELETE"]

export const appendHeader = (headers, key, value) => {
  headers.append(key, value)

  return headers
}

export const isValidBody = (body) => {
  return (
    typeof body === "string" ||
    isURLSearchParams(body) ||
    isFormData(body) ||
    isBlob(body)
  )
}

export const getFullUrl = ({url, fullUrl}) => {
  let _url = GLOBALS.BACKEND_URL + (fullUrl ? "" : "/back") + url

  _url = _url.replace(/\/\//g, (match, offset) => offset <= 6 ? "//" : "/")

  return encodeURI(decodeURI(_url))
}

export const prepareUrl = (url = "", method, params) => {
  if (method !== "GET") return url

  const splittedUrl = url.split("?")
  const _params = splittedUrl[1] || ""
  const _url = splittedUrl[0]

  const paramsObj = {
    ...parse(_params),
    ...params,
  }

  if (Object.keys(paramsObj).length > 0) {
    return `${_url}?${stringify(paramsObj)}`
  } else {
    return url
  }
}

export const finishUrl = totalURL => {
  if (!totalURL.includes("?") && totalURL[totalURL.length - 1] !== "/") {
    totalURL += "/"
  }

  return totalURL
}

export const prepareBody = (body, method = "GET") => {
  if (!body) return undefined

  if (!methodsWithBodyAllowed.includes(method)) {
    console.warn(`Only "${methodsWithBodyAllowed.join(", ")}" may contain body`)
    return undefined
  }

  if (isValidBody(body)) {
    return body
  }

  if (isPlainObject(body)) {
    try {
      return JSON.stringify(body)
    } catch (e) {
      console.error("Body cant be converted to JSON", e.message)
    }
  } else {
    console.error("Body is not plain object")
  }
}

export const prepareHeaders = (headers, method = "GET", contentType = "application/json", noHeaders) => {
  if (!noHeaders && methodsWithBodyAllowed.includes(method)) {
    return new Headers({
      "Content-Type": contentType,
      ...headers,
    })
  } else {
    return new Headers()
  }
}

const commonCatch = resp => error => {
  const {parsed, json, text} = error

  if (parsed) {
    const errorObject = {}
    errorObject.status = resp.status
    errorObject.url = resp.url
    errorObject.message = `Response from server with status ${resp.status}`
    errorObject.extra = omit(json, ["status"])
    errorObject.parsed = true

    return Promise.reject(errorObject)
  } else {
    const errorObject = {}
    errorObject.status = resp.status
    errorObject.url = resp.url
    errorObject.message = `Cannot parse server response with status ${resp.status}`
    errorObject.extra = text

    return Promise.reject(errorObject)
  }
}

export const handleErrors = async resp => {
  if (resp.ok) return resp // if status in the range 200-299

  return resp
    .text()
    .then(text => {
      try {
        const json = JSON.parse(text)
        return Promise.reject({json, parsed: true}) // REJECT ANYWAY
      } catch (e) {
        return Promise.reject({text, parsed: false})
      }
    })
    .catch(commonCatch(resp))
    .catch((errorObject) => {
      // const {status} = errorObject

      // Once upon the time it was neccessary to
      // /logout user if he had entered wrong recovery password.
      // I consider it to be the bug, hence commented.

      // if (isClient && status === 405) {
      //   window.location.href = '/logout'
      // }

      return Promise.reject(errorObject)
    })
}

export const toJson = async resp => {
  return resp
    .text()
    .then(text => {
      try {
        let json
        json = JSON.parse(text)
        json = omit(json, ["status"]) // it is not response status, that from response body
        return Promise.resolve({...json}) // RESOLVE if parsed
      } catch (e) {
        return Promise.reject({text, parsed: false})
      }
    })
    .catch(commonCatch(resp))
}

