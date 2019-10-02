import React, { Component, Fragment } from "react"

import Tooltip from "app/Elements/ReactTooltip"

export default class Wrap extends Component {
  render() {
    return (
      <Fragment>
        <h1>React</h1>
        <a href="https://ru.reactjs.org/docs/hooks-reference.html" target="_blank">https://ru.reactjs.org/docs/hooks-reference.html</a>

        <h2>Основные хуки</h2>
        <ul>
          <li>useState</li>
          <li>useEffect</li>
          <li>useContext</li>
        </ul>

        <h2>Дополнительные хуки</h2>
        <ul>
          <li>useReducer</li>
          <li>useCallback</li>
          <li>useMemo</li>
          <li>useRef</li>
          <li>useImperativeHandle</li>
          <li>useLayoutEffect</li>
          <li>useDebugValue</li>
        </ul>

        <h1>React-router</h1>
        <a href="https://github.com/ReactTraining/react-router/releases/tag/v5.1.0" target="_blank">https://github.com/ReactTraining/react-router/releases/tag/v5.1.0</a>

        <ul>
          <li>useParams</li>
          <li>useLocation</li>
          <li>useHistory</li>
          <li>useRouteMatch</li>
        </ul>

        <h1>React-redux</h1>
        <a href="https://react-redux.js.org/next/api/hooks" target="_blank">https://react-redux.js.org/next/api/hooks</a>

        <ul>
          <li>useSelector</li>
          <li>useDispatch</li>
          <li>useStore</li>
        </ul>

        <Tooltip
          type="small"
          text="Маленький текст"
        >
          Пример тултипа small
        </Tooltip>
        <Tooltip
          type="big"
          text="Очень большой и длинный текст с подробным описанием, иногда на несколько строк, если не умешается в ширину 430 пикселей"
        >
          Пример тултипа big
        </Tooltip>
      </Fragment>
    )
  }
}
