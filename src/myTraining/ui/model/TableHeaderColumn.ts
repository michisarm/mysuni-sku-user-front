import { MyContentType } from '../logic/MyLearningListContainerV2';
import MyApprovalContentType from './MyApprovalContentType';
import MyLearningContentType from './MyLearningContentType';
import MyPageContentType from './MyPageContentType';

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
    { key: 1, text: 'College' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    { key: 5, text: '진행률' },
    { key: 6, text: '학습시간', icon: true },
    { key: 7, text: '학습시작일', icon: true },
  ],

  InMyList: [
    { key: 0, text: 'No' },
    { key: 1, text: 'College' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    { key: 5, text: '학습시간', icon: true },
    { key: 6, text: '스탬프', icon: true },
    { key: 7, text: '등록일', icon: true },
  ],
  Required: [
    { key: 0, text: 'No' },
    { key: 1, text: 'College' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    { key: 5, text: '학습시간', icon: true },
    { key: 6, text: '스탬프', icon: true },
    { key: 7, text: '등록일', icon: true },
  ],
  Enrolled: [
    { key: 0, text: 'No' },
    { key: 1, text: 'College' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    { key: 5, text: '학습시간', icon: true },
    { key: 6, text: '스탬프', icon: true },
    { key: 7, text: '학습시작일', icon: true },
  ],
  Completed: [
    { key: 0, text: 'No' },
    { key: 1, text: 'College' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    { key: 5, text: '학습시간', icon: true },
    { key: 6, text: '학습완료일', icon: true },
  ],
  PersonalCompleted: [
    { key: 0, text: 'No' },
    { key: 1, text: '교육명' },
    { key: 2, text: 'Channel' },
    { key: 3, text: '교육시간' },
    { key: 4, text: '승인자' },
    { key: 5, text: '승인자 E-mail' },
    { key: 6, text: '승인일자' },
  ],
  Retry: [
    { key: 0, text: 'No' },
    { key: 1, text: 'College' },
    { key: 2, text: '과정명' },
    { key: 3, text: '학습유형' },
    { key: 4, text: 'Level' },
    { key: 5, text: '학습시간', icon: true },
    { key: 6, text: '스탬프', icon: true },
    { key: 7, text: '취소/미일수일', icon: true },
  ],
  EarnedStampCount: [
    { key: 0, text: 'No' },
    { key: 1, text: 'College' },
    { key: 2, text: '과정명' },
    { key: 3, text: '스탬프', icon: true },
    { key: 4, text: '획득일자', icon: true }
  ],
  PersonalLearning: [
    { key: 0, text: 'No' },
    { key: 1, text: '교육명' },
    { key: 2, text: 'Channel' },
    { key: 3, text: '교육시간' },
    { key: 4, text: '등록일자' },
    { key: 5, text: '생성자' },
    { key: 6, text: '생성자 E-mail' },
    { key: 7, text: '상태' },
    { key: 8, text: '승인일자' }
  ],
  getColumnsByContentType: (contentType: MyContentType): { key: number; text: string; icon?: boolean }[] => {
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
