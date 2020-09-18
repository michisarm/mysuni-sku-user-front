export default {
  learningType: [
    { key: '1', text: 'Classroom', value: 'ClassRoomLecture' },
    { key: '2', text: 'E-learning', value: 'ELearning' },
    { key: '3', text: 'Video', value: 'Video' },
    { key: '4', text: 'Audio', value: 'Audio' },
    { key: '5', text: 'Community', value: 'Community' },
    { key: '6', text: 'Web Page', value: 'WebPage' },
    { key: '7', text: 'Documents', value: 'Documents' },
    { key: '8', text: 'Experiential', value: 'Experiential' },
  ],

  learningTypeForSearch: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: 'Classroom', value: 'ClassRoomLecture' },
    { key: '2', text: 'E-learning', value: 'ELearning' },
    { key: '3', text: 'Video', value: 'Video' },
    { key: '4', text: 'Audio', value: 'Audio' },
    { key: '5', text: 'Community', value: 'Community' },
    { key: '6', text: 'Web Page', value: 'WebPage' },
    { key: '7', text: 'Documents', value: 'Documents' },
    { key: '8', text: 'Experiential', value: 'Experiential' },
  ],

  cubeOrCourse: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: 'Cube', value: 'Cube' },
    { key: '2', text: 'Course', value: 'Course' },
  ],

  limit: [
    { key: '1', text: '20개씩 보기', value: 20 },
    { key: '2', text: '50개씩 보기', value: 50 },
    { key: '3', text: '100개씩 보기', value: 100 },
    { key: '4', text: '전체 보기', value: 9999999 },
  ],

  colleges: [
    { key: '0', text: 'AI', value: 'h1' },
    { key: '1', text: 'DT', value: 'h2' },
    { key: '2', text: '행복', value: 'h3' },
    { key: '3', text: 'SV', value: 'h4' },
    { key: '4', text: 'Design', value: 'h5' },
    { key: '5', text: 'Global', value: 'h6' },
    { key: '6', text: 'Leadership', value: 'h7' },
    { key: '7', text: 'Management', value: 'h8' },
    { key: '8', text: '반도체', value: '10i' },
    { key: '9', text: 'SK아카데미', value: '10j' },
    { key: '10', text: '에너지솔루션', value: '10m' },
  ],

  difficulty: [
    { key: '1', text: 'Basic', value: 'Basic' },
    { key: '2', text: 'Intermediate', value: 'Intermediate' },
    { key: '3', text: 'Advanced', value: 'Advanced' },
    { key: '4', text: 'Expert', value: 'Expert' },
  ],

  assignment: [
    { key: '1', text: 'Yes', value: true },
    { key: '2', text: 'No', value: false },
  ],

  pay: [
    { key: '1', text: '무료', value: true },
    { key: '2', text: '유료', value: false },
  ],

  cubeSections: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Learning', content: 'Learning 관리', link: true },
    { key: 'Process', content: '과정 관리', active: true },
    { key: 'Cube', content: 'Cube 관리', active: true },
  ],

  approvalSections: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Learning', content: 'Learning 관리', link: true },
    { key: 'Process', content: '과정 관리', active: true },
    { key: 'Cube', content: 'Cube/Course 승인 관리', active: true },
  ],

  courseSections: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Learning', content: 'Learning 관리', link: true },
    { key: 'Process', content: '과정 관리', active: true },
    { key: 'Cube', content: 'Course 관리', active: true },
  ],

  approveSections: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Learning', content: 'Learning 관리', link: true },
    { key: 'Approve', content: '승인 관리', active: true },
    { key: 'Cube/Course', content: 'Cube/Course 승인 관리', active: true },
  ],

  learningStateSection: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Learning', content: 'Learning 관리', link: true },
    { key: 'LearningState', content: '학습상태 관리', active: true },
    { key: 'LearningCompleteProc', content: '학습완료 처리', active: true },
  ],

  EnrollmentStateSection: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Main', content: 'Main 전시관리', link: true },
    { key: 'BannerState', content: 'Banner 관리', active: true },
    { key: 'BannerEnrollment', content: 'Banner 등록관리', active: true },
  ],

  OrganizationStateSection: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Main', content: 'Main 전시관리', link: true },
    { key: 'BannerState', content: 'Banner 관리', active: true },
    { key: 'BannerOrganization', content: 'Banner 편성관리', active: true },
  ],

  badgeSections: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'CertificationTop', content: 'Certification 관리', link: true },
    { key: 'CertificationLeft', content: 'Certification 관리', active: true },
    { key: 'Badge', content: 'Badge 관리', active: true },
  ],

  badgeApprovalSections: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'CertificationTop', content: 'Certification 관리', link: true },
    { key: 'CertificationLeft', content: '승인 관리', active: true },
    { key: 'Approval', content: 'Badge 승인 관리', active: true },
  ],

  badgeApproverSections: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'CertificationTop', content: 'Certification 관리', link: true },
    { key: 'CertificationLeft', content: '승인 관리', active: true },
    { key: 'Approver', content: '승인자 관리', active: true },
  ],

  badgeArrangeSections: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'CertificationTop', content: 'Certification 관리', link: true },
    { key: 'Arrange', content: 'Badge 편성 관리', active: true },
  ],

  recruitmentType: [
    { key: '1', text: '수강신청', value: 'PublicEnrolling' },
    { key: '2', text: '파일등록', value: 'FileUpload' },
  ],

  peopleLimit: [
    { key: '1', text: 'Yes', value: 'Yes' },
    { key: '2', text: 'No', value: 'No' },
  ],

  recruitment: [
    { key: '1', text: 'Yes', value: 'Yes' },
    { key: '2', text: 'No', value: 'No' },
  ],

  survey: [
    { key: '1', text: 'Yes', value: true },
    { key: '2', text: 'No', value: false },
  ],

  hours: [
    { key: '0', text: '00', value: 0 },
    { key: '1', text: '01', value: 1 },
    { key: '2', text: '02', value: 2 },
    { key: '3', text: '03', value: 3 },
    { key: '4', text: '04', value: 4 },
    { key: '5', text: '05', value: 5 },
    { key: '6', text: '06', value: 6 },
    { key: '7', text: '07', value: 7 },
    { key: '8', text: '08', value: 8 },
    { key: '9', text: '09', value: 9 },
    { key: '10', text: '10', value: 10 },
    { key: '11', text: '11', value: 11 },
    { key: '12', text: '12', value: 12 },
    { key: '13', text: '13', value: 13 },
    { key: '14', text: '14', value: 14 },
    { key: '15', text: '15', value: 15 },
    { key: '16', text: '16', value: 16 },
    { key: '17', text: '17', value: 17 },
    { key: '18', text: '18', value: 18 },
    { key: '19', text: '19', value: 19 },
    { key: '20', text: '20', value: 20 },
    { key: '21', text: '21', value: 21 },
    { key: '22', text: '22', value: 22 },
    { key: '23', text: '23', value: 23 },
    { key: '00', text: '24', value: 24 },
  ],

  minute: [
    { key: '1', text: '00', value: 0 },
    { key: '2', text: '05', value: 5 },
    { key: '3', text: '10', value: 10 },
    { key: '4', text: '15', value: 15 },
    { key: '5', text: '20', value: 20 },
    { key: '6', text: '25', value: 25 },
    { key: '7', text: '30', value: 30 },
    { key: '8', text: '35', value: 35 },
    { key: '9', text: '40', value: 40 },
    { key: '10', text: '45', value: 45 },
    { key: '11', text: '50', value: 50 },
    { key: '12', text: '55', value: 55 },
  ],

  hoursType1: [
    { key: '0', text: '00 시', value: 0 },
    { key: '1', text: '01 시', value: 1 },
    { key: '2', text: '02 시', value: 2 },
    { key: '3', text: '03 시', value: 3 },
    { key: '4', text: '04 시', value: 4 },
    { key: '5', text: '05 시', value: 5 },
    { key: '6', text: '06 시', value: 6 },
    { key: '7', text: '07 시', value: 7 },
    { key: '8', text: '08 시', value: 8 },
    { key: '9', text: '09 시', value: 9 },
    { key: '10', text: '10 시', value: 10 },
    { key: '11', text: '11 시', value: 11 },
    { key: '12', text: '12 시', value: 12 },
    { key: '13', text: '13 시', value: 13 },
    { key: '14', text: '14 시', value: 14 },
    { key: '15', text: '15 시', value: 15 },
    { key: '16', text: '16 시', value: 16 },
    { key: '17', text: '17 시', value: 17 },
    { key: '18', text: '18 시', value: 18 },
    { key: '19', text: '19 시', value: 19 },
    { key: '20', text: '20 시', value: 20 },
    { key: '21', text: '21 시', value: 21 },
    { key: '22', text: '22 시', value: 22 },
    { key: '23', text: '23 시', value: 23 },
  ],

  minuteType1: [
    { key: '0', text: '00 분', value: 0 },
    { key: '1', text: '01 분', value: 1 },
    { key: '2', text: '02 분', value: 2 },
    { key: '3', text: '03 분', value: 3 },
    { key: '4', text: '04 분', value: 4 },
    { key: '5', text: '05 분', value: 5 },
    { key: '6', text: '06 분', value: 6 },
    { key: '7', text: '07 분', value: 7 },
    { key: '8', text: '08 분', value: 8 },
    { key: '9', text: '09 분', value: 9 },
    { key: '10', text: '10 분', value: 10 },
    { key: '11', text: '11 분', value: 11 },
    { key: '12', text: '12 분', value: 12 },
    { key: '13', text: '13 분', value: 13 },
    { key: '14', text: '14 분', value: 14 },
    { key: '15', text: '15 분', value: 15 },
    { key: '16', text: '16 분', value: 16 },
    { key: '17', text: '17 분', value: 17 },
    { key: '18', text: '18 분', value: 18 },
    { key: '19', text: '19 분', value: 19 },
    { key: '20', text: '20 분', value: 20 },
    { key: '21', text: '21 분', value: 21 },
    { key: '22', text: '22 분', value: 22 },
    { key: '23', text: '23 분', value: 23 },
    { key: '24', text: '24 분', value: 24 },
    { key: '25', text: '25 분', value: 25 },
    { key: '26', text: '26 분', value: 26 },
    { key: '27', text: '27 분', value: 27 },
    { key: '28', text: '28 분', value: 28 },
    { key: '29', text: '29 분', value: 29 },
    { key: '30', text: '30 분', value: 30 },
    { key: '31', text: '31 분', value: 31 },
    { key: '32', text: '32 분', value: 32 },
    { key: '33', text: '33 분', value: 33 },
    { key: '34', text: '34 분', value: 34 },
    { key: '35', text: '35 분', value: 35 },
    { key: '36', text: '36 분', value: 36 },
    { key: '37', text: '37 분', value: 37 },
    { key: '38', text: '38 분', value: 38 },
    { key: '39', text: '39 분', value: 39 },
    { key: '40', text: '40 분', value: 40 },
    { key: '41', text: '41 분', value: 41 },
    { key: '42', text: '42 분', value: 42 },
    { key: '43', text: '43 분', value: 43 },
    { key: '44', text: '44 분', value: 44 },
    { key: '45', text: '45 분', value: 45 },
    { key: '46', text: '46 분', value: 46 },
    { key: '47', text: '47 분', value: 47 },
    { key: '48', text: '48 분', value: 48 },
    { key: '49', text: '49 분', value: 49 },
    { key: '50', text: '50 분', value: 50 },
    { key: '51', text: '51 분', value: 51 },
    { key: '52', text: '52 분', value: 52 },
    { key: '53', text: '53 분', value: 53 },
    { key: '54', text: '54 분', value: 54 },
    { key: '55', text: '55 분', value: 55 },
    { key: '56', text: '56 분', value: 56 },
    { key: '57', text: '57 분', value: 57 },
    { key: '58', text: '58 분', value: 58 },
    { key: '59', text: '59 분', value: 59 },
  ],

  // Quill.js
  formats: [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ],

  modules: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },

  categoryA: [
    { key: '1', text: 'College 정보1', value: 'college 정보1' },
    { key: '2', text: 'College 정보2', value: 'college 정보2' },
  ],

  categoryB: [
    {
      key: '1',
      text: '1Depth Select 선택된 정보에 따른 Channel 정보1',
      value: '1Depth Select 선택된 정보에 따른 Channel 정보1',
    },
    {
      key: '2',
      text: '1Depth Select 선택된 정보에 따른 Channel 정보2',
      value: '1Depth Select 선택된 정보에 따른 Channel 정보2',
    },
  ],

  status: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: '임시저장', value: 'Created' },
    { key: '2', text: '승인요청', value: 'OpenApproval' },
    { key: '3', text: '승인', value: 'Opened' },
    { key: '4', text: '폐강', value: 'Closed' },
    { key: '5', text: '반려', value: 'Rejected' },
  ],

  statusForApprovalContents: [
    { key: '0', text: '전체', value: '전체' },
    { key: '2', text: '승인요청', value: 'OpenApproval' },
    { key: '3', text: '승인', value: 'Opened' },
    { key: '5', text: '반려', value: 'Rejected' },
  ],

  openType: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: 'Yes', value: 'SearchOn' },
    { key: '2', text: 'No', value: 'SearchOff' },
  ],

  searchPartForCube: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: '과정명', value: '과정명' },
    { key: '2', text: '생성자', value: '생성자' },
  ],

  kindOfVideo: [
    { key: '1', text: '내부 영상', value: 'InternalMedia' },
    { key: '2', text: '외부 영상', value: 'LinkMedia' },
    { key: '3', text: 'cp사 영상', value: 'ContentsProviderMedia' },
  ],

  kindOfAudio: [
    { key: '1', text: '내부 오디오', value: 'InternalMedia' },
    { key: '2', text: '외부 오디오', value: 'LinkMedia' },
    { key: '3', text: 'cp사 오디오', value: 'ContentsProviderMedia' },
  ],

  learningMaterials: [
    { key: '1', text: '파일첨부', value: '파일첨부' },
    { key: '2', text: '외부 오디오 링크', value: '외부 오디오 링크' },
  ],

  ContentsProviderType: [
    { key: '1', text: 'linkedin', value: 'linkedin' },
    { key: '2', text: 'DataCamp', value: 'DataCamp' },
    { key: '3', text: 'HuNet', value: 'HuNet' },
  ],

  // courseStudent
  stampAcquired: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: 'Y', value: true },
    { key: '3', text: 'N', value: false },
  ],

  courseCompleted: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: '이수', value: 'Passed' },
    { key: '3', text: '미이수', value: 'Missed' },
  ],

  // student
  learnerType: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: '승인대기', value: 'Submitted' },
    { key: '3', text: '승인', value: 'Approved' },
    { key: '4', text: '승인(학습중)', value: 'ApprovedAndProgress' },
    { key: '5', text: '반려', value: 'Rejected' },
    { key: '6', text: '취소', value: 'Canceled' },
  ],

  searchPartForLearner: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: '소속사', value: '소속사' },
    { key: '3', text: '소속 조직(팀)', value: '소속조직' },
    { key: '4', text: '성명', value: '성명' },
    { key: '5', text: 'E-mail', value: 'Email' },
  ],

  countRound: [
    { key: '1', text: '1차수', value: '1차수' },
    { key: '2', text: '2차수', value: '2차수' },
  ],

  // result management
  scoringState: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: '채점하기', value: 'Waiting' },
    { key: '3', text: '결과보기', value: 'Scoring' },
    { key: '3', text: '미응시', value: 'Missing' },
  ],

  nullState: [{ key: '1', text: '전체', value: '전체' }],

  testFrequency: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: '0', value: '0' },
    { key: '3', text: '1', value: '1' },
    { key: '4', text: '2', value: '2' },
    { key: '5', text: '3', value: '3' },
  ],

  testFrequencyForNone: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: '0', value: '0' },
  ],

  completionState: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: '결과처리 대기', value: 'Waiting' },
    { key: '3', text: '이수', value: 'Passed' },
    { key: '4', text: '미이수', value: 'Missed' },
    { key: '5', text: '불참', value: 'NoShow' },
  ],

  searchPartForResultManagement: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: '소속사', value: '소속사' },
    { key: '3', text: '소속 조직(팀)', value: '소속 조직(팀)' },
    { key: '4', text: '성명', value: '성명' },
    { key: '5', text: 'E-mail', value: 'E-mail' },
  ],

  // Support-Board

  searchWordForBoard: [
    { key: '1', text: '전체', value: '전체' },
    { key: '2', text: '제목', value: '제목' },
    { key: '3', text: '작성자', value: '작성자' },
  ],

  answerStatus: [
    { key: '1', text: '전체', value: 'All' },
    { key: '2', text: '답변대기', value: false },
    { key: '3', text: '답변완료', value: true },
  ],

  noticeType: [
    { key: '1', text: '전체', value: 'All' },
    { key: '2', text: '주요', value: 'true' },
    { key: '3', text: '일반', value: 'false' },
  ],

  noticeTypeForCreateNotice: [
    { key: '1', text: '주요', value: true },
    { key: '2', text: '일반', value: false },
  ],

  openStateType: [
    { key: '1', text: 'Created', value: '작성' },
    { key: '2', text: 'Opened', value: '게시' },
    { key: '3', text: 'Closed', value: '게시취소' },
  ],

  modulesForCreateNotice: {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },

  sectionsForCreateFaq: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'service', content: '서비스 관리', link: true },
    { key: 'faq', content: 'FAQ 관리', active: true },
  ],

  leftHandSideExpressionBar: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'service', content: '서비스 관리', link: true },
    { key: 'notice', content: '공지사항 관리', active: true },
  ],

  pathForNotice: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Support', content: '서비스 관리', link: true },
    { key: 'Notice', content: '공지사항 관리', active: true },
  ],

  pathForFaq: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Support', content: '서비스 관리', link: true },
    { key: 'Faq', content: 'FAQ 관리', active: true },
  ],

  sectionForCreateNotice: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'service', content: '서비스 관리', link: true },
    { key: 'notice', content: '공지사항 관리', active: true },
  ],

  pathForCategory: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Support', content: '서비스 관리', link: true },
    { key: 'Category', content: '카테고리 관리', active: true },
  ],
  pathForQna: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Support', content: '서비스 관리', link: true },
    { key: 'Qna', content: 'Q&A 관리', active: true },
  ],
  pathForChannel: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Support', content: '서비스 관리', link: true },
    { key: 'Channel', content: 'Channel 관리', active: true },
  ],

  searchPartForFaq: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: '제목', value: '제목' },
    { key: '2', text: '작성자', value: '작성자' },
  ],

  // course
  stampForSearch: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: 'Yes', value: 'YES' },
    { key: '2', text: 'No', value: 'NO' },
  ],

  stamp: [
    { key: '0', text: 'Yes', value: true },
    { key: '1', text: 'No', value: false },
  ],

  //profile
  sectionProfiles: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Profile', content: '회원 관리', link: true },
    { key: 'Instructor', content: '강사 관리', active: true },
    { key: 'SkProfile', content: '구성원 관리', active: true },
  ],

  pisAgreement: [
    { key: '1', text: '전체', value: '' },
    { key: '2', text: 'YES', value: 'Y' },
    { key: '3', text: 'NO', value: 'N' },
  ],

  // instructor
  instructorInternalDivision: [
    { key: '0', text: '전체', value: '*' },
    { key: '1', text: '사내', value: 'true' },
    { key: '2', text: '사외', value: 'false' },
  ],

  bannerLinkType: [
    { key: 0, text: 'Select', value: '' },
    { key: 1, text: 'Self', value: '_self' },
    { key: 2, text: 'Blank', value: '_blank' },
    /*{ key: 3, text: 'Popup', value: 'popup' },*/
    { key: 4, text: '동영상', value: 'video' },
  ],

  // 선수코스 타입
  PrecedenceCourseType: [
    { key: '1', text: '필수', value: 'Mandatory' },
    { key: '2', text: '선택', value: 'Optional' },
  ],

  bannerState: [
    { key: 0, text: '임시저장', value: 'Created' },
    { key: 1, text: '바로적용', value: 'Opened' },
    { key: 2, text: '예약적용', value: 'Waiting' },
  ],

  bannerSearchState: [
    { key: 0, text: 'All', value: 'All' },
    { key: 1, text: '게시중', value: 'Opened' },
    { key: 2, text: '예약게시', value: 'Waiting' },
    { key: 3, text: '임시저장', value: 'Created' },
    { key: 4, text: '게시종료', value: 'Closed' },
  ],

  // badge
  badgeCertiAdminCategory: [
    { key: '1', value: 'mySUNI', text: 'mySUNI' },
    { key: '2', value: 'Subsidiary', text: '관계사' },
    { key: '3', value: 'Third', text: '3rd PP' },
  ],

  badgeCategory: [
    { key: '1', text: '분야1', value: 'category1' },
    { key: '2', text: '분야2', value: 'category2' },
    { key: '3', text: '분야3', value: 'category3' },
    { key: '4', text: '분야4', value: 'category4' },
  ],

  badgeType: [
    { key: '1', text: 'Knowledge', value: 'Knowledge' },
    { key: '2', text: 'Experience', value: 'Experience' },
    { key: '3', text: '융합', value: 'Convergence' },
  ],

  badgeDesignAdminType: [
    { key: '1', text: 'College', value: 'College' },
    { key: '2', text: '관계사', value: 'Subsidiary' },
  ],

  badgeDifficulty: [
    { key: '1', text: 'Level1', value: 'Level1' },
    { key: '2', text: 'Level2', value: 'Level2' },
    { key: '3', text: 'Level3', value: 'Level3' },
  ],

  badgeIssueType: [
    { key: '1', text: '자동', value: 'Yes' },
    { key: '2', text: '수동', value: 'No' },
  ],

  badgeAdditionTermsType: [
    { key: '1', text: 'Yes', value: 'Yes' },
    { key: '2', text: 'No', value: 'No' },
  ],

  badgeState: [
    { key: '1', text: '승인', value: 'Opened' },
    { key: '2', text: '승인대기', value: 'OpenApproval' },
    { key: '3', text: '반려', value: 'Rejected' },
  ],

  searchPartForBadge: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: 'Badge명', value: 'Badge명' },
    { key: '2', text: '생성자', value: '생성자' },
  ],

  badgeStudentIssued: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: 'Yes', value: 'Yes' },
  ],

  searchPartForBadgeApprover: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: '성명', value: '성명' },
    { key: '2', text: 'Email', value: 'Email' },
  ],

  // arrange
  arrangeSections: [
    { key: 'Home', content: 'HOME', link: true },
    { key: 'Display', content: '전시 관리', link: true },
    { key: 'DisplayState', content: 'Main 전시 관리', active: true },
    { key: 'DisplayArrangeProc', content: 'Main 과정 관리', active: true },
  ],

  arrangeOpenStateType: [
    { key: '0', value: 'All', text: '전체' },
    { key: '1', value: 'Opened', text: '게시중' },
    { key: '2', value: 'Reservation', text: '예약게시' },
    { key: '3', value: 'Created', text: '임시 저장' },
    { key: '4', value: 'Closed', text: '게시종료' },
  ],

  arrangeType: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', value: 'RQD', text: '권장 과정' },
    { key: '2', value: 'NEW', text: '신규 과정' },
    { key: '3', value: 'POP', text: '인기 과정' },
  ],

  searchPartFoArrange: [
    { key: '0', text: '전체', value: '전체' },
    { key: '1', text: '과정명', value: '과정명' },
    { key: '2', text: '생성자', value: '생성자' },
  ],

  dateOptions: [
    { key: '1', text: 'All', value: 'All' },
    { key: '2', text: '노출기간', value: 'dateOption01' },
    { key: '3', text: '최종 수정 일자', value: 'dateOption02' },
  ],

  arrangeSelect: [
    { key: '1', value: 'RQD', text: '권장과정' },
    { key: '2', value: 'POP', text: '인기과정' },
    { key: '3', value: 'NEW', text: '신규과정' },
  ],

  arrangeNameShow: [
    /*{ key: '0', text: 'Select', value: '' },*/
    { key: '1', text: 'YES', value: 'Yes' },
    { key: '2', text: 'NO', value: 'No' },
  ],
};
