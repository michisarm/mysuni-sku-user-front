import React, { memo } from 'react';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props {
  model: AplModel;
}

function ApprovalInfoView(props: Props) {
  const { model } = props;

  return (
    <>
      <div className="section-tit">
        <span className="text1">
          <PolyglotText
            id="승인관리-개인상세-승인정보"
            defaultString="승인정보"
          />
        </span>
      </div>
      <div className="create-detail type-apl">
        <dl>
          <dt>
            <PolyglotText
              id="승인관리-개인상세-rgdt"
              defaultString="생성자 및 등록일자"
            />
          </dt>
          <dd>
            <span>
              {parsePolyglotString(model.registrantUserIdentity?.name)}
            </span>
            <span className="l">{model.displayCreationDateTime}</span>
          </dd>
        </dl>
        <dl>
          <dt>
            <PolyglotText
              id="승인관리-개인상세-처리상태"
              defaultString="처리상태"
            />
          </dt>
          <dd>
            <span className="blue">{model.displayStateName}</span>
            <span className="l">{model.displayApprovalDateTime}</span>
          </dd>
        </dl>
      </div>
      <div className="section-tit">
        <span className="text1">
          <PolyglotText
            id="승인관리-개인상세-교육정보"
            defaultString="교육정보"
          />
        </span>
      </div>
    </>
  );
}

export default memo(ApprovalInfoView);
