import React, { Component } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

export default class HelmetComponent extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
  }

  render() {
    const { title, description } = this.props
    return (
      <Helmet defaultTitle={description}>
        {title && <title>{title}</title>}
      </Helmet>
    )
  }
}
