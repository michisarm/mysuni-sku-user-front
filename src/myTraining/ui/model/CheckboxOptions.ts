const CheckboxOptions = {

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

  requireds: [
    { key: 0, text: '선택안함', value: 'none' },
    { key: 1, text: '유', value: 'true' },
    { key: 2, text: '무', value: 'false' }
  ],

  viewTypes: [
    { key: 0, name: 'viewType-radioGroup', label: '코스만보기', value: 'Course' },
    { key: 1, name: 'viewType-radioGroup', label: '전체보기', value: 'All' },
  ],
};

export default CheckboxOptions;
