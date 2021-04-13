
import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';
import { Area } from 'tracker/model';

interface Props {
  lectureCount: number,
  countDisabled: boolean,
  children: React.ReactNode,
}

class ChannelLecturesContentWrapperView extends Component<Props> {
  //
  render() {
    //
    const { lectureCount, countDisabled, children } = this.props;

    return (
      <Segment className="full">
        <div className="sort-reult" data-area={Area.RECOMMEND_CARD}>
          { !countDisabled && (
            <div className="section-count">
              총 <span>{lectureCount}</span>개의 학습 과정이 있습니다.
            </div>
          )}
          {children}
        </div>
      </Segment>
    );
  }
}

export default ChannelLecturesContentWrapperView;
