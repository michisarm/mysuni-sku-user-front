import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function stateNamePolytglot(s: string) {
  if (s === '학습중') {
    return getPolyglotText('학습중', 'learning-학습상태-학습중');
  } else if (s === '학습완료') {
    return getPolyglotText('학습완료', 'learning-학습상태-학습완료');
  } else if (s === '취소/미이수') {
    return getPolyglotText('취소/미이수', 'learning-학습상태-취소미이수');
  } else return '';
}

enum LearningStateName {
  Progress = '학습중',
  Waiting = '학습중',
  TestWaiting = '학습중',
  HomeworkWaiting = '학습중',
  Failed = '학습중',
  TestPassed = '학습중',
  Passed = '학습완료',
  Missed = '취소/미이수',
  NoShow = '취소/미이수',
}

export default LearningStateName;
