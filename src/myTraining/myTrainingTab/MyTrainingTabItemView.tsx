import React from 'react';
import { observer } from 'mobx-react';
import {
  MyLearningContentType,
  learningContentTypeName,
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
  return (
    <>
      {learningContentTypeName(contentType)}
      <span className="count">+{(count > 0 && count) || 0}</span>
    </>
  );
}

export default observer(MyTrainingTabItemView);
