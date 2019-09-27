import serialize from "serialize-javascript"
import getResponsiveInfo from "./utils/getResponsiveInfo"
import getLegacyInfo from "./utils/getLegacyInfo"
import {development as getStatics} from "./utils/getStatics"
import {renderDevPage} from "./utils/getRenderPage"

export default function prerenderDevelopment(req, res) {
  const {useragent = {}} = req

  const responsive = getResponsiveInfo(useragent)

  const isLegacy = getLegacyInfo(useragent)

  const statics = getStatics({isLegacy})

  const initialState = encodeURIComponent(serialize({responsive}, {isJSON: true}))

  res.send(renderDevPage(statics, initialState, responsive))
}
