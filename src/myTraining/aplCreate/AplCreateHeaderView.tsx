import React from 'react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

export function AplCreateHeaderView() {
  return (
    <div className="add-personal-learning">
      <div className="add-personal-learning-wrap">
        <div className="apl-tit">
          <PolyglotText id="개학등록-adl-타이틀" defaultString="개인학습" />
        </div>
        <div
          className="apl-notice"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              `‘mySUNI / 각 사 교육’ 외 개인적으로 학습하였을 경우,\n승인권자의 확인 후 학습시간으로 등록 할 수 있습니다.`,
              '개학등록-adl-상세설명'
            ),
          }}
        />
      </div>
    </div>
  );
}
