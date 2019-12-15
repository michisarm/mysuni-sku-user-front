import React, { Component, createRef } from 'react';
import {
  Segment, Icon,
} from 'semantic-ui-react';

class ContentsArea extends React.Component {
  render() {
    return (
      <Segment className="full">
        <div className="sort-reult">
          <div className="no-cont-wrap type2">
            <Icon className="no-contents80" /><span className="blind">콘텐츠 없음</span>
            <div className="text">
                            추천 학습 과정이 업데이트 될 예정입니다.<br />
                            관심 분야 혹은 관심 직무의 다양한 학습 과정을 검색해보세요.
            </div>
          </div>
        </div>
      </Segment>
    );
  }
}


export default ContentsArea;
