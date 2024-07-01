export function deg2hms(deg: number) {
  if (deg < 0) deg = deg + 360
  let total_hours = (deg / 360) * 24
  let hours = Math.trunc(total_hours)
  total_hours = (total_hours - hours) * 60
  let mins = Math.trunc(total_hours)
  let secs = (total_hours - mins) * 60
  if (secs.toFixed(2) == "60.00") {
    mins = mins + 1
    secs = 0
  }
  if (mins == 60) {
    hours = hours + 1
    mins = 0
  }
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    mins.toString().padStart(2, "0") +
    ":" +
    secs.toFixed(3).padStart(6, "0")
  )
}

export function deg2dms(deg: number) {
  let degrees = Math.trunc(deg)
  let rest = (deg - degrees) * 60
  let mins = Math.trunc(rest)
  let secs = (rest - mins) * 60
  if (deg < 0) {
    return (
      "-" +
      Math.abs(degrees).toString() +
      ":" +
      Math.abs(mins).toString() +
      ":" +
      Math.abs(secs).toFixed(2)
    )
  } else {
    return (
      Math.abs(degrees).toString().padStart(2, "0") +
      ":" +
      Math.abs(mins).toString().padStart(2, "0") +
      ":" +
      Math.abs(secs).toFixed(3).padStart(6, "0")
    )
  }
}

export function hms2deg(angle: string) {
  if (angle.includes(":")) {
    let arr = angle.split(":")
    let h = parseFloat(arr[0])
    let m = parseFloat(arr[1])
    let s = parseFloat(arr[2])
    let deg = ((h + m / 60.0 + s / 3600.0) / 24) * 360
    return deg
  } else {
    return parseFloat(angle)
  }
}

export function dms2deg(angle: string) {
  if (angle.includes(":")) {
    let arr = angle.split(":")
    let d = parseFloat(arr[0])
    let sign = Math.sign(d)
    d = Math.abs(d)
    let m = parseFloat(arr[1])
    let s = parseFloat(arr[2])
    let deg = sign * (d + m / 60.0 + s / 3600.0)
    return deg
  } else {
    return parseFloat(angle)
  }
}
