import React from 'react';
import {Segment, Icon } from 'semantic-ui-react'

const NoDataPage: React.FC = () => {
  return (
    <Segment className="full">
      <div className="no-cont-wrap">
        <Icon className="no-contents80"/><span className="blind">콘텐츠 없음</span>
        <div className="text">검색된 Expert가 없습니다.</div>
      </div>
    </Segment>
  );
};

export default NoDataPage;
