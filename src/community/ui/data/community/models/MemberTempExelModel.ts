export interface MemberTempExcelModel {
  Name: string; //성명 = LearningCompleteProcModel.name
  Email: string; //e-mail = LearningCompleteProcModel.email
  Course: string; //강의명(학습카드명) = LearningCompleteProcModel.cardName
  'Percent Completed': number; //학습진행율(100 %만 학습완료 대상임)
  'Completed (PST/PDT)': string; //학습완료시간 = LearningCompleteProcModel.completedTime
  Company: string; //소속사
  Team: string; //소속 조직(팀)
  NickName: string; //닉네임
  GroupMemberId: string; //groupMemberId
}
