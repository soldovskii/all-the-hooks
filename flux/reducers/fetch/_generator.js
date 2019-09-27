import buildReducer from "flux/utils/buildReducer"

const initialState = {
  data: null,
  error: null,
  fetching: false,
}

export const generateReducer = (types) => buildReducer(initialState, {
  [types.START]: (state, payload) => {
    return {
      ...state,
      error: null,
      fetching: true,
    }
  },

  [types.SUCCESS]: (state, payload) => {
    const {data = {}} = payload

    return {
      ...state,
      data: {...data},
      error: null,
      fetching: false,
    }
  },

  [types.FAIL]: (state, payload) => {
    const {error = {}} = payload

    console.log(error)

    return {
      ...state,
      error: {...error},
      fetching: false,
    }
  },

  [types.CLEAR_ERROR]: (state, payload) => {
    return {
      ...state,
      error: null,
    }
  },
})

