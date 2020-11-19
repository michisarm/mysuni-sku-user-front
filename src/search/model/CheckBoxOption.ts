const CheckboxOptions = {
  college: [
    { key: 0, text: 'Al', value: 'Al' },
    { key: 1, text: 'DT', value: 'DT' },
    { key: 2, text: '행복', value: '행복' },
    { key: 3, text: 'SV', value: 'SV' },
    { key: 4, text: '혁신디자인', value: '혁신디자인' },
    { key: 5, text: 'Global', value: 'Global' },
    { key: 6, text: 'Management', value: 'Management' },
    { key: 7, text: '반도체', value: '반도체' },
    { key: 8, text: '에너지솔루션', value: '에너지솔루션' },
    { key: 9, text: 'SK경영', value: 'SK경영' },
    { key: 10, text: 'SK아카데미', value: 'SK아카데미' },
    { key: 11, text: 'Life Style', value: 'LifeStyle' },
  ],
  
  difficultyLevels: [
    { key: 0, text: 'Basic', value: 'Basic' },
    { key: 1, text: 'Intermediate', value: 'Intermediate' },
    { key: 2, text: 'Advanced', value: 'Advanced' },
    { key: 3, text: 'Expert', value: 'Expert' }
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
    { key: 6, text: 'Web Page', value: 'WebPage' },
    { key: 7, text: 'Documents', value: 'Documents' },
  ],

  learningTimes: [
    { key: 0, text: '30분 미만', value: 'type1', },
    { key: 1, text: '30분 이상~1시간 미만', value: 'type2', },
    { key: 2, text: '1시간 이상~4시간 미만', value: 'type3', },
    { key: 3, text: '4시간 이상~12시간 미만', value: 'type4', },
    { key: 4, text: '12시간 이상', value: 'type5', },
  ],

  requireds: [
    { key: 0, text: '선택안함', value: 'none' },
    { key: 1, text: '유', value: 'true' },
    { key: 2, text: '무', value: 'false' }
  ],

  certifications: [
    { key: 0, text: 'Stamp', value: 'stamp' },
    { key: 1, text: 'Badge', value: 'badge' }
  ],

  viewTypes: [
    { key: 0, name: 'viewType-radioGroup', label: '코스만보기', value: 'Course' },
    { key: 1, name: 'viewType-radioGroup', label: '전체보기', value: 'All' },
  ],

  approvalViewTypes: [
    { key: 0, name: 'approval-viewType-radioGroup', label: '전체', value: '' },
    { key: 1, name: 'approval-viewType-radioGroup', label: '승인대기', value: 'OpenApproval' },
    { key: 2, name: 'approval-viewType-radioGroup', label: '승인', value: 'Opened' },
    { key: 3, name: 'approval-viewType-radioGroup', label: '반려', value: 'Rejected' }
  ]
};

export default CheckboxOptions;
