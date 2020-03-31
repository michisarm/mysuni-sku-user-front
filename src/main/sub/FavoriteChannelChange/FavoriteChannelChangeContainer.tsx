
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { createBrowserHistory } from 'history';

import { Button } from 'semantic-ui-react';
import { IdNameCount } from 'shared/model';
import { StudySummaryModel } from 'profile/model';
import { ActionLogService } from 'shared/stores';
import { SkProfileService } from 'profile/stores';
import { ChannelModel, CollegeType } from 'college/model';
import { CollegeService } from 'college/stores';
import { CollegeLectureCountRdo } from 'lecture/model';
import { CollegeLectureCountService } from 'lecture/stores';
import HeaderContainer from './HeaderContainer';
import { ContentWrapper } from './FavoriteChannelChangeElementsView';
import FavoriteChannelChangeView from './FavoriteChannelChangeView';

export const history = createBrowserHistory();

interface Props {
  actionLogService?: ActionLogService
  skProfileService?: SkProfileService
  collegeService?: CollegeService
  collegeLectureCountService?: CollegeLectureCountService

  trigger?: React.ReactNode
  favorites: ChannelModel[]
  onConfirmCallback: () => void
}

interface State {
  selectedCollegeIds: string[]
  favoriteChannels: ChannelModel[];
  favoriteCompanyChannels: ChannelModel[];
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
  'profile.skProfileService',
  'shared.collegeService',
  'lecture.collegeLectureCountService',
))
@observer
@reactAutobind
class FavoriteChannelChangeContainer extends Component<Props, State> {
  //
  state = {
    selectedCollegeIds: [],
    favoriteChannels: [],
    favoriteCompanyChannels: [],
  };

  componentDidMount(): void {
    //alert('componentDidMount');
    this.onOpenModal();
  }

  componentWillUnmount(): void {
    this.onClickActionLog('componentWillUnmount');

    this.setState({
      selectedCollegeIds: [],
      favoriteChannels: [],
    });
  }

  setDefaultFavorites(favoriteChannels: ChannelModel[], colleges: CollegeLectureCountRdo[]) {
    //
    const companyChannels = colleges
      .filter(college => college.collegeType === CollegeType.Company)
      .map(college =>
        college.channelCounts.map(channel => new ChannelModel({ channelId: channel.id, name: channel.name }))
      )
      .flat();

    const favoriteChannelsWithoutCompany = favoriteChannels.filter(channel =>
      !companyChannels.some(companyChannel => companyChannel.channelId === channel.channelId)
    );

    this.setState({
      favoriteChannels: favoriteChannelsWithoutCompany,
      favoriteCompanyChannels: companyChannels,
    });
  }

  async onOpenModal() {
    //
    this.props.skProfileService!.findStudySummary();

    const { collegeService, collegeLectureCountService } = this.props;
    const { skProfileService } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService!;

    const favoriteChannels = studySummaryFavoriteChannels.map((channel) =>
      new ChannelModel({ ...channel, channelId: channel.id, checked: true })
    );

    this.setState({
      favoriteChannels,
    });

    collegeService!.findChannelByName('');
    const colleges = await collegeLectureCountService!.findCollegeLectureCounts();

    this.setDefaultFavorites(favoriteChannels, colleges);
  }

  onCloseModal() {
    //
    this.onClickActionLog('Cancel');

    this.setState({
      selectedCollegeIds: [],
      favoriteChannels: [],
    });

    history.goBack();
  }

  onConfirm() {
    //
    const { skProfileService, onConfirmCallback } = this.props;
    const { favoriteChannels, favoriteCompanyChannels } = this.state;

    const nextFavoriteChannels = [...favoriteChannels, ...favoriteCompanyChannels];

    this.onClickActionLog('Confirm');

    skProfileService!.setStudySummaryProp('favoriteChannels', { idNames: nextFavoriteChannels });
    skProfileService!.modifyStudySummary(StudySummaryModel.asNameValues(skProfileService!.studySummary))
      .then(() => {
        if (typeof onConfirmCallback === 'function') {
          onConfirmCallback();
        }
        this.onCloseModal();
      });
  }

  onSearch(e: any, searchKey: string) {
    //
    const { actionLogService, collegeService } = this.props;

    actionLogService?.registerClickActionLog({ subAction: 'search', subContext: searchKey });

    collegeService!.findChannelByName(searchKey);
  }

  onReset() {
    //
    const { collegeLectureCounts } = this.props.collegeLectureCountService!;

    this.setState({ selectedCollegeIds: []});
    this.setDefaultFavorites([], collegeLectureCounts);
  }

  onToggleCollege(college: CollegeLectureCountRdo) {
    //
    let { selectedCollegeIds }: State = this.state;

    this.onClickActionLog(college.name);

    if (selectedCollegeIds.includes(college.collegeId)) {
      selectedCollegeIds = selectedCollegeIds.filter(collegeId => collegeId !== college.collegeId);
    }
    else {
      selectedCollegeIds.push(college.collegeId);
    }
    this.setState({ selectedCollegeIds: [...selectedCollegeIds]});
  }

  onToggleChannel(channel: IdNameCount | ChannelModel) {
    //
    let { favoriteChannels }: State = this.state;

    this.onClickActionLog(channel.name);

    if (favoriteChannels.map(favoriteChannel => favoriteChannel.id).includes(channel.id)) {
      favoriteChannels = favoriteChannels.filter(favoriteChannel => favoriteChannel.id !== channel.id);
    }
    else {
      favoriteChannels.push(new ChannelModel(channel));
    }
    this.setState({ favoriteChannels: [...favoriteChannels]});
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  render() {
    //
    const { collegeService, collegeLectureCountService } = this.props;
    const { favoriteChannels, favoriteCompanyChannels, selectedCollegeIds }: State = this.state;
    const { channelIds } = collegeService!;
    const { collegeLectureCounts, totalChannelCount } = collegeLectureCountService!;

    return (
      <section className="content f-channel">
        <div className="cont-inner">
          <div className="res header">
            관심 Channel 변경
            <span className="sub f12">맞춤형 학습카드 추천을 위한 관심 채널을 3개 이상 선택해주세요.</span>
          </div>
          <div>
            <ContentWrapper>
              <HeaderContainer
                selectedChannelCount={favoriteChannels.length + favoriteCompanyChannels.length}
                totalChannelCount={totalChannelCount}
                onSearch={this.onSearch}
                onResetSelected={this.onReset}
              />

              <FavoriteChannelChangeView
                colleges={collegeLectureCounts}
                channelIds={channelIds}
                favoriteChannels={favoriteChannels}
                favoriteCompanyChannels={favoriteCompanyChannels}
                selectedCollegeIds={selectedCollegeIds}
                onToggleCollege={this.onToggleCollege}
                onToggleChannel={this.onToggleChannel}
              />
            </ContentWrapper>
          </div>
          <div className="actions" style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
            <Button className="w190 pop d" onClick={this.onCloseModal}>Cancel</Button>&nbsp;
            <Button className="w190 pop p" onClick={this.onConfirm}>Confirm</Button>
          </div>
        </div>
      </section>
    );
  }
}

export default FavoriteChannelChangeContainer;
