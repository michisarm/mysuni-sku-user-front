
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon } from 'semantic-ui-react';
import { ListPanelTopLine } from 'shared';
import { ChannelModel } from 'college/model';
import { ChannelFilterModal } from 'lecture';


interface Props {
  totalCount: number
  channels?: ChannelModel[]
  onFilter?: (channels: ChannelModel[]) => void
}

@reactAutobind
@observer
class CreateListPanelTopLineView extends React.Component<Props> {
  //
  render() {
    //
    const { totalCount, channels, onFilter } = this.props;

    return (
      <ListPanelTopLine
        className="size-type3"
        count={totalCount}
      >
        <ChannelFilterModal
          trigger={(
            <Button icon className="left post">
              <Icon className="filter2" />Filter
            </Button>
          )}
          channels={channels}
          onFilter={onFilter}
        />
      </ListPanelTopLine>
    );
  }

}

export default CreateListPanelTopLineView;
