import zeroPadding from "./strings/zeroPadding"

export const fromHHMM = (value) => {
  const time = value.split(":")

  if (time.length !== 0) {
    return parseInt(time[0]) * 60 + parseInt(time[1])
  } else {
    return parseInt(value)
  }
}

export const toHHMM = (value) => {
  if (value) {
    const hours = parseInt(value / 60)
    const minutes = parseInt(value % 60)

    return `${zeroPadding(hours, 2)}:${zeroPadding(minutes, 2)}`
  } else {
    return undefined
  }
}

