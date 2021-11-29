import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function learningTimePolyglot(s: string) {
  if (s === '30분 미만') {
    return getPolyglotText('30분 미만', 'learning-LearningFilter2-시간1');
  } else if (s === '30분 이상~1시간 미만') {
    return getPolyglotText(
      '30분 이상~1시간 미만',
      'learning-LearningFilter2-시간2'
    );
  } else if (s === '1시간 이상~4시간 미만') {
    return getPolyglotText(
      '1시간 이상~4시간 미만',
      'learning-LearningFilter2-시간3'
    );
  } else if (s === '4시간 이상~12시간 미만') {
    return getPolyglotText(
      '4시간 이상~12시간 미만',
      'learning-LearningFilter2-시간4'
    );
  } else if (s === '12시간 이상') {
    return getPolyglotText('12시간 이상', 'learning-LearningFilter2-시간5');
  } else {
    return '';
  }
}

export function requiredPolyglot(s: string) {
  if (s === '선택안함') {
    return getPolyglotText('선택안함', 'learning-LearningFilter2-항목택1');
  } else if (s === '유') {
    return getPolyglotText('유', 'learning-LearningFilter2-항목택2');
  } else if (s === '무') {
    return getPolyglotText('무', 'learning-LearningFilter2-항목택3');
  } else return '';
}

const CheckboxOptions = {
  difficultyLevels: [
    {
      key: 0,
      text: getPolyglotText('Basic', 'learning-LearningFilter2-난이도1'),
      value: 'Basic',
    },
    {
      key: 1,
      text: getPolyglotText('Intermediate', 'learning-LearningFilter2-난이도2'),
      value: 'Intermediate',
    },
    {
      key: 2,
      text: getPolyglotText('Advanced', 'learning-LearningFilter2-난이도3'),
      value: 'Advanced',
    },
    {
      key: 3,
      text: getPolyglotText('Expert', 'learning-LearningFilter2-난이도4'),
      value: 'Expert',
    },
  ],

  organizers: [
    {
      key: 0,
      text: getPolyglotText('mySUNI', 'learning-LearningFilter2-기관1'),
      value: 'mySUNI',
    },
    {
      key: 1,
      text: getPolyglotText('Coursera', 'learning-LearningFilter2-기관2'),
      value: 'Coursera',
    },
    {
      key: 2,
      text: getPolyglotText('Linkedin', 'learning-LearningFilter2-기관3'),
      value: 'Linkedin',
    },
  ],

  learningTypes: [
    {
      key: 0,
      text: getPolyglotText('Course', 'learning-LearningFilter2-교육1'),
      value: 'Course',
    },
    {
      key: 1,
      text: getPolyglotText('Video', 'learning-LearningFilter2-교육2'),
      value: 'Video',
    },
    {
      key: 2,
      text: getPolyglotText('Audio', 'learning-LearningFilter2-교육3'),
      value: 'Audio',
    },
    {
      key: 3,
      text: getPolyglotText('e-Learning', 'learning-LearningFilter2-교육4'),
      value: 'ELearning',
    },
    {
      key: 4,
      text: getPolyglotText('Classroom', 'learning-LearningFilter2-교육5'),
      value: 'ClassRoomLecture',
    },
    {
      key: 5,
      text: getPolyglotText('Community', 'learning-LearningFilter2-교육6'),
      value: 'Community',
    },
    {
      key: 6,
      text: getPolyglotText('Task', 'learning-LearningFilter2-교육7'),
      value: 'Task',
    },
    {
      key: 7,
      text: getPolyglotText('Web Page', 'learning-LearningFilter2-교육8'),
      value: 'WebPage',
    },
    {
      key: 8,
      text: getPolyglotText('Documents', 'learning-LearningFilter2-교육9'),
      value: 'Documents',
    },
    {
      key: 9,
      text: getPolyglotText('Experiential', 'learning-LearningFilter2-교육10'),
      value: 'Experiential',
    },
    {
      key: 10,
      text: getPolyglotText('Cohort', 'learning-LearningFilter2-교육11'),
      value: 'Cohort',
    },
    {
      key: 11,
      text: getPolyglotText('Discussion', 'learning-LearningFilter2-교육12'),
      value: 'Discussion',
    },
  ],

  learningTimes: [
    {
      key: 0,
      text: '30분 미만',
      value: 'type1',
    },
    {
      key: 1,
      text: '30분 이상~1시간 미만',
      value: 'type2',
    },
    {
      key: 2,
      text: '1시간 이상~4시간 미만',
      value: 'type3',
    },
    {
      key: 3,
      text: '4시간 이상~12시간 미만',
      value: 'type4',
    },
    {
      key: 4,
      text: '12시간 이상',
      value: 'type5',
    },
  ],

  requireds: [
    {
      key: 0,
      text: '선택안함',
      value: 'none',
    },
    {
      key: 1,
      text: '유',
      value: 'true',
    },
    {
      key: 2,
      text: '무',
      value: 'false',
    },
  ],

  certifications: [
    {
      key: 0,
      text: getPolyglotText('Stamp', 'learning-LearningFilter2-자격1'),
      value: 'stamp',
    },
    {
      key: 1,
      text: getPolyglotText('Badge', 'learning-LearningFilter2-자격2'),
      value: 'badge',
    },
  ],

  viewTypes: [
    {
      key: 0,
      name: 'viewType-radioGroup',
      label: '코스만보기',
      value: 'Course',
    },
    { key: 1, name: 'viewType-radioGroup', label: '전체보기', value: 'All' },
  ],

  approvalViewTypes: [
    {
      key: 0,
      name: 'approval-viewType-radioGroup',
      label: getPolyglotText('전체', '승인관리-개인학습-라됴1'),
      value: '',
    },
    {
      key: 1,
      name: 'approval-viewType-radioGroup',
      label: getPolyglotText('승인대기', '승인관리-개인학습-라됴2'),
      value: 'OpenApproval',
    },
    {
      key: 2,
      name: 'approval-viewType-radioGroup',
      label: getPolyglotText('승인', '승인관리-개인학습-라됴3'),
      value: 'Opened',
    },
    {
      key: 3,
      name: 'approval-viewType-radioGroup',
      label: getPolyglotText('반려', '승인관리-개인학습-라됴4'),
      value: 'Rejected',
    },
  ],

  enrollingViewTypes: [
    {
      key: 0,
      name: 'enrolling-viewType-radioGroup',
      label: getPolyglotText('전체보기', 'enrolling-viewType-radioGroup2'),
      value: 'All',
    },
    {
      key: 1,
      name: 'enrolling-viewType-radioGroup',
      label: getPolyglotText(
        '신청 가능 과정 모아보기',
        'enrolling-viewType-radioGroup'
      ),
      value: 'Available',
    },
  ],
};

export default CheckboxOptions;
