import scrollIntoView from "scroll-into-view"

const defaultAlign = {top: 0, left: 0, leftOffset: 0, topOffset: 0}

export const scrollToTop = (ref, callback, animated, alignParams = {}) => {
  if (typeof animated === "object") {
    alignParams = animated
  } else if (typeof callback === "object") {
    alignParams = callback
  }

  if (typeof callback === "boolean") {
    animated = callback
    callback = undefined
  }

  const element = ref && ref.current

  if (typeof alignParams.top === "undefined")
    alignParams.top = 0
  if (typeof alignParams.left === "undefined")
    alignParams.left = 0
  if (typeof alignParams.leftOffset === "undefined")
    alignParams.leftOffset = 0
  if (typeof alignParams.topOffset === "undefined")
    alignParams.topOffset = 0

  if (animated) {
    scrollIntoView(element, {align: {...alignParams}}, callback)
  } else if (element && element.scrollIntoView) {
    element.scrollIntoView(true)
    if (callback) callback()
  }
}

export const scrollToInputOrElement = (ref, key, animated = true, options = {}) => {
  const form = ref.current
  const input = form[key]

  if (input && input.focus) {
    scrollToElement(input, animated, options)
    input.focus()
  } else {
    let element = form.querySelector(`#${key}`)
    if (element) {
      scrollToElement(element, animated, options)
    } else {
      element = document.getElementById(key)
      if (element) {
        scrollToElement(element, animated, options)
      }
    }
  }
}

export const scrollToElement = (el, animated, options) => {
  if (typeof animated === "object") {
    options = animated
    animated = undefined
  }

  if (animated) {
    scrollIntoView(el, {align: {...defaultAlign, top: 0.05, ...options}})
  } else {
    el.scrollIntoView(true)
  }
}