import { MemberTempExcelModel } from './MemberTempExelModel';

export interface MemberTempCdoModel {
  name: string;
  email: string;
  cardName: string;
  completedTime: number;
  result: string;
  company: string;
  team: string;
  nickName: string;
  groupMemberId: string;
}

export function initMemberttmpCdoModel() {
  return {
    name: '', //성명
    email: '', //e-mail
    cardName: '', //강의명(학습카드명)
    completedTime: 0, //학습완료시간
    result: 'Fail', //학습처리상태(Fail, Success)
    company: '', //소속사
    team: '', //소속 조직(팀)
    nickName: '', //닉네임
    groupMemberId: '', //groupMemberId
  };
}

export function getMemberTempCdoModel(
  memberTempExcel: MemberTempExcelModel
): MemberTempCdoModel {
  const learningCompleteTimeStr: string =
    memberTempExcel['Completed (PST/PDT)'];

  let learningCompleteDate: Date =
    parseLearningCompleteDate(learningCompleteTimeStr) || new Date();

  return {
    name: memberTempExcel.Name,
    email: memberTempExcel.Email,
    completedTime: learningCompleteDate.getTime() || 0,
    company: memberTempExcel.Company,
    team: memberTempExcel.Team,
    nickName: memberTempExcel.NickName,
    result: '',
    cardName: memberTempExcel.Course,
    groupMemberId: memberTempExcel.GroupMemberId,
  };
}

function parseLearningCompleteDate(learningCompleteTimeStr: string) {
  if (learningCompleteTimeStr) {
    const matchTokenArray = learningCompleteTimeStr.match(
      '(\\d{1,})/(\\d{1,})/(\\d{2})\\s*,\\s+(\\d{1,}):(\\d{1,})\\s+(AM|PM)'
    );

    //1/28/20, 6:30 PM
    if (matchTokenArray && matchTokenArray.length > 0) {
      const yyStr: string = matchTokenArray![3] || '';
      const mmStr: string = matchTokenArray![1] || '';
      const ddStr: string = matchTokenArray![2] || '';
      const amPmStr: string = matchTokenArray![6] || '';
      const hoursStr: string = matchTokenArray![4] || '';
      const minutesStr: string = matchTokenArray![5] || '';
      const yy: number = Number(yyStr);
      const yyyy: number = 2000 + yy; //4자리로 보정
      let mm: number = Number(mmStr);
      const dd: number = Number(ddStr);
      let hours: number = Number(hoursStr);
      const minutes: number = Number(minutesStr);

      if (mm !== 0) {
        mm -= 1;
      }

      if (amPmStr === 'PM' && hours < 12) {
        hours += 12;
      } else if (amPmStr === 'AM' && hours === 12) {
        hours -= 12;
      }

      return new Date(yyyy, mm, dd, hours, minutes);
    }
  }
}
