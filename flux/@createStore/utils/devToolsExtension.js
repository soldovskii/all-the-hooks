// external redux devtools via chrome extention
// https://github.com/zalmoxisus/redux-devtools-extension#implementation
const {__REDUX_DEVTOOLS_EXTENSION__ = () => (f) => f} = typeof window === "undefined" ? {} : window

export default __REDUX_DEVTOOLS_EXTENSION__
