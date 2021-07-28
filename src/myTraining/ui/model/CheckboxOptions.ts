import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

const CheckboxOptions = {
  difficultyLevels: [
    { key: 0, text: 'Basic', value: 'Basic' },
    { key: 1, text: 'Intermediate', value: 'Intermediate' },
    { key: 2, text: 'Advanced', value: 'Advanced' },
    { key: 3, text: 'Expert', value: 'Expert' },
  ],

  organizers: [
    { key: 0, text: 'mySUNI', value: 'mySUNI' },
    { key: 1, text: 'Coursera', value: 'Coursera' },
    { key: 2, text: 'Linkedin', value: 'Linkedin' },
  ],

  learningTypes: [
    { key: 0, text: 'Course', value: 'Course' },
    { key: 1, text: 'Video', value: 'Video' },
    { key: 2, text: 'Audio', value: 'Audio' },
    { key: 3, text: 'e-Learning', value: 'ELearning' },
    { key: 4, text: 'Classroom', value: 'ClassRoomLecture' },
    { key: 5, text: 'Community', value: 'Community' },
    { key: 6, text: 'Task', value: 'Task' },
    { key: 7, text: 'Web Page', value: 'WebPage' },
    { key: 8, text: 'Documents', value: 'Documents' },
    { key: 9, text: 'Experiential', value: 'Experiential' },
    { key: 10, text: 'Cohort', value: 'Cohort' },
    { key: 11, text: 'Discussion', value: 'Discussion' },
  ],

  learningTimes: [
    { key: 0, text: '30분 미만', value: 'type1' },
    { key: 1, text: '30분 이상~1시간 미만', value: 'type2' },
    { key: 2, text: '1시간 이상~4시간 미만', value: 'type3' },
    { key: 3, text: '4시간 이상~12시간 미만', value: 'type4' },
    { key: 4, text: '12시간 이상', value: 'type5' },
  ],

  requireds: [
    { key: 0, text: '선택안함', value: 'none' },
    { key: 1, text: '유', value: 'true' },
    { key: 2, text: '무', value: 'false' },
  ],

  certifications: [
    { key: 0, text: 'Stamp', value: 'stamp' },
    { key: 1, text: 'Badge', value: 'badge' },
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
      label: '전체보기',
      value: 'All',
    },
    {
      key: 1,
      name: 'enrolling-viewType-radioGroup',
      label: '신청 가능 과정 모아보기',
      value: 'Available',
    },
  ],
};

export default CheckboxOptions;
