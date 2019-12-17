

export function timeToHourMinute(time: number) {
  //
  const hour = Math.floor(time / 60);
  const minute = time % 60;

  return { hour, minute };
}

export default {
  timeToHourMinute,
};
