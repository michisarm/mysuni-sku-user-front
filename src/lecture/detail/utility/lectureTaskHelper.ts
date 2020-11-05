import { LectureTaskChildItem } from '../viewModel/LectureTask';

export function compareAscendingByTime(
  item0: LectureTaskChildItem,
  item1: LectureTaskChildItem
) {
  if (item0.time < item1.time) {
    return 1;
  } else {
    return -1;
  }
}
