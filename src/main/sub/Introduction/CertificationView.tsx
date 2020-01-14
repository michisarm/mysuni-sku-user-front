
import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';


class CertificationView extends Component {
  //
  render() {
    //
    return (
      <div className="ui attached active" data-tab="third">
        <div className="common-intro case3">
          <div className="inner">
            <div className="strong">mySUNI에서는 구성원의 자발적 학습에 대한 동기 부여를<br />위해 3단계 인증제도를 운영하고 있습니다.
            </div>
            <div className="normal">구성원 스스로 자신의 커리어 목표를 수립하고 학습 후 부여되는<br />인증제도를 활용하여 Market 최고의
              전문가로 성장할 수 있습니다.
            </div>
          </div>
        </div>
        <div className="ui full segment">
          <div className="certification">
            <div className="step-picture">
              <Image src={`${process.env.PUBLIC_URL}/images/all/img-step.svg`} alt="" />
              <ol className="blind">
                <li>1단계 Stamp</li>
                <li>2단계 Badge</li>
                <li>3단계 Certification</li>
              </ol>
            </div>
            <div className="step-detail">
              <div className="step-text-box">
                <div className="num">1단계</div>
                <div className="name">Stamp</div>
                <ul>
                  <li>Stamp가 발급되는 Course 이수 시 자동 획득</li>
                  <li>특정 지식/기술을 ‘이해’했음을 인증</li>
                </ul>
              </div>
              <div className="step-text-box">
                <div className="num">2단계</div>
                <div className="name">Badge</div>
                <ul>
                  <li>특정 분야의 다수 Stamp 확보 및 Test/실습 등 Badge 부여 조건<br /> 통과 시 획득</li>
                  <li>특정 역량을 ‘확보’했음을 인증</li>
                </ul>
              </div>
              <div className="step-text-box">
                <div className="num">3단계</div>
                <div className="name">Certificate</div>
                <ul>
                  <li>현업 전문가 및 공신력 있는 외부기관에서 인증하는 요건 충족 시 획득</li>
                  <li>‘Market’에서 인정받을 수준의 역량을 ‘보유’하고 있음을 인증</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CertificationView;
