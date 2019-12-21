
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  children: React.ReactNode,
}

@reactAutobind
class ChannelsLecturesWrapperView extends Component<Props> {
  //
  render() {
    //
    const {
      children,
    } = this.props;

    return (
      <div className="recommend-area">
        {children}
      </div>
    );
  }
}

export default ChannelsLecturesWrapperView;
