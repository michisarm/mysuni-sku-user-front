
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import { Image } from 'semantic-ui-react';


@reactAutobind
class ProgressPage extends Component {
  //
  componentDidMount(): void {
    //
    document.body.classList.add('white');
  }

  componentWillUnmount(): void {
    //
    document.body.classList.remove('white');
  }

  render() {
    //
    return (
      <ContentLayout
        disabled
      >
        <section className="center-content">
          <div className="align loading">
            <div>
              <Image src={`${process.env.PUBLIC_URL}/images/all/matching.gif`} alt="로딩중" />
            </div>
            <div className="loading-text">
              사용자의 선호 학습 데이터를 기반으로<br />
              <strong>맞춤형 학습</strong>을 추천드립니다.<br />
              잠시만 기다려 주세요.
            </div>
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default ProgressPage;
