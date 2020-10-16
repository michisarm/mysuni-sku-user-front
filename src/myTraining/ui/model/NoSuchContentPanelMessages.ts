import { MyContentType } from '../logic/MyLearningListContainerV2';


const NoSuchContentPanelMessages = {
  InProgress: '학습중인 과정이 없습니다.',
  InMyList: '관심목록에 추가한 학습 과정이 없습니다.',
  Required: '권장과정에 해당하는 학습 과정이 없습니다.',
  Enrolled: '학습예정중인 과정이 없습니다.',
  Completed: 'mySUNI 학습완료에 해당하는 학습 과정이 없습니다.',
  PersonalCompleted: '승인된 개인학습 정보가 없습니다.',
  Retry: '취소/미이수에 해당하는 학습 과정이 없습니다.',
  EarnedBadgeList: `획득한 Badge가 없습니다.
  등록된 Badge 리스트에서 원하는 Badge에 도전해보세요.`,
  EarnedStampList: '획득한 스탬프가 없습니다.',
  getMessageByConentType: (contentType: MyContentType): string => {
    return NoSuchContentPanelMessages[contentType];
  }
};

export default NoSuchContentPanelMessages;