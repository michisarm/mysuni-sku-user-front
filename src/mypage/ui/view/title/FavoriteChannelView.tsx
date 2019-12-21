import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';
import { StudySummary } from '../../../../profile';
import { ChannelModel } from '../../../../college';

interface Props{
  studySummary : StudySummary
  onFavoritChannelChange : ()=>void
}

interface States {
  open: boolean
}

@observer
@reactAutobind
class FavoriteChannelView extends Component<Props, States> {

  state = {
    open: false,
  };

  onToggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { studySummary, onFavoritChannelChange } = this.props;
    const { favoriteChannels } = studySummary as StudySummary;
    const { open } = this.state;

    const channels = favoriteChannels && favoriteChannels.idNames && favoriteChannels.idNames
      && favoriteChannels.idNames.map(channel => new ChannelModel({ ...channel, channelId: channel.id })) || [];

    return (
      <div className="channel-of-interest">
        <div className="table-css type2">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">관심 channel({channels.length || 0})
                <Button icon className="img-icon" onClick={onFavoritChannelChange}><Icon className="setting17" />
                  <span className="blind">setting</span> {/* favoritChannelModal open */}
                </Button>
              </div>
            </div>
            <div className="cell vtop">
              <div className="item-wrap">{/*  sfavoriteChannels : IdNameList  */}
                <div className="belt">
                  {
                    channels && channels.length !== 0 && channels.map((channel) => (
                      <Label className="channel" key={channel.id}>channel.name</Label>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="cell vtop">
              <div className="toggle-btn">
                <Button icon className="img-icon" onClick={this.onToggle}>
                  <Icon
                    className={classNames({
                      s26: true,
                      'arrow-down': open,
                      'arrow-up': !open,
                    })}
                  />
                  <span className="blind">open</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteChannelView;
