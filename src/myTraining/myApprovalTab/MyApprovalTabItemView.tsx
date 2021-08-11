import React from 'react';
import { observer } from 'mobx-react';
import { MyApprovalContentType } from 'myTraining/ui/model/MyApprovalContentType';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface MyApprovalTabItemViewProps {
  contentType: MyApprovalContentType;
  count: number;
}

function MyApprovalTabItemView({
  contentType,
  count,
}: MyApprovalTabItemViewProps) {
  return (
    <>
      {contentType === MyApprovalContentType.PaidCourse && (
        <>
          <PolyglotText
            id="승인관리-mifa-유료과정탭"
            defaultString="유료과정"
          />
          <span className="count">+{(count > 0 && count) || 0}</span>
        </>
      )}
      {contentType === MyApprovalContentType.PersonalLearning && (
        <>
          <PolyglotText
            id="승인관리-mifa-개인학습탭"
            defaultString="개인학습"
          />
          <span className="count">+{(count > 0 && count) || 0}</span>
        </>
      )}
    </>
  );
}

export default observer(MyApprovalTabItemView);
