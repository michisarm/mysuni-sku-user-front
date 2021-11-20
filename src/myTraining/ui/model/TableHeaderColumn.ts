import { MyApprovalContentType } from './MyApprovalContentType';
import { MyLearningContentType } from './MyLearningContentType';
import { MyPageContentType } from './MyPageContentType';
import { MyContentType } from './MyContentType';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';

//const course = getPolyglotText('과정명', 'learning-학보드-hd과정');

export function inProgressPolyglot(s: string) {
  if (s === '과정명') {
    return getPolyglotText('과정명', 'learning-학보드-hd과정');
  } else if (s === '학습유형') {
    return getPolyglotText('학습유형', 'learning-학보드-hd학유');
  } else if (s === '학습시간') {
    return getPolyglotText('학습시간', 'learning-학보드-hdhr');
  } else if (s === '최근학습일') {
    return getPolyglotText('최근학습일', 'learning-학보드-hddt');
  } else if (s === '진행률') {
    return getPolyglotText('진행률', 'learning-학보드-hd진행');
  } else if (s === '스탬프') {
    return getPolyglotText('스탬프', 'learning-학습예정-hstp');
  } else if (s === '획득일자') {
    return getPolyglotText('획득일자', 'mapg-msmp-헤더5');
  } else if (s === '학습상태') {
    return getPolyglotText('학습상태', 'learning-관심목록-hrdt');
  } else if (s === '승인자') {
    return getPolyglotText('승인자', 'learning-개인학습-h승인');
  } else if (s === '학습완료일') {
    return getPolyglotText('학습완료일', 'learning-학완보드-h완료');
  } else if (s === '학습예정일') {
    // todo 김민준 번역 추가 및 아이디 변경
    return getPolyglotText('학습예정일', 'learning-학보드-hd학예');
  } else if (s === '생성자 E-mail') {
    return getPolyglotText('생성자 E-mail', '승인관리-개인학습-헤더7');
  } else if (s === '상태') {
    return getPolyglotText('상태', '승인관리-개인학습-헤더8');
  } else if (s === '승인일자') {
    return getPolyglotText('승인일자', '승인관리-개인학습-헤더9');
  } else if (s === '교육시간') {
    return getPolyglotText('교육시간', 'learning-개인학습-h시간');
  } else if (s === '생성자') {
    return getPolyglotText('생성자', '승인관리-개인학습-헤더6');
  } else if (s === '교육명') {
    return getPolyglotText('교육명', '승인관리-개인학습-헤더2');
  } else if (s === '승인상태') {
    return getPolyglotText('승인상태', 'learning-개인학습-h상태');
  } else if (s === '등록일자') {
    return getPolyglotText('등록일자', '승인관리-개인학습-헤더5');
  } else if (s === '취소/미수일') {
    return getPolyglotText('취소/미이수일', 'learning-취소미이수-취소dt');
  } else if (s === '승인자 E-mail') {
    return getPolyglotText('승인자 E-mail', 'learning-개인학습-h이메일');
  } else if (s === '차수') {
    return getPolyglotText('차수', 'learning-학습예정-hdround');
  } else {
    return s;
  }
}

const TableHeaderColumn = {
  /*
    InProgress = '학습중',
    InMyList = '관심목록',
    Enrolled = '권장과정',
    Required = '학습예정',
    Completed = 'mySUNI 학습완료',
    PersonalCompleted = '개인 학습완료',
    Retry = '취소/미이수',
    EarnedStampCount = 'My Stamp'
  */
  InProgress: [
    { key: 0, text: 'No' },
    { key: 1, text: 'Collage' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    {
      key: 5,
      text: '학습시간',
      icon: true,
    },
    {
      key: 6,
      text: '최근학습일',
      icon: true,
    },
    { key: 7, text: '진행률' },
  ],

  InMyList: [
    { key: 0, text: 'No' },
    { key: 1, text: 'Collage' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    {
      key: 5,
      text: '학습시간',
      icon: true,
    },
    {
      key: 6,
      text: '최근학습일',
      icon: true,
    },
    { key: 7, text: '진행률' },
    { key: 8, text: '학습상태' },
  ],
  Required: [
    { key: 0, text: 'No' },
    { key: 1, text: 'Collage' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    {
      key: 5,
      text: '학습시간',
      icon: true,
    },
    {
      key: 6,
      text: '최근학습일',
      icon: true,
    },
    { key: 7, text: '진행률' },
    { key: 8, text: '학습상태' },
  ],
  Enrolled: [
    { key: 0, text: 'No' },
    { key: 1, text: 'Collage' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: '차수' },
    { key: 5, text: 'Level' },
    {
      key: 6,
      text: '학습시간',
      icon: true,
    },
    // {
    //   key: 7,
    //   text: '스탬프',
    //   icon: true,
    // },
    {
      key: 7,
      text: '학습예정일',
      icon: true,
    },
  ],
  Completed: [
    { key: 0, text: 'No' },
    { key: 1, text: 'Collage' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    {
      key: 5,
      text: '학습시간',
      icon: true,
    },
    {
      key: 6,
      text: '학습완료일',
      icon: true,
    },
  ],
  PersonalCompleted: [
    { key: 0, text: 'No' },
    { key: 1, text: '교육명' },
    { key: 2, text: 'Channel' },
    { key: 3, text: '교육시간' },
    { key: 4, text: '승인자' },
    {
      key: 5,
      text: '승인자 E-mail',
    },
    { key: 6, text: '승인상태' },
    { key: 7, text: '승인일자' },
  ],
  Retry: [
    { key: 0, text: 'No' },
    { key: 1, text: 'Collage' },
    { key: 2, text: '과정명' },
    {
      key: 3,
      text: '학습유형',
    },
    { key: 4, text: 'Level' },
    {
      key: 5,
      text: '학습시간',
      icon: true,
    },
    {
      key: 6,
      text: '스탬프',
      icon: true,
    },
    {
      key: 7,
      text: '취소/미수일',
      icon: true,
    },
  ],
  EarnedStampCount: [
    { key: 0, text: 'No' },
    { key: 1, text: 'Collage' },
    { key: 2, text: '과정명' },
    // { key: 3, text: getPolyglotText('스탬프', 'mapg-msmp-헤더4'), icon: true },
    {
      key: 3,
      text: '획득일자',
      icon: true,
    },
    // 스탬프 인증서 보기
    // { key: 4, text: '수료증'},
  ],
  PersonalLearning: [
    { key: 0, text: 'No' },
    { key: 1, text: '교육명' },
    { key: 2, text: 'Channel' },
    { key: 3, text: '교육시간' },
    { key: 4, text: '등록일자' },
    { key: 5, text: '생성자' },
    {
      key: 6,
      text: '생성자 e-mail',
    },
    { key: 7, text: '상태' },
    { key: 8, text: '승인일자' },
  ],
  getColumnsByContentType: (
    contentType: MyContentType
  ): { key: number; text: string; icon?: boolean }[] => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return TableHeaderColumn.InProgress;
      case MyLearningContentType.InMyList:
        return TableHeaderColumn.InMyList;
      case MyLearningContentType.Required:
        return TableHeaderColumn.Required;
      case MyLearningContentType.Enrolled:
        return TableHeaderColumn.Enrolled;
      case MyLearningContentType.Completed:
        return TableHeaderColumn.Completed;
      case MyLearningContentType.PersonalCompleted:
        return TableHeaderColumn.PersonalCompleted;
      case MyLearningContentType.Retry:
        return TableHeaderColumn.Retry;
      case MyPageContentType.EarnedStampList:
        return TableHeaderColumn.EarnedStampCount;
      case MyApprovalContentType.PersonalLearning:
        return TableHeaderColumn.PersonalLearning;
      default:
        return [{ key: 0, text: '' }];
    }
  },
};

export default TableHeaderColumn;
