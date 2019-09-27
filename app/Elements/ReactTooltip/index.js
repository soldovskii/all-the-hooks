import React from "react"
import PropTypes from "prop-types"

export default function Tooltip(props) {
  const { text = "EMPTY", type = "small", children } = props

  if (type === "small") {
    return (<span data-tip={text} data-for="small" data-type="light">{children}</span>)
  }

  if (type === "big") {
    return (<span data-tip={text} data-for="big" data-type="light">{children}</span>)
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
