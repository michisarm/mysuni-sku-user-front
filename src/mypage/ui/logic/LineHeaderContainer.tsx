
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import { ChannelModel } from 'college';

import ChannelFilterModalContainer from './ChannelFilterModalContainer';


interface Props {
  count: number,
  channels?: ChannelModel[]
  onFilter?: (channels: ChannelModel[]) => void
}

@reactAutobind
class LineHeaderContainer extends Component<Props> {
  //
  render() {
    //
    const { count, channels, onFilter } = this.props;

    return (
      <div className="top-guide-title">
        <div className="list-number">총 <strong>{count}개</strong>의 리스트가 있습니다.</div>
        {
          onFilter && (
            <ChannelFilterModalContainer
              channels={channels}
              onFilter={onFilter}
              trigger={<Button icon className="left post"><Icon className="filter2" />Filter</Button>}
            />
          )
        }

      </div>
    );
  }
}

export default LineHeaderContainer;
