import React, { memo } from 'react';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';


interface Props {
  model: AplModel;
}

function ApprovalInfoView(props: Props) {
  const { model } = props;

  return (
    <>
      <div className="section-tit">
        <span className="text1">승인정보</span>
      </div>
      <div className="create-detail type-apl">
        <dl>
          <dt>생성자 및 등록일자</dt>
          <dd>
            <span>{model.creatorName}</span>
            <span className="l">{model.displayCreationDateTime}</span>
          </dd>
        </dl>
        <dl>
          <dt>처리상태</dt>
          <dd>
            <span className="blue">{model.displayStateName}</span>
            <span className="l">{model.displayApprovalDateTime}</span>
          </dd>
        </dl>
      </div>
      <div className="section-tit">
        <span className="text1">교육정보</span>
      </div>
    </>
  );
}

export default memo(ApprovalInfoView);