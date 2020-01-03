import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import classNames from 'classnames';
import { SkProfileService, StudySummary } from 'profile';
import { ChannelModel, CollegeService } from 'college';
import { FavoriteChannelChangeModal } from 'shared-component';
import { mobxHelper } from 'shared';


interface Props{
  skProfileService? : SkProfileService
  collegeService? : CollegeService
}

interface States {
  open: boolean
}

@inject(mobxHelper.injectFrom('college.collegeService', 'profile.skProfileService'))
@observer
@reactAutobind
class FavoriteChannelContainer extends Component<Props, States> {

  state = {
    open: false,
  };

  componentDidMount(): void {
    this.init();
  }

  init() {
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  onToggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { skProfileService } = this.props;
    const { studySummary } = skProfileService as SkProfileService;
    const { favoriteChannels } = studySummary as StudySummary;
    const { open } = this.state;

    const channels = favoriteChannels && favoriteChannels.idNames && favoriteChannels.idNames
      && favoriteChannels.idNames.map(channel =>
        new ChannelModel({ id: channel.id, channelId: channel.id, name: channel.name, checked: true })
      ) || [];

    return (
      <div className="channel-of-interest">
        <div className="table-css type2">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">관심 channel({channels.length || 0})

                <FavoriteChannelChangeModal
                  // handleConfirm={this.onConfirmModal}
                  favorites={channels}
                  onConfirmCallback={this.init}
                  trigger={(
                    <Button icon className="img-icon"><Icon className="setting17" />
                      <span className="blind">setting</span> {/* favoritChannelModal open */}
                    </Button>
                  )}
                />
              </div>
            </div>
            <div className="cell vtop">
              <div
                className={classNames({
                  'item-wrap': true,
                  active: open,
                })}
              >
                <div className="belt">
                  {
                    channels && channels.length !== 0 && channels.map((channel, index) => (
                      <Label className="channel" key={`channel-${index}`}>{channel.name}</Label>
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

export default FavoriteChannelContainer;
