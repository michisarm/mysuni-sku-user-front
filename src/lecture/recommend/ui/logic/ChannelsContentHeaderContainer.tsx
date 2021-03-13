
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Button, Icon, Label } from 'semantic-ui-react';
import { ContentHeader, FavoriteChannelChangeModal } from 'shared';
import { ActionLogService } from 'shared/stores';
import { ChannelModel } from 'college/model';
import { SkProfileService } from 'profile/stores';
import { CollegeLectureCountService } from 'lecture/stores';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import ContentHeaderRecommand from 'layout/ContentHeader/ContentHeaderRecommand';
import ChannelsHeaderInfoContainer from './ChannelsHeaderInfoContainer';
import { SkProfileModel } from 'profile/model';


interface Props extends RouteComponentProps {
  actionLogService?: ActionLogService
  skProfileService?: SkProfileService
  collegeLectureCountService?: CollegeLectureCountService
  channels: ChannelModel[]
}

interface States {
  companyCode: string;
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'profile.skProfileService',
  'lecture.collegeLectureCountService',
))
@observer
@reactAutobind
class ChannelsContentHeaderContainer extends Component<Props, States> {

  state = {
    companyCode: ''
  }

  //
  componentDidMount(): void {
    this.init();
  }

  init() {
    //
    const { skProfileService, collegeLectureCountService } = this.props;

    skProfileService!.findSkProfile()
    .then((profile: SkProfileModel) => {
      this.setState({companyCode: profile.member.companyCode})
    })
    skProfileService!.findStudySummary();
    collegeLectureCountService!.findCollegeLectureCounts();
    //여기서?????? 최근학습중인 채널????
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  getFavoriteChannelButton() {
    //
    return (
      <Label className="onlytext" onClick={() => this.onClickActionLog('관심 Channel')}>
        {/* <Icon className="channel16" /><span><a>관심 Channel</a></span> */}
        <span className="personal-channel-tit">
          <a>관심채널</a>
        </span>
      </Label>
    );
  }

  render() {
    //
    const { companyCode } = this.state;
    const { skProfileService, collegeLectureCountService, channels } = this.props;
    const { studySummaryFavoriteChannels, skProfile } = skProfileService!;
    const { member } = skProfile;

    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );

    return (
      <ContentHeaderRecommand className="content-division">
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            image={skProfile.photoFilePath || profileImg}
            name={member.name}
            company={member.company}
            department={member.department}
            imageEditable={false}
            myPageActive
            type="Recommend"
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell inner>
          { companyCode && (
            <ChannelsHeaderInfoContainer companyCode={companyCode}/>
          )}
        {/* <div className="recommend-info">
          <div className="personal-channel-list">
            <span>최근 학습중인 채널</span>
            <Button className="toggle toggle4" aria-pressed="false">
              AI Manufacturing Press
            </Button>
            <Button className="toggle toggle4" aria-pressed="false">
              Culture &#38; Value
            </Button>
            <Button className="toggle toggle4" aria-pressed="false">
              CLX University
            </Button>
          </div>
          <div className="personal-channel-list">
            <span>우리 회사 인기 채널</span>
            <Button className="toggle toggle4" aria-pressed="false">
              GC Green Channel
            </Button>
            <Button className="toggle toggle4" aria-pressed="false">
              SK C&#38;C 공통
            </Button>
            <Button className="toggle toggle4" aria-pressed="false">
              AI Manufacturing Press AI Manufacturing Press
            </Button>
          </div>
        </div> */}
        </ContentHeader.Cell>
        <ContentHeader.Cell inner>
          <ContentHeader.RecommendItem
            top={
              //여기안에 관심 Channel 들어있는데 어떻게 처리할지
              <FavoriteChannelChangeModal
                trigger={this.getFavoriteChannelButton()}
                favorites={favoriteChannels}
                onConfirmCallback={() => {}}
              />
            }
            totalChannelCount={collegeLectureCountService!.totalChannelCount}
            favoriteChannelCount={channels.length || 0}
          />
        </ContentHeader.Cell>
      </ContentHeaderRecommand>
    );
  }
}

export default withRouter(ChannelsContentHeaderContainer);
