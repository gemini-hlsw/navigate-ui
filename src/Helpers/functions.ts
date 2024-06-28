export function deg2hms(deg: number) {
  if (deg < 0) deg = deg + 360;
  let total_hours = (deg / 360) * 24;
  let hours = Math.trunc(total_hours);
  total_hours = (total_hours - hours) * 60;
  let mins = Math.trunc(total_hours);
  let secs = (total_hours - mins) * 60;
  if (secs.toFixed(2) == '60.00') {
    mins = mins + 1;
    secs = 0;
  }
  if (mins == 60) {
    hours = hours + 1;
    mins = 0;
  }
  return (
    hours.toString().padStart(2, '0') + ':' + mins.toString().padStart(2, '0') + ':' + secs.toFixed(3).padStart(6, '0')
  );
}

export function deg2dms(deg: number) {
  const degrees = Math.trunc(deg);
  const rest = (deg - degrees) * 60;
  const mins = Math.trunc(rest);
  const secs = (rest - mins) * 60;
  if (deg < 0) {
    return '-' + Math.abs(degrees).toString() + ':' + Math.abs(mins).toString() + ':' + Math.abs(secs).toFixed(2);
  } else {
    return (
      Math.abs(degrees).toString().padStart(2, '0') +
      ':' +
      Math.abs(mins).toString().padStart(2, '0') +
      ':' +
      Math.abs(secs).toFixed(3).padStart(6, '0')
    );
  }
}

export function hms2deg(angle: string) {
  if (angle.includes(':')) {
    const arr = angle.split(':');
    const h = parseFloat(arr[0]);
    const m = parseFloat(arr[1]);
    const s = parseFloat(arr[2]);
    const deg = ((h + m / 60.0 + s / 3600.0) / 24) * 360;
    return deg;
  } else {
    return parseFloat(angle);
  }
}

export function dms2deg(angle: string) {
  if (angle.includes(':')) {
    const arr = angle.split(':');
    let d = parseFloat(arr[0]);
    const sign = Math.sign(d);
    d = Math.abs(d);
    const m = parseFloat(arr[1]);
    const s = parseFloat(arr[2]);
    const deg = sign * (d + m / 60.0 + s / 3600.0);
    return deg;
  } else {
    return parseFloat(angle);
  }
}

export function isNotNullish<T>(val: T | undefined | null): val is T {
  return val !== null && val !== undefined;
}
