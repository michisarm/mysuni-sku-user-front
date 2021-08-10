import React from 'react';
import { observer } from 'mobx-react';
import {
  MyLearningContentType,
  MyLearningContentTypeName,
} from 'myTraining/ui/model/MyLearningContentType';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface MyTrainingTabItemViewProps {
  contentType: MyLearningContentType;
  count: number;
}

function MyTrainingTabItemView({
  contentType,
  count,
}: MyTrainingTabItemViewProps) {
  function learningContentTypeName() {
    if (contentType === 'InProgress') {
      return getPolyglotText('학습중', 'learning-tabm-탭학습');
    } else if (contentType === 'InMyList') {
      return getPolyglotText('관심목록', 'learning-tabm-탭관심');
    } else if (contentType === 'Enrolled') {
      return getPolyglotText('학습예정', 'learning-tabm-탭권장');
    } else if (contentType === 'Required') {
      return getPolyglotText('권장과정', 'learning-tabm-탭학예');
    } else if (contentType === 'Completed') {
      return getPolyglotText('mySUNI 학습완료', 'learning-tabm-탭학완');
    } else if (contentType === 'PersonalCompleted') {
      return getPolyglotText('개인학습 완료', 'learning-tabm-탭개완');
    } else if (contentType === 'Retry') {
      return getPolyglotText('취소/미이수', 'learning-tabm-탭취소');
    } else {
      return null;
    }
  }

  // InProgress = '학습중',
  // InMyList = '관심목록',
  // Enrolled = '학습예정',
  // Required = '권장과정',
  // Completed = 'mySUNI 학습완료',
  // PersonalCompleted = '개인학습 완료',
  // Retry = '취소/미이수',
  return (
    <>
      {learningContentTypeName()}
      <span className="count">+{(count > 0 && count) || 0}</span>
    </>
  );
}

export default observer(MyTrainingTabItemView);
