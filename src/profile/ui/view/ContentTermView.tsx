import React from 'react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

export function ContentTermView() {
  return (
    <div className="privacy-text-box">
      <div className="inner">
        <p className="text1">
          <PolyglotText defaultString="수집항목" id="agreement-outPrivacy-개인1" />
        </p>
        <p className="text2">
          <PolyglotText defaultString="관심분야, 선호학습유형" id="agreement-outPrivacy-개인2" />
        </p>
        <p className="text1 mt30">
          <PolyglotText defaultString="처리 및 보유기간" id="agreement-outPrivacy-개인3" />
        </p>
        <p className="text2">
          <PolyglotText defaultString="해당 구성원 퇴직 시 까지" id="agreement-outPrivacy-개인4" />
        </p>
      </div>
    </div>
  );
}