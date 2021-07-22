import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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
          <h2>{getPolyglotText('mySUNI 안내', 'guide-TOS-제목')}</h2>
          <p>{getPolyglotText('안녕하세요.', 'guide-TOS-배너1')}</p>
          <p>{getPolyglotText('구성원의 ‘개인정보동의’ 작업을 재시행하게 되어 안내 드립니다.', 'guide-TOS-배너2')}</p>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <h2>{getPolyglotText('개인정보동의', 'agreement-privacy-제목')}</h2>
          <p>{getPolyglotText('mySUNI 개인정보 처리방침에 동의해주세요.', 'agreement-privacy-배너')}</p>
        </div>
      );
    } else if (step === 3) {
      return (
        <div>
          <h2>{getPolyglotText('현직무', 'job-recent-제목')}</h2>
          <p>{getPolyglotText('여러분은 어떤 직무 분야에 해당하시나요?', 'job-recent-배너1')}</p>
          <p>{getPolyglotText('수행하고 있는 업무를 기반으로 현 직무를 선택해주시기 바랍니다.', 'job-recent-배너2')}</p>
          <p>
          {getPolyglotText('직무분석이 완료된 관계사를 중심으로 반영되어 있으니, 해당하는 직무가 없을 경우 기타-직접입력으로 작성 해주세요.', 'job-recent-배너3')}
          </p>
        </div>
      );
    } else if (step === 4) {
      return (
        <div>
          <h2>{getPolyglotText('관심직무', 'job-favorite-제목')}</h2>
          <p>{getPolyglotText('여러분은 어떤 직무 분야에 관심을 가지고 있으신가요?', 'job-favorite-배너1')}</p>
          <p>
          {getPolyglotText('지금 당장은 아니더라도 앞으로 해보고 싶은 직무, 도전하고 싶은 업무에 대한 의견을 부탁드립니다.', 'job-favorite-배너2')}
          </p>
        </div>
      );
    } else if (step === 5) {
      return (
        <div>
          <h2>{getPolyglotText('관심분야', 'college-favorite-제목')}</h2>
          <p>{getPolyglotText('여러분의 관심사에 대해 꼼꼼하게 선택해주세요.', 'college-favorite-배너1')}</p>
          <p>{getPolyglotText('최소 3개 이상으로 여러 개를 중복 선택 가능합니다 .', 'college-favorite-배너2')}</p>
          <p>{getPolyglotText('조금이라도 관심을 가지는 주제는 모두 선택을 해주세요', 'college-favorite-배너3')}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{getPolyglotText('학습형태', 'learning-learning-제목')}</h2>
          <p>{getPolyglotText('여러분의 학습 목표와 선호하는 학습방식을 선택해 주세요.', 'learning-learning-배너1')}</p>
          <p>
          {getPolyglotText('Survey Data를 참고하여 향후 보다 효과적이고 의미있는 콘텐츠를 제공해드릴 예정입니다.', 'learning-learning-배너2')}
          </p>
        </div>
      );
    }
  }
}

export default ContentHeaderDescriptionView;
