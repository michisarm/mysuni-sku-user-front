import React, { FunctionComponent } from 'react';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

export const QnaModifyContentHeaderView: FunctionComponent = () => (
  <div className="add-personal-learning support">
    <div className="add-personal-learning-wrap">
      <div className="apl-tit">
        <PolyglotText
          id="support-QnaWrite-타이틀수정"
          defaultString="Ask a Question"
        />
      </div>
      <div className="apl-notice">
        <PolyglotText
          id="support-QnaWrite-상세1수정"
          defaultString="문의 내용 확인 후, 신속하게 답변드릴 수 있도록 최선을 다하겠습니다."
        />
        <br />
        <PolyglotText
          id="support-QnaWrite-상세2수정"
          defaultString="기본적인 문의의 경우 FAQ를 통해 관련 내용을 확인하실 수 있으니 참고 부탁드립니다."
        />
      </div>
    </div>
  </div>
);
