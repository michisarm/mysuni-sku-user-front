
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ChannelModel } from 'college';


interface Props {
  channel: ChannelModel,
}

@reactAutobind
@observer
class CategoryLecturesHeaderView extends Component<Props> {
  //
  render() {
    //
    const { channel } = this.props;

    return (
      <div className="white-title">
        <div className="inner">
          <strong>{channel.name}</strong>의 학습 과정 입니다.
        </div>
      </div>
    );
  }
}

export default CategoryLecturesHeaderView;
