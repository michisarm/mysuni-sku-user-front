import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';

interface Props {
  step: number;
}

@observer
@reactAutobind
class ContentHeaderDescriptionView extends Component<Props> {
  render() {
    const { step } = this.props;
    if (step === 1) {
      return (
        <div>
          <h2>mySUNI 안내</h2>
          <p>안녕하세요.</p>
          <p>구성원의 ‘개인정보동의’ 작업을 재시행하게 되어 안내 드립니다.</p>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <h2>개인정보동의</h2>
          <p>mySUNI 개인정보 처리방침에 동의해주세요.</p>
        </div>
      );
    } else if (step === 3) {
      return (
        <div>
          <h2>현직무</h2>
          <p>여러분은 어떤 직무 분야에 해당하시나요?</p>
          <p>수행하고 있는 업무를 기반으로 현 직무를 선택해주시기 바랍니다.</p>
          <p>
            직무분석이 완료된 관계사를 중심으로 반영되어 있으니, 해당하는 직무가
            없을 경우 기타-직접입력으로 작성 해주세요.
          </p>
        </div>
      );
    } else if (step === 4) {
      return (
        <div>
          <h2>관심직무</h2>
          <p>여러분은 어떤 직무 분야에 관심을 가지고 있으신가요?</p>
          <p>
            지금 당장은 아니더라도 앞으로 해보고 싶은 직무, 도전하고 싶은 업무에
            대한 의견을 부탁드립니다.
          </p>
        </div>
      );
    } else if (step === 5) {
      return (
        <div>
          <h2>관심분야</h2>
          <p>여러분의 관심사에 대해 꼼꼼하게 선택해주세요.</p>
          <p>최소 3개 이상으로 여러 개를 중복 선택 가능합니다 .</p>
          <p>조금이라도 관심을 가지는 주제는 모두 선택을 해주세요</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>학습형태</h2>
          <p>여러분의 학습 목표와 선호하는 학습방식을 선택해 주세요.</p>
          <p>
            Survey Data를 참고하여 향후 보다 효과적이고 의미있는 콘텐츠를
            제공해드릴 예정입니다.
          </p>
        </div>
      );
    }
  }
}

export default ContentHeaderDescriptionView;
