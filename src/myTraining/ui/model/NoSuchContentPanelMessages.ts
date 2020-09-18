import MyLearningContentType from './MyLearningContentType';

const NoSuchContentPanelMessages = {
  InProgress: '학습중인 과정이 없습니다.',
  InMyList: '관심목록에 추가한 학습 과정이 없습니다.',
  Required: '권장과정에 해당하는 학습 과정이 없습니다.',
  Enrolled: '학습예정중인 과정이 없습니다.',
  Completed: 'mySUNI 학습완료에 해당하는 학습 과정이 없습니다.',
  PersonalCompleted: '승인된 개인학습 정보가 없습니다.',
  Retry: '취소/미이수에 해당하는 학습 과정이 없습니다.',
  getByContentType: (contentType: MyLearningContentType): string => {
    return NoSuchContentPanelMessages[contentType];
  }
};

export default NoSuchContentPanelMessages;