import React, { Component } from 'react';
import { reactAutobind, mobxHelper, IdName } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { Button, Modal } from 'semantic-ui-react';
import { SkProfileService } from 'profile/stores';
import { ChannelModel, CollegeType } from 'college/model';
import { CollegeService } from 'college/stores';
import { CollegeLectureCountRdo } from 'lecture/model';
import { CollegeLectureCountService } from 'lecture/stores';
import HeaderContainer from './HeaderContainer';
import { ContentWrapper } from './FavoriteChannelChangeElementsView';
import FavoriteChannelChangeView from './FavoriteChannelChangeView';
import { PolyglotText } from '../../ui/logic/PolyglotText';
import {
  compareCollgeCineroom,
  getChannelName,
} from '../../service/useCollege/useRequestCollege';

interface Props {
  skProfileService?: SkProfileService;
  collegeService?: CollegeService;
  collegeLectureCountService?: CollegeLectureCountService;

  trigger?: React.ReactNode;
  favorites: string[];
  onConfirmCallback: () => void;
}

interface State {
  open: boolean;
  selectedCollegeIds: string[];
  favoriteChannels: string[];
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
class FavoriteChannelChangeModalContainer extends Component<Props, State> {
  //
  state: State = {
    open: false,
    selectedCollegeIds: [],
    favoriteChannels: [],
  };

  setDefaultFavorites(favoriteChannels: string[]) {
    //
    this.setState({
      favoriteChannels,
    });
  }

  async onOpenModal() {
    //
    const { collegeService, favorites } = this.props;
    const favoriteChannels = [...favorites];

    this.setState({
      open: true,
      favoriteChannels,
    });

    collegeService!.findChannelByName('');

    this.setDefaultFavorites(favoriteChannels);
  }

  onCloseModal() {
    //
    this.setState({
      open: false,
      selectedCollegeIds: [],
      favoriteChannels: [],
    });
  }

  onConfirm() {
    //
    const { skProfileService, onConfirmCallback } = this.props;
    const {
      favoriteChannels,
      // favoriteCompanyChannels
    } = this.state;
    const nextFavoriteChannels = [
      ...favoriteChannels,
      // ...favoriteCompanyChannels.map((item) => item.id),
    ];

    const params = {
      nameValues: [
        {
          name: 'favoriteChannelIds',
          value: JSON.stringify(nextFavoriteChannels),
        },
      ],
    };

    skProfileService!.modifyStudySummary(params).then(() => {
      if (typeof onConfirmCallback === 'function') {
        onConfirmCallback();
      }
      skProfileService?.findSkProfile();
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
        .filter((college) => {
          const searchedChannels = college.channelIds.filter((id) =>
            channelIds.includes(id)
          );
          return searchedChannels.length > 0 ? college : null;
        })
        .map((college) => college.id)
        .forEach((collegeId) => this.onToggleCollege(collegeId));
    }
  }

  onReset() {
    //
    this.setState({ selectedCollegeIds: [] });
    this.setDefaultFavorites([]);
  }

  onToggleCollege(collegeId: string) {
    //
    let { selectedCollegeIds }: State = this.state;

    if (selectedCollegeIds.includes(collegeId)) {
      selectedCollegeIds = selectedCollegeIds.filter(
        (selectedCollegeId) => selectedCollegeId !== collegeId
      );
    } else {
      selectedCollegeIds.push(collegeId);
    }
    this.setState({ selectedCollegeIds: [...selectedCollegeIds] });
  }

  onToggleChannel(channelId: string) {
    const { favoriteChannels }: State = this.state;

    let updatedFavoriteChannels: string[];
    if (favoriteChannels.includes(channelId)) {
      updatedFavoriteChannels = favoriteChannels.filter(
        (favoriteChannelId) => favoriteChannelId !== channelId
      );
    } else {
      updatedFavoriteChannels = [channelId, ...favoriteChannels];
    }
    this.setState({ favoriteChannels: [...updatedFavoriteChannels] });
  }

  render() {
    //
    const { collegeService, collegeLectureCountService, trigger } = this.props;
    const {
      open,
      favoriteChannels,
      // favoriteCompanyChannels,
      selectedCollegeIds,
    }: State = this.state;
    const { channelIds } = collegeService!;
    const { collegeLectureCounts, totalChannelCount } =
      collegeLectureCountService!;

    return (
      <Modal
        className="base w1000"
        trigger={trigger}
        open={open}
        onOpen={this.onOpenModal}
        onClose={this.onCloseModal}
      >
        <Modal.Header className="res">
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
        </Modal.Header>
        <Modal.Content>
          <ContentWrapper>
            <HeaderContainer
              selectedChannelCount={favoriteChannels.length}
              totalChannelCount={totalChannelCount}
              onSearch={this.onSearch}
              onResetSelected={this.onReset}
            />

            <FavoriteChannelChangeView
              colleges={collegeLectureCounts}
              channelIds={channelIds}
              favoriteChannels={favoriteChannels}
              selectedCollegeIds={selectedCollegeIds}
              onToggleCollege={this.onToggleCollege}
              onToggleChannel={this.onToggleChannel}
            />
          </ContentWrapper>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.onCloseModal}>
            <PolyglotText
              defaultString="Cancel"
              id="home-ChannelChangeModal-취소"
            />
          </Button>
          <Button className="w190 pop p" onClick={this.onConfirm}>
            <PolyglotText
              defaultString="Confirm"
              id="home-ChannelChangeModal-승인"
            />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FavoriteChannelChangeModalContainer;
