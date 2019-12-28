

export function timeToHourMinute(time: number) {
  //
  const hour = Math.floor(time / 60);
  const minute = time % 60;

  return { hour: hour || 0, minute: minute || 0 };
}

export default {
  timeToHourMinute,
};
