
import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';


interface Props {
  children: React.ReactNode,
}

class CategoryLecturesContentWrapperView extends Component<Props> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <Segment className="full">
        <div className="college-detail">
          {children}
        </div>
      </Segment>
    );
  }
}

export default CategoryLecturesContentWrapperView;
