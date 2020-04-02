
enum StateNameType {
  WaitingForApproval = '승인대기',
  Waiting = '결과대기',
  Failed = '시험불합격',
  TestPassed = '시험합격',
  Enrolled = '학습예정',
  Joined = '가입완료',
  InProgress = '학습중',
  Completed = '학습완료',
  Missed = '미이수',
  Rejected = '반려됨',
  NoShow = '불참',
  TestWaiting= '채점중'
}

export default StateNameType;
