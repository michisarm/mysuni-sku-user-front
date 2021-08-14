import React from 'react';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

function MyApprovalContentHeader() {
  return (
    <div className="ap-title">
      <div className="inner">
        <div className="txt1">
          <PolyglotText id="승인관리-mifa-타이틀" defaultString="승인관리" />
        </div>
        <div className="txt2">
          <PolyglotText
            id="승인관리-mifa-부가설명"
            defaultString="유료과정 및 개인학습 정보에 대해 승인관리를 하실 수 있습니다."
          />
        </div>
      </div>
    </div>
  );
}

export default MyApprovalContentHeader;
