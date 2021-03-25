import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';
import { Type, AreaType } from 'tracker/model';

interface Props {
  children: React.ReactNode;
}

class CategoryLecturesContentWrapperView extends Component<Props> {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <Segment className="full">
        <div
          className="college-detail"
          data-area={AreaType.COLLEGE_CARD}
          data-type={Type.CLICK}
        >
          {children}
        </div>
      </Segment>
    );
  }
}

export default CategoryLecturesContentWrapperView;
