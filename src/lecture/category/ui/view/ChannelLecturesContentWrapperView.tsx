
import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';


interface Props {
  lectureCount: number,
  children: React.ReactNode,
}

class ChannelLecturesContentWrapperView extends Component<Props> {
  //
  render() {
    //
    const { lectureCount, children } = this.props;

    return (
      <Segment className="full">
        <div className="sort-reult">
          <div className="section-count">
            총 <span>{lectureCount}</span>개의 학습 과정이 있습니다.
          </div>
          {children}
        </div>
      </Segment>
    );
  }
}

export default ChannelLecturesContentWrapperView;
