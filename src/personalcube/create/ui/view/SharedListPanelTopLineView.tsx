
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Icon } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { ListPanelTopLine } from 'shared';
import { ChannelModel } from 'college/model';
import { ChannelFilterModal } from 'lecture';


interface Props {
  actionLogService?: ActionLogService
  totalCount: number
  channels?: ChannelModel[]
  onFilter?: (channels: ChannelModel[]) => void
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
@reactAutobind
@observer
class CreateListPanelTopLineView extends React.Component<Props> {

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

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
            <Button icon className="left post" onClick={() => this.onClickActionLog('Filter')}>
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
