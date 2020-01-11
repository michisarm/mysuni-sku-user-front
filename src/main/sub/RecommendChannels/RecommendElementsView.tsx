
import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';


export const Wrapper: React.FunctionComponent = ({ children }) => (
  <div className="recommend-area" id="recommend">
    <Segment className="full">
      {children}
    </Segment>
  </div>
);

export const EmptyContents: React.FunctionComponent = () => (
  <div className="no-cont-wrap">
    <Icon className="no-contents80" /><span className="blind">콘텐츠 없음</span>
    <div className="text01">추천 학습 과정이 업데이트 될 예정입니다.</div>
    <div className="text02">관심 분야 혹은 관심 직무의 다양한 학습 과정을 검색해보세요.</div>
  </div>
);
