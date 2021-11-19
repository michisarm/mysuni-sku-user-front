import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function filterConditionNamePolyglot(s: string) {
  if (s === '교육유형') {
    return getPolyglotText('교육유형', '통검-필레팝-교육유형');
  } else if (s === 'College') {
    return getPolyglotText('College', '통검-필레팝-컬리지');
  } else if (s === '컬리지') {
    return getPolyglotText('College', '통검-필레팝-컬리지');
  } else if (s === '난이도') {
    return getPolyglotText('난이도', '통검-필레팝-난이도');
  } else if (s === '학습시간') {
    return getPolyglotText('학습시간', '통검-필레팝-학습시간');
  } else if (s === '교육기관') {
    return getPolyglotText('교육기관', '통검-필레팝-교육기관');
  } else if (s === '핵인싸') {
    return getPolyglotText('핵인싸', '통검-필레팝-핵인싸');
  } else if (s === 'Certification') {
    return getPolyglotText('Certification', '통검-필레팝-자격증명');
  } else if (s === '교육일정') {
    return getPolyglotText('교육일정', '통검-필레팝-교육일정');
  } else if (s === '지원언어') {
    return getPolyglotText('지원언어', '통검-필레팝-지원언어');
  } else {
    return '';
  }
}

export enum FilterConditionName {
  LearningType = '교육유형',
  College = '컬리지',
  DifficultyLevel = '난이도',
  LearningTime = '학습시간',
  Organizer = '교육기관',
  Required = '핵인싸',
  Certification = 'Certification',
  LearningSchedule = '교육일정',
}
