import React, { Component } from 'react';

class PromotionTab extends Component {
  render() {
    return (
      <>
        <div className="ui attached active" data-tab="third">
          <div className="common-intro case3">
            <div className="promotion-strong">구성원들의 mySUNI 이해 및 활용방법에 도움되는 홍보 자료입니다.</div>
            <video className="fp-engine" preload="none" webkit-playsinline="true" autoPlay playsInline src="https://s-cloudfront.cdn.ap.panopto.com/sessions/a917e49f-6aa1-4468-a9a8-ac4d0086b988/2c3a5cdd-5683-48a5-86b3-ac4d0086b990-2e47b330-36b9-493d-bcc1-ac4d008aebf6.mp4" x-webkit-airplay="allow" width="648px" height="360px">
              <track src="captions_es.vtt" kind="captions" label="spanish_captions" />
            </video>
            <div className="subVideo-inner">
              <div className="subVideo">
                <video src="https://s-cloudfront.cdn.ap.panopto.com/sessions/2aad8f66-e8b5-44a7-9dba-ac4b0098f105/4ecc2936-9626-4201-af48-ac4b0098f10c-ffad4ef7-33da-4c11-80f9-ac4b009d4cda.mp4" controls width="162px" height="90px">
                  <track src="captions_es.vtt" kind="captions" label="spanish_captions" />
                </video>
                <p className="subVideo-text"><a href="#" className="active">SK Hynix ’20년 기업광고 연계 mySUNI 소개 동영상</a></p>
              </div>
              <div className="subVideo">
                <video src="https://s-cloudfront.cdn.ap.panopto.com/sessions/2aad8f66-e8b5-44a7-9dba-ac4b0098f105/4ecc2936-9626-4201-af48-ac4b0098f10c-ffad4ef7-33da-4c11-80f9-ac4b009d4cda.mp4" controls width="162px" height="90px">
                  <track src="captions_es.vtt" kind="captions" label="spanish_captions" />
                </video>
                <p className="subVideo-text"><a href="#">SKInno Man x mySUNI 써니를 묻다 Part. 1 (LMS편)</a></p>
              </div>
              <div className="subVideo">
                <video src="https://s-cloudfront.cdn.ap.panopto.com/sessions/2aad8f66-e8b5-44a7-9dba-ac4b0098f105/4ecc2936-9626-4201-af48-ac4b0098f10c-ffad4ef7-33da-4c11-80f9-ac4b009d4cda.mp4" controls width="162px" height="90px">
                  <track src="captions_es.vtt" kind="captions" label="spanish_captions" />
                </video>
                <p className="subVideo-text"><a href="#">SKInno Man x mySUNI 써니를 묻다 Part. 2 (College편)</a></p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PromotionTab;
