import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import { Image } from 'semantic-ui-react';

@reactAutobind
class LoadingPage extends Component {
  render() {
    return (
      <ContentLayout breadcrumb={[
        { text: 'd1', path: '/depth1-path' },
        { text: 'd2' },
      ]}
        className="center-content bg-white"
      >
        <div className="align loading">
          <div>
            <Image src="/images/all/loading-animation.jpg" alt="로딩중" />
          </div>
          <div className="loading-text">사용자의 선호 학습 데이터를 기반으로 <br /><strong>맞춤형 학습</strong>을 추천드립니다. <br />잠시만 기다려 주세요.
          </div>
        </div>
      </ContentLayout>
    );
  }

}

export  default LoadingPage;
