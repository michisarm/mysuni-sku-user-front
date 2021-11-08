export function playSecondToString(playSecond: number): string {
  //
  let hour = '00';
  let min = '00';
  let sec = '00';

  if (playSecond > 3600) {
    hour =
      playSecond / 3600 > 9 ? `${playSecond / 3600}` : `0${playSecond / 3600}`;

    playSecond %= 3600;
  }

  if (playSecond > 60) {
    min = playSecond / 60 > 9 ? `${playSecond / 60}` : `0${playSecond / 60}`;

    playSecond %= 60;
  }

  if (playSecond > 0) {
    sec = playSecond > 9 ? `${playSecond}` : `0${playSecond}`;
  }

  return `${hour}:${min}:${sec}`;
}
