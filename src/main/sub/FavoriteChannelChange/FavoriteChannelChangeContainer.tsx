import React, { Component } from 'react';
import { reactAutobind, mobxHelper, IdName } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { createBrowserHistory } from 'history';

import { Button } from 'semantic-ui-react';
import { IdNameCount } from 'shared/model';
import { StudySummaryModel } from 'profile/model';
import { SkProfileService } from 'profile/stores';
import { ChannelModel, CollegeType } from 'college/model';
import { CollegeService } from 'college/stores';
import { CollegeLectureCountRdo } from 'lecture/model';
import { CollegeLectureCountService } from 'lecture/stores';
import HeaderContainer from './HeaderContainer';
import { ContentWrapper } from './FavoriteChannelChangeElementsView';
import FavoriteChannelChangeView from './FavoriteChannelChangeView';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  compareCollgeCineroom,
  getChannelName,
} from '../../../shared/service/useCollege/useRequestCollege';
import { registerPromotionEvent } from 'main/sub/PersonalBoard/api/personalBoardApi';

export const history = createBrowserHistory();

interface Props {
  skProfileService?: SkProfileService;
  collegeService?: CollegeService;
  collegeLectureCountService?: CollegeLectureCountService;

  trigger?: React.ReactNode;
  favorites: ChannelModel[];
  onConfirmCallback: () => void;
}

interface State {
  selectedCollegeIds: string[];
  favoriteChannels: ChannelModel[];
  favoriteCompanyChannels: ChannelModel[];
}

@inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'shared.collegeService',
    'lecture.collegeLectureCountService'
  )
)
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
    this.onOpenModal();
  }

  componentWillUnmount(): void {
    this.setState({
      selectedCollegeIds: [],
      favoriteChannels: [],
    });
  }

  setDefaultFavorites(
    favoriteChannels: ChannelModel[],
    colleges: CollegeLectureCountRdo[]
  ) {
    //
    const companyChannels = colleges
      .filter((college) => compareCollgeCineroom(college.id))
      .map((college) =>
        college.channelIds.map(
          (id) => new ChannelModel({ channelId: id, name: getChannelName(id) })
        )
      )
      .flat();

    const favoriteChannelsWithoutCompany = favoriteChannels.filter(
      (channel) =>
        !companyChannels.some(
          (companyChannel) => companyChannel.channelId === channel.channelId
        )
    );

    this.setState({
      favoriteChannels: favoriteChannelsWithoutCompany,
      favoriteCompanyChannels: companyChannels,
    });
  }

  async onOpenModal() {
    //
    await this.props.skProfileService!.findStudySummary();

    const { collegeService, collegeLectureCountService } = this.props;
    const { skProfileService } = this.props;
    const { studySummaryFavoriteChannels } = skProfileService!;

    const favoriteChannels = studySummaryFavoriteChannels.map(
      (channelId) =>
        new ChannelModel({
          id: channelId,
          name: getChannelName(channelId),
          channelId,
          checked: true,
        })
    );

    this.setState({
      favoriteChannels,
    });

    collegeService!.findChannelByName('');
    const colleges =
      await collegeLectureCountService!.findCollegeLectureCounts();

    this.setDefaultFavorites(favoriteChannels, colleges);
  }

  onCloseModal() {
    //
    this.setState({
      selectedCollegeIds: [],
      favoriteChannels: [],
    });

    window.location.href = '/';
    //history.goBack();
  }

  onConfirm() {
    //
    const { skProfileService, onConfirmCallback } = this.props;
    const { favoriteChannels, favoriteCompanyChannels } = this.state;

    const nextFavoriteChannels = [
      ...favoriteChannels,
      ...favoriteCompanyChannels,
    ];

    skProfileService!.setStudySummaryProp('favoriteChannels', {
      idNames: nextFavoriteChannels,
    });
    skProfileService!
      .modifyStudySummary(
        StudySummaryModel.asNameValues(skProfileService!.studySummary)
      )
      .then(() => {
        registerPromotionEvent('favoriteChannel202202');  // insert event
        if (typeof onConfirmCallback === 'function') {
          onConfirmCallback();
        }
        this.onCloseModal();
      });
  }

  onSearch(e: any, searchKey: string) {
    //
    const { collegeService } = this.props;
    collegeService!.findChannelByName(searchKey);
  }

  onReset() {
    //
    const { collegeLectureCounts } = this.props.collegeLectureCountService!;

    this.setState({ selectedCollegeIds: [] });
    this.setDefaultFavorites([], collegeLectureCounts);
  }

  onToggleCollege(college: CollegeLectureCountRdo) {
    //
    let { selectedCollegeIds }: State = this.state;

    if (selectedCollegeIds.includes(college.id)) {
      selectedCollegeIds = selectedCollegeIds.filter(
        (collegeId) => collegeId !== college.id
      );
    } else {
      selectedCollegeIds.push(college.id);
    }
    this.setState({ selectedCollegeIds: [...selectedCollegeIds] });
  }

  onToggleChannel(channel: IdName | ChannelModel) {
    //
    let { favoriteChannels }: State = this.state;

    if (
      favoriteChannels
        .map((favoriteChannel) => favoriteChannel.id)
        .includes(channel.id)
    ) {
      favoriteChannels = favoriteChannels.filter(
        (favoriteChannel) => favoriteChannel.id !== channel.id
      );
    } else {
      favoriteChannels.push(new ChannelModel(channel));
    }
    this.setState({ favoriteChannels: [...favoriteChannels] });
  }

  render() {
    //
    const { collegeService, collegeLectureCountService } = this.props;
    const {
      favoriteChannels,
      favoriteCompanyChannels,
      selectedCollegeIds,
    }: State = this.state;
    const { channelIds } = collegeService!;
    const { collegeLectureCounts, totalChannelCount } =
      collegeLectureCountService!;

    return (
      <section className="content f-channel">
        <div className="cont-inner">
          <div className="res header">
            <PolyglotText
              defaultString="관심 Channel 변경"
              id="home-ChannelChangeModal-타이틀"
            />
            <span className="sub f12">
              <PolyglotText
                defaultString="맞춤형 학습카드 추천을 위한 관심 채널을 3개 이상 선택해주세요."
                id="home-ChannelChangeModal-설명"
              />
            </span>
          </div>
          <div>
            <ContentWrapper>
              <HeaderContainer
                selectedChannelCount={
                  favoriteChannels.length + favoriteCompanyChannels.length
                }
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
          <div
            className="actions"
            style={{
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <Button className="w190 pop d" onClick={this.onCloseModal}>
              Cancel
            </Button>
            &nbsp;
            <Button className="w190 pop p" onClick={this.onConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </section>
    );
  }
}

export default FavoriteChannelChangeContainer;
