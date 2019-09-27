import React from "react"

import ReactLazyContainer from "../ReactLazyContainer"

const ReactTooltip = React.lazy(() => import("react-tooltip"))

export default function ReactTooltipHost(props) {
  return (
    <ReactLazyContainer>
      <ReactTooltip {...props} />
    </ReactLazyContainer>
  )
}
