import { MyContentType } from './MyContentType';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function nosuchMessagesPolyglot(s: String) {
  if (s === 'Enrolled') {
    return getPolyglotText(
      '학습예정인 과정이 없습니다.',
      'learning-my-학습예정'
    );
  } else if (s === 'InProgress') {
    return getPolyglotText('학습중인 과정이 없습니다.', 'learning-my-학습중');
  } else if (s === 'InMyList') {
    return getPolyglotText(
      '관심목록에 추가한 학습 과정이 없습니다.',
      'learning-my-관심목록'
    );
  } else if (s === 'Required') {
    return getPolyglotText(
      '권장과정에 해당하는 학습 과정이 없습니다.',
      'learning-my-권장과정'
    );
  } else if (s === 'Completed') {
    return getPolyglotText(
      'mySUNI 학습완료에 해당하는 학습 과정이 없습니다.',
      'learning-my-학습완료'
    );
  } else if (s === 'PersonalCompleted') {
    return getPolyglotText(
      '승인된 개인학습 정보가 없습니다.',
      'learning-my-승인'
    );
  } else if (s === 'Retry') {
    return getPolyglotText(
      '취소/미이수에 해당하는 학습 과정이 없습니다.',
      'learning-my-취소'
    );
  } else if (s === 'EarnedBadgeList') {
    return getPolyglotText(
      `획득한 Badge가 없습니다.
    등록된 Badge 리스트에서 원하는 Badge에 도전해보세요.`,
      'learning-my-Badge'
    );
  } else if (s === 'PaidCourse') {
    return getPolyglotText('등록된 정보가 없습니다.', 'learning-my-등록된정보');
  } else if (s === 'PersonalLearning') {
    return getPolyglotText(
      '승인 요청한 정보가 없습니다.',
      'learning-my-승인요청'
    );
  } else if (s === 'EarnedNoteList') {
    return getPolyglotText('노트가 없습니다.', 'learning-my-노트');
  } else if (s === 'MyProfile') {
    return getPolyglotText(
      '로그인 정보를 확인해주세요',
      'learning-my-로그인정보'
    );
  }
}

const NoSuchContentPanelMessages = {
  InProgress: getPolyglotText(
    '학습중인 과정이 없습니다.',
    'learning-my-학습중'
  ),
  InMyList: getPolyglotText(
    '관심목록에 추가한 학습 과정이 없습니다.',
    'learning-my-관심목록'
  ),
  Required: getPolyglotText(
    '권장과정에 해당하는 학습 과정이 없습니다.',
    'learning-my-권장과정'
  ),
  Enrolled: getPolyglotText(
    '학습예정인 과정이 없습니다.',
    'learning-my-학습예정'
  ),
  Completed: getPolyglotText(
    'mySUNI 학습완료에 해당하는 학습 과정이 없습니다.',
    'learning-my-학습완료'
  ),
  PersonalCompleted: getPolyglotText(
    '승인된 개인학습 정보가 없습니다.',
    'learning-my-승인'
  ),
  Retry: getPolyglotText(
    '취소/미이수에 해당하는 학습 과정이 없습니다.',
    'learning-my-취소'
  ),
  EarnedBadgeList: getPolyglotText(
    `획득한 Badge가 없습니다.
  등록된 Badge 리스트에서 원하는 Badge에 도전해보세요.`,
    'learning-my-Badge'
  ),
  EarnedStampList: getPolyglotText(
    '획득한 스탬프가 없습니다.',
    'mapg-msmp-목록없음'
  ),
  PaidCourse: getPolyglotText(
    '등록된 정보가 없습니다.',
    'learning-my-등록된정보'
  ),
  PersonalLearning: getPolyglotText(
    '승인 요청한 정보가 없습니다.',
    'learning-my-승인요청'
  ),
  EarnedNoteList: getPolyglotText('노트가 없습니다.', 'learning-my-노트'),
  MyProfile: getPolyglotText(
    '로그인 정보를 확인해주세요',
    'learning-my-로그인정보'
  ),
  Playlist: '플레이리스트가 없습니다.',
  PlaylistDetail: '플레이리스트가 ',
  MyLearningSummary: '나의 학습 현황이',
  getMessageByConentType: (contentType: MyContentType): string => {
    return NoSuchContentPanelMessages[contentType];
  },
};

export default NoSuchContentPanelMessages;
