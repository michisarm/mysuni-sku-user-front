enum MyLearningContentType {
  InProgress = 'InProgress',                    // 학습중 
  InMyList = 'InMyList',                        // 관심목록
  Enrolled = 'Enrolled',                        // 학습예정
  Required = 'Required',                        // 권장과정
  Completed = 'Completed',                      // 학습완료('mySUNI 학습완료' 로 변경 예정)
  PersonalCompleted = 'PersonalCompleted',      // 개인학습 완료(새롭게 추가되는 타입)
  Retry = 'Retry',                              // 취소/미이수
}

export default MyLearningContentType;
