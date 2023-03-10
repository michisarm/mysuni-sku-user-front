import React, { FunctionComponent } from 'react';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

export const QnaRegisterContentHeaderView: FunctionComponent = () => (
  <div className="add-personal-learning support">
    <div className="add-personal-learning-wrap">
      <div className="apl-tit">
        {/*<PolyglotText*/}
        {/*  id="support-QnaWrite-타이틀"*/}
        {/*  defaultString="Ask a Question"*/}
        {/*/>*/}
        {getPolyglotText('1:1 문의', 'support-qna-탭명')}
      </div>
      <div className="apl-notice">
        <PolyglotText
          id="support-QnaWrite-상세1"
          defaultString="문의 내용 확인 후, 신속하게 답변드릴 수 있도록 최선을 다하겠습니다."
        />
        <br />
        <PolyglotText
          id="support-QnaWrite-상세2"
          defaultString="기본적인 문의의 경우 FAQ를 통해 관련 내용을 확인하실 수 있으니 참고 부탁드립니다."
        />
      </div>
    </div>
  </div>
);
