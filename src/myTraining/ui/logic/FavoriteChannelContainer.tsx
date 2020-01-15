import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';

import { Button, Icon, Label } from 'semantic-ui-react';
import classNames from 'classnames';
import { SkProfileService } from 'profile';
import { ChannelModel, CollegeService } from 'college';
import { FavoriteChannelChangeModal } from 'shared-component';


interface Props {
  skProfileService?: SkProfileService
  collegeService?: CollegeService
}

interface States {
  multiple: boolean
  open: boolean
}

@inject(mobxHelper.injectFrom('college.collegeService', 'profile.skProfileService'))
@observer
@reactAutobind
class FavoriteChannelContainer extends Component<Props, States> {
  //
  panelRef = React.createRef<HTMLDivElement>();

  channelsRef = React.createRef<HTMLDivElement>();

  state = {
    multiple: false,
    open: false,
  };


  componentDidMount(): void {
    this.init();
    this.reactionMultiple();
    this.setMultiple();
  }

  init() {
    const { skProfileService } = this.props;
    skProfileService!.findStudySummary();
  }

  reactionMultiple() {
    //
    const { skProfileService } = this.props;

    reaction(
      () => skProfileService!.studySummaryFavoriteChannels,
      this.setMultiple,
    );
  }

  setMultiple() {
    //
    if (this.channelsRef.current!.offsetHeight > 32) {
      this.setState({ multiple: true });
    }
  }

  onToggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { skProfileService } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService!;
    const { multiple, open } = this.state;

    const channels = studySummaryFavoriteChannels.map(channel =>
      new ChannelModel({ id: channel.id, channelId: channel.id, name: channel.name, checked: true })
    );

    return (
      <div className="channel-of-interest">
        <div className="table-css type2">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">관심 Channel({channels.length || 0})

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
                ref={this.panelRef}
                className={classNames({
                  'item-wrap': true,
                  active: open,
                })}
              >
                <div
                  ref={this.channelsRef}
                  className="belt"
                >
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
                { multiple && (
                  <Button icon className="img-icon" onClick={this.onToggle}>
                    <Icon
                      className={classNames({
                        s26: true,
                        'arrow-down': !open,
                        'arrow-up': open,
                      })}
                    />
                    <span className="blind">open</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteChannelContainer;
