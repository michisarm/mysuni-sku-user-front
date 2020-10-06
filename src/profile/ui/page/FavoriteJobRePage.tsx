import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import { Icon } from 'semantic-ui-react';
import FavoriteJobContainerRe from '../logic/FavoriteJobContainerRe';

@observer
@reactAutobind
class FavoriteJobRePage extends React.Component {
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
    const divStyle = {height: '15rem', paddingLeft: '1.5rem'};
    //
    return (
      <ContentLayout disabled>
        <section>
          <div className="interest-content lo-08-03 step2">
            <div>
              <div className="header">
                <div className="logo">
                  <Icon className="sk-university-login" />
                  <span className="blind">my suni</span>
                </div>
              </div>

              <div className="title-box" style={divStyle}>
                <div>
                  <h2>관심직무 Survey 재시행 안내</h2>
                  <p>안녕하십니까?</p>
                  <p>지난 9월 1일부터 시행한 직무 및 학습방식 Survey 에 오류가 발생하여,</p>
                  <p>일부 응답자분들께 관심직무에 대해서만 재입력을 부탁드립니다.</p>
                  <p>&nbsp;</p>
                  <p>불편함을 끼쳐드려 죄송하오며,</p>
                  <p>응답해주신 정보는 개인별 맞춤형 콘텐츠 추천등을 위해 소중히 활용/관리하겠습니다.</p>
                  <p>(해당하는 직무가 없을 경우 기타-직접입력으로 작성 부탁드립니다)</p>
                </div>
              </div>
            </div>
            
            <FavoriteJobContainerRe />
          </div>
        </section>
      </ContentLayout>
    );
  }
}

export default FavoriteJobRePage;
