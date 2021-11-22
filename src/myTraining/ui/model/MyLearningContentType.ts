import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export enum MyLearningContentType {
  InProgress = 'InProgress', // 학습중
  InMyList = 'InMyList', // 관심목록
  Enrolled = 'Enrolled', // 학습예정
  Required = 'Required', // 핵인싸 과정
  Completed = 'Completed', // 학습완료('mySUNI 학습완료' 로 변경 예정)
  PersonalCompleted = 'PersonalCompleted', // 개인학습 완료(새롭게 추가되는 타입)
  Retry = 'Retry', // 취소/미이수
}

export enum MyLearningContentTypeName {
  InProgress = '학습중',
  InMyList = '관심목록',
  Enrolled = '학습예정',
  Required = '핵인싸 과정',
  Completed = 'mySUNI 학습완료',
  PersonalCompleted = '개인학습 완료',
  Retry = '취소/미이수',
}

export function learningContentTypeName(s: string) {
  if (s === 'InProgress') {
    return getPolyglotText('학습중', 'learning-tabm-탭학습');
  } else if (s === 'InMyList') {
    return getPolyglotText('관심목록', 'learning-tabm-탭관심');
  } else if (s === 'Enrolled') {
    return getPolyglotText('학습예정', 'learning-tabm-탭학예');
  } else if (s === 'Required') {
    return getPolyglotText('핵인싸 과정', 'learning-tabm-탭권장');
  } else if (s === 'Completed') {
    return getPolyglotText('mySUNI 학습완료', 'learning-tabm-탭학완');
  } else if (s === 'PersonalCompleted') {
    return getPolyglotText('개인학습 완료', 'learning-tabm-탭개완');
  } else if (s === 'Retry') {
    return getPolyglotText('취소/미이수', 'learning-tabm-탭취소');
  } else {
    return '';
  }
}
