export const types = {
  SET_IS_MOBILE: "SET_IS_MOBILE",
}

export function setIsMobile(isMobile = false) {
  return {
    type: types.SET_IS_MOBILE,
    payload: {
      isMobile,
    },
  }
}
