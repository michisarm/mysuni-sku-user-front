import React from 'react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

export function MySuniServiceTermView() {
  return (
    <div className="privacy-text-box">
      <div className="inner">
        <p className="text1">
          <PolyglotText defaultString="수집항목" id="agreement-outPrivacy-서비스1" />
        </p>
        <p className="text2">
          <PolyglotText defaultString="소속, 성명, 사번, 직위, 직책, 이메일주소, 사내 전화번호, 휴대전화번호" id="agreement-outPrivacy-서비스2" />
        </p>
        <p className="text1 mt30">
          <PolyglotText defaultString="처리 및 보유기간" id="agreement-outPrivacy-서비스3" />
        </p>
        <p className="text2">
          <PolyglotText defaultString="해당 구성원 퇴직 시 까지" id="agreement-outPrivacy-서비스4" />
        </p>
      </div>
    </div>
  );
}
