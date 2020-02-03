
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';
import { ChannelModel } from 'college';
import { ChannelFilterModal } from 'lecture';


interface Props {
  count: number,
  channels?: ChannelModel[]
  onFilter?: (channels: ChannelModel[]) => void
}

@reactAutobind
@observer
class LineHeaderContainer extends Component<Props> {
  //
  render() {
    //
    const { count, channels, onFilter } = this.props;

    return (
      <ListPanelTopLine count={count}>
        {
          onFilter && (
            <ChannelFilterModal
              trigger={(
                <Button icon className="left post">
                  <Icon className="filter2" />Filter
                </Button>
              )}
              channels={channels}
              onFilter={onFilter}
            />
          )
        }
      </ListPanelTopLine>
    );
  }
}

export default LineHeaderContainer;
