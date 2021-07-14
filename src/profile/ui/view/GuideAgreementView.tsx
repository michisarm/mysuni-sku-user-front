import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

@reactAutobind
@observer
class GuideAgreement extends Component {
  render() {
    return (
      <>
        <div className="cont-box">
          <p>
            <PolyglotText defaultString="안녕하세요." id="" />
            <br />
            <br />
            <PolyglotText defaultString="써니는 구성원의 역량개발을 지원하기 위해 다양한 콘텐츠 제공 업체들과 협업하고 있습니다." id="" />
            <br />
            <br />
            <b dangerouslySetInnerHTML={{__html: getPolyglotText(`개발/서비스 중이며,<br />해당 과정의 학습을 위한 구성원의{' '} <span className="orange">‘개인정보동의’</span> 작업을{' '}<span className="orange">재시행</span>하게 되어 안내 드립니다.`, 'guide-TOS-내용3')}} />
            <br />
            <span className="gray">
            <PolyglotText defaultString="(※ 추가 7개 콘텐츠 제공업체 : LLC : Josh Bersin Academy, Google : 스터디잼, Microsoft : MS Learn, IDEO, AMT Training, BTS, 대학내일)" id="guide-TOS-내용4" />
            </span>
            <br />
            <br />
            <div dangerouslySetInnerHTML={{__html: getPolyglotText('또한 구성원 분들께 보다 의미 있는 콘텐츠를 개발하고 추천 드리기 위해 <br />현 직무 및 관심 직무에 대해 서베이를 Update 하고자 하오니 잠시만 시간을 내시어 응답 바랍니다.', 'guide-TOS-내용5')}} />
          </p>
        </div>
      </>
    );
  }
}

export default GuideAgreement;
