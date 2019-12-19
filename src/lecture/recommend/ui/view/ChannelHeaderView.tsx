
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';
import { ChannelModel } from 'college';


interface Props {
  channel: ChannelModel
  title?: string
  onViewAll: () => void
}

@reactAutobind
class ChannelHeaderView extends Component<Props> {
  //
  render() {
    //
    const { channel, title, onViewAll } = this.props;

    return (
      <div className="section-head">
        <span className="channel">{channel.name}</span> {title}
        <div className="right">
          <Button icon className="right btn-blue" onViewAll={onViewAll}>View all
            <Icon className="morelink" />
          </Button>
        </div>
      </div>
    );
  }
}

export default ChannelHeaderView;
