import { PatronKey } from '../../accent/models/PatronKey';

export interface MemberTempModel {
  id: string;
  name: string; //성명
  nickName: string; //닉네임
  email: string; //e-mail
  company: string; //소속사
  patronKey: PatronKey;
  result: string; //학습처리상태(Fail, Success)
  memberId: string; //memberId
  detail: string;
  team: string; //소속 조직(팀)
  registerTime: number; //멤버 등록 시간

  completedTime: number; //학습완료시간
  appliedTime: number; //학습완료처리 업데이트 시간
  entityVersion: number;
  cardName: string; //강의명(학습카드명)
  //detail: AppliedResult = AppliedResult.Blank;
}
