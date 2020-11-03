import React from 'react';
import { Form, Segment, Table } from 'semantic-ui-react';
import { ContentLayout } from 'shared';

function AplDetailPageV2() {

  return (
    <ContentLayout
      breadcrumb={[
        { text: '승인관리' },
        { text: '개인학습' }
      ]}
    >
      <div className="ap-title border">
        <div className="txt1">개인학습</div>
        <div className="txt2">
          구성원이 입력한 개인학습 정보에 대해 확인하실 수 있습니다.<br />
          입력된 내용을 잘 확인해주세요.
        </div>
      </div>
      <Segment className="full">
        <div className="apl-form-wrap create">
          <Form>
            <div className="section-tit">
              <span className="text1">승인정보</span>
            </div>
            <div className="create-detail type-apl">
              <dl>
                <dt>생성자 및 등록일자</dt>
                <dd>
                  <span>김써니</span>
                  <span className="1">2020.05.29 23:59</span>
                </dd>
              </dl>
              <dl>
                <dt>처리상태</dt>
                <dd>
                  <span className="blue">승인</span>
                  <span className="1">2020.05.29 23:59</span>
                </dd>
              </dl>
            </div>
            <div className="section-tit">
              <span className="text1">교육정보</span>
            </div>
          </Form>
        </div>
      </Segment>
    </ContentLayout>
  );
}

export default AplDetailPageV2;