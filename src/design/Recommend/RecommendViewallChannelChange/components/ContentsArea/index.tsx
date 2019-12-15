import React, { Component, createRef } from 'react';
import {
  Segment,
} from 'semantic-ui-react';
import CommentsSort from '../CommentsSort';
import ContentsMoreView from '../ContentsMoreView';
import CardListGroup from '../CardListGroup';


class ContentsArea extends React.Component {
  render() {
    return (
      <Segment className="full">
        <div className="sort-reult">
          <div className="section-count">총 <span>99</span>개의 추천 학습 과정이 있습니다.</div>
          <CommentsSort />
          <div className="section">
            <CardListGroup />
            <ContentsMoreView />
          </div>
        </div>
      </Segment>
    );
  }
}


export default ContentsArea;
