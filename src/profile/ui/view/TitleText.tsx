import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';

interface Props{
  step:number
}

@observer
@reactAutobind
class TitleText extends React.Component<Props> {

  render() {
    const { step } = this.props;
    if (step === 1) {
      return (
        <div>
          <h2>관심분야</h2>
          <p>여러분의 관심사에 대해 꼼꼼하게 선택해주세요.</p>
          <p>최소 3개 이상으로 여러 개를 중복 선택 가능합니다 .</p>
          <p>조금이라도 관심을 가지는 주제는 모두 선택을 해주세요</p>
        </div>
      ); }
    else if (step === 2) {
      return (
        <div>
          <h2>직무계획</h2>
          <p>앞으로 여러분은 어떤 직무 분야에 관심을 가지고 있으신가요?</p>
          <p>지금 당장은 아니더라도 나중에 해보고 싶은 직무, 도전하고 싶은 업무에 대한 의견을 부탁드립니다.</p>
          <p>향후 보다 정교화된 컨텐츠 추천의 Data로 활용 예정입니다.</p>
        </div>
      );  }
    else {
      return (
        <div>
          <h2>학습형태</h2>
          <p>여러분의 학습 목표와 선호하는 학습 방식과 오프라인 강의 장소, 시간을 선택해주세요.</p>
          <p>여러분이 선택한 관심사는 추후 설정에서 변경도 가능합니다.</p>
          <p>관심사가 바뀌게 되면 꼭 변경 내용을 재선택해주세요.</p>
        </div>
      );
    }

  }
}

export default TitleText;
