
import React from 'react';
import {Icon, Button} from 'semantic-ui-react';

interface Props {
  onClickNextStep: (step: string) => void,
}

const PersonalInfoAgreementIntro:React.FC<Props> = (Props) => {
  //
  const { onClickNextStep } = Props;

  return (
    <>
      <div className="title-box">
        <Icon className="login-sub4 woman"/>
        <h2>mySUNI 안내</h2>
        <p>
          안녕하세요.<br/>구성원의 ‘개인정보동의’ 작업을 재시행하게 되어 안내 드립니다.
        </p>
      </div>
      <div className="cont-box">
        <p>
          안녕하세요.<br/><br/>
          써니는 구성원의 역량개발을 지원하기 위해 다양한 콘텐츠 제공 업체들과 협업하고 있습니다.<br/><br/>
          <b>
            지난 1월 오픈 이후 신규 콘텐츠 제공업체와 새로운 과정을 개발/서비스 중이며,<br/>
            해당 과정의 학습을 위한 구성원의 <span className="orange">‘개인정보동의’</span> 작업을 <span className="orange">재시행</span>하게 되어 안내 드립니다.
          </b><br/>
          <span className="gray">(※ 추가 4개 콘텐츠 제공업체 : LLC : Josh Bersin Academy, Google : 스터디잼, Microsoft : MS Learn, IDEO)</span><br/><br/>
          또한 구성원 분들께 보다 의미 있는 콘텐츠를 개발하고 추천 드리기 위해<br/>
          현 직무 및 관심 직무에 대해 서베이를 Update 하고자 하오니 잠시만 시간을 내시어 응답 바랍니다.
        </p>
      </div>
      <div className="button-area">
        <Button className="fix bg" onClick={() => onClickNextStep('step2')}>다음</Button>
      </div>
    </>
  );
};

export default PersonalInfoAgreementIntro;
