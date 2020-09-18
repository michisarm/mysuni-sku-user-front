import MyLearningContentType from './MyLearningContentType';

const TableHeaderInfo = {
  /*
    InProgress = '학습중',
    InMyList = '관심목록',
    Enrolled = '권장과정',
    Required = '학습예정',
    Completed = 'mySUNI 학습완료',
    PersonalCompleted = '개인 학습완료',
    Retry = '취소/미이수',
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

  getByContentType: (
    contentType: MyLearningContentType
  ): { key: number; text: string; icon?: boolean }[] => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
        return TableHeaderInfo.InProgress;
      case MyLearningContentType.InMyList:
        return TableHeaderInfo.InMyList;
      case MyLearningContentType.Required:
        return TableHeaderInfo.Required;
      case MyLearningContentType.Enrolled:
        return TableHeaderInfo.Enrolled;
      case MyLearningContentType.Completed:
        return TableHeaderInfo.Completed;
      case MyLearningContentType.PersonalCompleted:
        return TableHeaderInfo.PersonalCompleted;
      case MyLearningContentType.Retry:
        return TableHeaderInfo.Retry;
      default:
        return [{ key: 0, text: '' }];
    }
  },
};

export default TableHeaderInfo;
