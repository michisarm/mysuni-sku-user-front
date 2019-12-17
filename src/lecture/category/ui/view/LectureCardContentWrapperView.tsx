
import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';


interface Props {
  children: React.ReactNode,
}

class LectureCardContentWrapperView extends Component<Props> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <Segment className="full">
        {children}
      </Segment>
    );
  }
}

export default LectureCardContentWrapperView;
