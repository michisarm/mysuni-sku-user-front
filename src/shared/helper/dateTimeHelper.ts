

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

export function timeToHourMinutePaddingFormat(time: number) {
  //
  const hour = Math.floor(time / 60) || 0;
  const minute = time % 60 || 0;

  if (hour < 1 && minute < 1) {
    return '0h 0m';
  }
  else if (hour < 1) {
    return `0h ${minute}m`;
  }
  else if (minute < 1) {
    return `${hour}h 0m`;
  }
  else {
    return `${hour}h ${minute}m`;
  }
}

export function getYearMonthDateHourMinuteSecond(date: Date) {
  if (!date) return null;
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
}

export default {
  timeToHourMinute,
  timeToHourMinuteFormat,
};
