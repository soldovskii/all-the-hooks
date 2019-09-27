import React, { Fragment, Suspense } from "react"
import PropTypes from "prop-types"

export default function Tooltip(props) {
  if (typeof window === "undefined") {
    return (<Fragment />)
  }

  return (
    <Suspense fallback={null}>
      {props.children}
    </Suspense>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
}
