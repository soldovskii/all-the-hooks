import React, { Component } from "react"

//** elements
import PageMeta from "app/Layout/PageMeta"

export default class Page404 extends Component {
  render() {
    return (
      <PageMeta status={404}>
        <h1>not found</h1>
      </PageMeta>
    )
  }
}
