
enum ChallengeStateName {
  WaitForChallenge= '도전하기',
  Challenging= '도전취소',  // 도전중인 경우 도전취소 버튼 노출
  ReadyForRequest= '발급요청',
  Requested= '발급 요청중',
  Issued= '획득완료',
}

export default ChallengeStateName;
