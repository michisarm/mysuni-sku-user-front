

export function timeToHourMinute(time: number) {
  //
  const hour = Math.floor(time / 60) || 0;
  const minute = time % 60 || 0;

  return { hour, minute };
}

export function timeToHourMinuteFormat(time: number) {
  //
  const hour = Math.floor(time / 60) || 0;
  const minute = time % 60 || 0;

  if (hour < 1 && minute < 1) {
    return '00h 00m';
  }
  else if (hour < 1) {
    return `${minute}m`;
  }
  else if (minute < 1) {
    return `${hour}h`;
  }
  else {
    return `${hour}h ${minute}m`;
  }
}

export default {
  timeToHourMinute,
  timeToHourMinuteFormat,
};
