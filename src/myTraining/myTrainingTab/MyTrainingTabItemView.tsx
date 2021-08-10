import React from 'react';
import { observer } from 'mobx-react';
import {
  MyLearningContentType,
  MyLearningContentTypeName,
} from 'myTraining/ui/model/MyLearningContentType';

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
      {MyLearningContentTypeName[contentType]}
      <span className="count">+{(count > 0 && count) || 0}</span>
    </>
  );
}

export default observer(MyTrainingTabItemView);
