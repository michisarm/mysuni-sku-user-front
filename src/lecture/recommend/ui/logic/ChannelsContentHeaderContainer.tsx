import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Label } from 'semantic-ui-react';
import { ContentHeader, FavoriteChannelChangeModal } from 'shared';
import { SkProfileService } from 'profile/stores';
import { CollegeLectureCountService } from 'lecture/stores';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import { Area } from 'tracker/model';
import ContentHeaderRecommand from 'layout/ContentHeader/ContentHeaderRecommand';
import ChannelsHeaderInfoContainer from './ChannelsHeaderInfoContainer';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  collegeLectureCountService?: CollegeLectureCountService;
}

interface States {
  companyCode: string;
}

@inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'lecture.collegeLectureCountService'
  )
)
@observer
@reactAutobind
class ChannelsContentHeaderContainer extends Component<Props, States> {
  componentDidMount(): void {
    this.init();
  }

  init() {
    //
    const { skProfileService, collegeLectureCountService } = this.props;

    // skProfileService!.findSkProfile().then((profile: SkProfileModel) => {
    //   this.setState({ companyCode: profile.companyCode });
    // });
    skProfileService!.findStudySummary();
    collegeLectureCountService!.findCollegeLectureCounts();
    //여기서?????? 최근학습중인 채널????
  }

  getFavoriteChannelButton() {
    return (
      <Label className="onlytext">
        <span className="personal-channel-tit">
          <a>
            <PolyglotText defaultString="관심채널" id="rcmd-mifa-관심채널" />
          </a>
        </span>
      </Label>
    );
  }

  render() {
    const { skProfileService, collegeLectureCountService } = this.props;
    const { additionalUserInfo, skProfile } = skProfileService!;

    const favoriteChannels = additionalUserInfo.favoriteChannelIds;

    return (
      <ContentHeaderRecommand
        className="content-division"
        dataArea={Area.RECOMMEND_INFO}
      >
        <ContentHeader.Cell inner>
          <ContentHeader.ProfileItem
            image={skProfile.photoFilePath || profileImg}
            name={skProfile.profileViewName}
            company={parsePolyglotString(skProfile.companyName)}
            department={parsePolyglotString(skProfile.departmentName)}
            imageEditable={false}
            myPageActive
            type="Recommend"
          />
        </ContentHeader.Cell>
        <ContentHeader.Cell inner>
          {skProfile.companyCode && (
            <ChannelsHeaderInfoContainer companyCode={skProfile.companyCode} />
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
            favoriteChannelCount={99 || 0}
          />
        </ContentHeader.Cell>
      </ContentHeaderRecommand>
    );
  }
}

export default withRouter(ChannelsContentHeaderContainer);
