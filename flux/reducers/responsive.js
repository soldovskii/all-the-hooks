import {types} from "flux/actions/responsive"
import buildReducer from "./utils/buildReducer"

const initialState = {
  isMobile: null,
}

export default buildReducer(initialState, {
  [types.SET_IS_MOBILE]: (state, payload) => {
    return {
      ...state,
      isMobile: payload.isMobile,
    }
  },
})
