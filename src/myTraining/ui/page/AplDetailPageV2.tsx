import React from 'react';
import { ContentLayout } from 'shared';
import AplDetailContainer from '../logic/AplDetailContainer';

function AplDetailPageV2() {

  return (
    <ContentLayout
      breadcrumb={[
        { text: '승인관리' },
        { text: '개인학습' }
      ]}
    >
      <div className="ap-title border">
        <div className="inner">
          <div className="txt1">개인학습</div>
          <div className="txt2">
            구성원이 입력한 개인학습 정보에 대해 확인하실 수 있습니다.<br />
            입력된 내용을 잘 확인해주세요.
          </div>
        </div>
      </div>
      <AplDetailContainer />
    </ContentLayout>
  );
}

export default AplDetailPageV2;