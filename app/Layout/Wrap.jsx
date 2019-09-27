import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { hot } from "react-hot-loader/root"
import { renderRoutes } from "react-router-config"

//** Elements
import ReactTooltipHost from "app/Elements/ReactTooltipHost"

//** layout
import PageMeta from "app/Layout/PageMeta"
import Helmet from "app/Layout/Helmet"

//** styles
import "./Wrap.styl"

const defaultMeta = {
  title: "ЭЛТЕХ",
}

class Wrap extends Component {
  static propTypes = {
    route: PropTypes.object,
  }

  componentDidMount() {
    const body = document.body
    let timer

    setTimeout(() => body.classList.remove("preload"), 500)

    window.addEventListener("scroll", () => {
      clearTimeout(timer)

      if (!body.classList.contains("disable-hover")) {
        body.classList.add("disable-hover")
      }

      timer = setTimeout(() => body.classList.remove("disable-hover"), 500)
    }, false)
  }

  render() {
    const { route } = this.props

    return (
      <PageMeta status={200}>
        <Fragment>
          <Helmet
            title={defaultMeta.title}
            description={defaultMeta.description}
          />

          {
            renderRoutes(route.routes)
          }

          <ReactTooltipHost
            id="small"
            className="small"
            insecure={false}
            delayHide={50}
            delayShow={50}
            delayUpdate={50}
            place="bottom"
            effect="solid"
            wrapper={undefined}
          />

          <ReactTooltipHost
            id="big"
            className="big"
            insecure={false}
            delayHide={150}
            delayShow={150}
            delayUpdate={150}
            place="bottom"
            effect="solid"
            wrapper={undefined}
          />

        </Fragment>
      </PageMeta>
    )
  }
}

export default hot(Wrap)
