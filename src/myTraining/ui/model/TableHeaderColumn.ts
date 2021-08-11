import { MyApprovalContentType } from './MyApprovalContentType';
import { MyLearningContentType } from './MyLearningContentType';
import { MyPageContentType } from './MyPageContentType';
import { MyContentType } from './MyContentType';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';

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
    { key: 0, text: getPolyglotText('No', 'learning-학보드-hdno') },
    { key: 1, text: getPolyglotText('College', 'learning-학보드-hdcl') },
    { key: 2, text: getPolyglotText('과정명', 'learning-학보드-hd과정') },
    { key: 3, text: getPolyglotText('학습유형', 'learning-학보드-hd학유') },
    { key: 4, text: getPolyglotText('Level', 'learning-학보드-hdl') },
    {
      key: 5,
      text: getPolyglotText('학습시간', 'learning-학보드-hdhr'),
      icon: true,
    },
    {
      key: 6,
      text: getPolyglotText('최근학습일', 'learning-학보드-hddt'),
      icon: true,
    },
    { key: 7, text: getPolyglotText('진행률', 'learning-학보드-hd진행') },
  ],

  InMyList: [
    { key: 0, text: getPolyglotText('No', 'learning-관심목록-hdno') },
    { key: 1, text: getPolyglotText('College', 'learning-관심목록-hdcl') },
    { key: 2, text: getPolyglotText('과정명', 'learning-관심목록-hd과정') },
    { key: 3, text: getPolyglotText('학습유형', 'learning-관심목록-hd학유') },
    { key: 4, text: getPolyglotText('Level', 'learning-관심목록-hdl') },
    {
      key: 5,
      text: getPolyglotText('학습시간', 'learning-관심목록-hdhr'),
      icon: true,
    },
    {
      key: 6,
      text: getPolyglotText('최근학습일', 'learning-관심목록-hdlhr'),
      icon: true,
    },
    { key: 7, text: getPolyglotText('진행률', 'learning-관심목록-hstp') },
    { key: 8, text: getPolyglotText('학습상태', 'learning-관심목록-hrdt') },
  ],
  Required: [
    { key: 0, text: getPolyglotText('No', 'learning-권장과정-hdno') },
    { key: 1, text: getPolyglotText('College', 'learning-권장과정-hdcl') },
    { key: 2, text: getPolyglotText('과정명', 'learning-권장과정-hd과정') },
    { key: 3, text: getPolyglotText('학습유형', 'learning-권장과정-hd학유') },
    { key: 4, text: getPolyglotText('Level', 'learning-권장과정-hdl') },
    {
      key: 5,
      text: getPolyglotText('학습시간', 'learning-권장과정-hdhr'),
      icon: true,
    },
    {
      key: 6,
      text: getPolyglotText('최근학습일', 'learning-권장과정-hdlhr'),
      icon: true,
    },
    { key: 7, text: getPolyglotText('진행률', 'learning-권장과정-hstp') },
    { key: 8, text: getPolyglotText('학습상태', 'learning-권장과정-hrdt') },
  ],
  Enrolled: [
    { key: 0, text: getPolyglotText('No', 'learning-학습예정-hdno') },
    { key: 1, text: getPolyglotText('College', 'learning-학습예정-hdcl') },
    { key: 2, text: getPolyglotText('과정명', 'learning-학습예정-hd과정') },
    { key: 3, text: getPolyglotText('학습유형', 'learning-학습예정-hd학유') },
    { key: 4, text: getPolyglotText('Level', 'learning-학습예정-hdl') },
    {
      key: 5,
      text: getPolyglotText('학습시간', 'learning-학습예정-hdhr'),
      icon: true,
    },
    {
      key: 6,
      text: getPolyglotText('스탬프', 'learning-학습예정-hstp'),
      icon: true,
    },
    {
      key: 7,
      text: getPolyglotText('학습시작일', 'learning-학습예정-h시작'),
      icon: true,
    },
  ],
  Completed: [
    { key: 0, text: getPolyglotText('No', 'learning-학완보드-hdno') },
    { key: 1, text: getPolyglotText('College', 'learning-학완보드-hdcl') },
    { key: 2, text: getPolyglotText('과정명', 'learning-학완보드-hd과정') },
    { key: 3, text: getPolyglotText('학습유형', 'learning-학완보드-hd학유') },
    { key: 4, text: getPolyglotText('Level', 'learning-학완보드-hdl') },
    {
      key: 5,
      text: getPolyglotText('학습시간', 'learning-학완보드-hdhr'),
      icon: true,
    },
    {
      key: 6,
      text: getPolyglotText('학습완료일', 'learning-학완보드-h완료'),
      icon: true,
    },
  ],
  PersonalCompleted: [
    { key: 0, text: getPolyglotText('No', 'learning-개인학습-hdno') },
    { key: 1, text: getPolyglotText('교육명', 'learning-개인학습-h교육명') },
    { key: 2, text: getPolyglotText('Channel', 'learning-개인학습-h채널') },
    { key: 3, text: getPolyglotText('교육시간', 'learning-개인학습-h시간') },
    { key: 4, text: getPolyglotText('승인자', 'learning-개인학습-h승인') },
    {
      key: 5,
      text: getPolyglotText('승인자 E-mail', 'learning-개인학습-h이메일'),
    },
    { key: 6, text: getPolyglotText('승인상태', 'learning-개인학습-h상태') },
    { key: 7, text: getPolyglotText('승인일자', 'learning-개인학습-hcfd') },
  ],
  Retry: [
    { key: 0, text: getPolyglotText('No', 'learning-취소미이수-취소no') },
    { key: 1, text: getPolyglotText('College', 'learning-취소미이수-취소cl') },
    { key: 2, text: getPolyglotText('과정명', 'learning-취소미이수-취소과정') },
    {
      key: 3,
      text: getPolyglotText('학습유형', 'learning-취소미이수-취소유형'),
    },
    { key: 4, text: getPolyglotText('Level', 'learning-취소미이수-취소레벨') },
    {
      key: 5,
      text: getPolyglotText('학습시간', 'learning-취소미이수-취소시간'),
      icon: true,
    },
    {
      key: 6,
      text: getPolyglotText('스탬프', 'learning-취소미이수-취소st'),
      icon: true,
    },
    {
      key: 7,
      text: getPolyglotText('취소/미이수일', 'learning-취소미이수-취소dt'),
      icon: true,
    },
  ],
  EarnedStampCount: [
    { key: 0, text: getPolyglotText('No', 'mapg-msmp-헤더1') },
    { key: 1, text: getPolyglotText('College', 'mapg-msmp-헤더2') },
    { key: 2, text: getPolyglotText('과정명', 'mapg-msmp-헤더3') },
    // { key: 3, text: getPolyglotText('스탬프', 'mapg-msmp-헤더4'), icon: true },
    {
      key: 3,
      text: getPolyglotText('획득일자', 'mapg-msmp-헤더5'),
      icon: true,
    },
    // 스탬프 인증서 보기
    // { key: 4, text: '수료증'},
  ],
  PersonalLearning: [
    { key: 0, text: getPolyglotText('No', '승인관리-개인학습-헤더1') },
    { key: 1, text: getPolyglotText('교육명', '승인관리-개인학습-헤더2') },
    { key: 2, text: getPolyglotText('Channel', '승인관리-개인학습-헤더3') },
    { key: 3, text: getPolyglotText('교육시간', '승인관리-개인학습-헤더4') },
    { key: 4, text: getPolyglotText('등록일자', '승인관리-개인학습-헤더5') },
    { key: 5, text: getPolyglotText('생성자', '승인관리-개인학습-헤더6') },
    {
      key: 6,
      text: getPolyglotText('생성자 E-mail', '승인관리-개인학습-헤더7'),
    },
    { key: 7, text: getPolyglotText('상태', '승인관리-개인학습-헤더8') },
    { key: 8, text: getPolyglotText('승인일자', '승인관리-개인학습-헤더9') },
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
