export const generateActionFunc = (types, request) => (data, {
  showGlobalLoad = true,
  hideGlobalLoad = true,
} = {
  showGlobalLoad: true,
  hideGlobalLoad: true,
}) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.START,
      showGlobalLoad,
    })

    return request(data)
      .then(data => {
        dispatch({
          payload: {data},
          type: types.SUCCESS,
          hideGlobalLoad,
        })

        return Promise.resolve(data)
      })
      .catch(error => {
        dispatch({
          payload: {error},
          type: types.FAIL,
          hideGlobalLoad: true,
        })

        return Promise.reject(error)
      })
  }
}

export const generateActionClearErrorFunc = (types) => () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.CLEAR_ERROR,
    })
  }
}
