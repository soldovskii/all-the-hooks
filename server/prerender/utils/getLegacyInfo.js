export default function getLegacyInfo(useragent) {
  const {version, isChrome, isSafari, isFirefox} = useragent

  const numericVersion = parseInt(version)

  if (isChrome && numericVersion >= 66) {
    return false
  } else if (isFirefox && numericVersion >= 61) {
    return false
  } else if (isSafari && numericVersion >= 11) {
    return false
  }

  return true
}
