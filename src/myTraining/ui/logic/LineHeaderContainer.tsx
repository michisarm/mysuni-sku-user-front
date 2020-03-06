
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Icon } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { ListPanelTopLine } from 'shared';
import { ChannelModel } from 'college/model';
import { ChannelFilterModal } from 'lecture';


interface Props {
  actionLogService?: ActionLogService,
  count: number,
  channels?: ChannelModel[]
  onFilter?: (channels: ChannelModel[]) => void
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
@reactAutobind
@observer
class LineHeaderContainer extends Component<Props> {

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  render() {
    //
    const { count, channels, onFilter } = this.props;

    return (
      <ListPanelTopLine count={count}>
        {
          onFilter && (
            <ChannelFilterModal
              trigger={(
                <Button icon className="left post" onClick={() => this.onClickActionLog('Filter')}>
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
