
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { Button, Modal } from 'semantic-ui-react';
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
  open: boolean
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
class FavoriteChannelChangeModalContainer extends Component<Props, State> {
  //
  state = {
    open: false,
    selectedCollegeIds: [],
    favoriteChannels: [],
    favoriteCompanyChannels: [],
  };


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
    const { collegeService, collegeLectureCountService, favorites } = this.props;
    const favoriteChannels = [...favorites];

    this.setState({
      open: true,
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
      open: false,
      selectedCollegeIds: [],
      favoriteChannels: [],
    });
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

  async onSearch(e: any, searchKey: string) {
    const { collegeService, collegeLectureCountService } = this.props;
    await collegeService!.findChannelByName(searchKey);

    if (searchKey) {
      const { channelIds } = collegeService!;
      const { collegeLectureCounts } = collegeLectureCountService!;
      const colleges: CollegeLectureCountRdo[] = collegeLectureCounts;

      this.setState({ selectedCollegeIds: [] });
      colleges
        .filter(college => {
          const searchedChannels = college.channelCounts.filter(channel => channelIds.includes(channel.id));
          return searchedChannels.length > 0 ? college : null;
        })
        .map(college => college.collegeId)
        .forEach(collegeId => this.onToggleCollege(collegeId));
    }
  }

  onReset() {
    //
    const { collegeLectureCounts } = this.props.collegeLectureCountService!;

    this.setState({ selectedCollegeIds: [] });
    this.setDefaultFavorites([], collegeLectureCounts);
  }

  onToggleCollege(collegeId: string) {
    //
    let { selectedCollegeIds }: State = this.state;

    // this.onClickActionLog(college.name);

    if (selectedCollegeIds.includes(collegeId)) {
      selectedCollegeIds = selectedCollegeIds.filter(selectedCollegeId => selectedCollegeId !== collegeId);
    }
    else {
      selectedCollegeIds.push(collegeId);
    }
    this.setState({ selectedCollegeIds: [...selectedCollegeIds] });
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
    this.setState({ favoriteChannels: [...favoriteChannels] });
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  render() {
    //
    const { collegeService, collegeLectureCountService, trigger } = this.props;
    const { open, favoriteChannels, favoriteCompanyChannels, selectedCollegeIds }: State = this.state;
    const { channelIds } = collegeService!;
    const { collegeLectureCounts, totalChannelCount } = collegeLectureCountService!;

    return (
      <Modal
        className="base w1000"
        trigger={trigger}
        open={open}
        onOpen={this.onOpenModal}
        onClose={this.onCloseModal}
      >
        <Modal.Header className="res">
          관심 Channel 변경
          <span className="sub f12">맞춤형 학습카드 추천을 위한 관심 채널을 3개 이상 선택해주세요.</span>
        </Modal.Header>
        <Modal.Content>
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
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.onCloseModal}>Cancel</Button>
          <Button className="w190 pop p" onClick={this.onConfirm}>Confirm</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FavoriteChannelChangeModalContainer;
