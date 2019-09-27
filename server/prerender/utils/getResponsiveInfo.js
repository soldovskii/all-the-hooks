export default function getResponsiveInfo(useragent) {
  const {isMobile = false, isTablet = false} = useragent

  return {isMobile, isTablet}
}
