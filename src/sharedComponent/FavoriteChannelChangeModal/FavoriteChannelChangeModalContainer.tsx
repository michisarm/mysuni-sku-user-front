
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Modal } from 'semantic-ui-react';
import { SkProfileService, StudySummary } from 'profile';
import { CollegeService, CollegeModel, ChannelModel } from 'college';
import { ContentWrapper, Header } from './FavoriteChannelChangeElementsView';
import FavoriteChannelChangeView from './FavoriteChannelChangeView';


interface Props {
  skProfileService?: SkProfileService
  collegeService?: CollegeService

  trigger?: React.ReactNode
  favorites: ChannelModel[]
  onConfirmCallback: () => void
}

interface State {
  open: boolean
  searchKey: string
  selectedCollegeIds: string[]
  favoriteChannels: ChannelModel [];
}

@inject(mobxHelper.injectFrom('profile.skProfileService', 'college.collegeService'))
@observer
@reactAutobind
class FavoriteChannelChangeModalContainer extends Component<Props, State> {
  //
  state = {
    open: false,
    searchKey: '',
    selectedCollegeIds: [],
    favoriteChannels: [],
  };


  onOpenModal() {
    //
    this.props.collegeService!.findAllColleges();
    this.setState({
      open: true,
      favoriteChannels: [ ...this.props.favorites ],
    });
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
    const { favoriteChannels } = this.state;

    skProfileService!.setStudySummaryProp('favoriteChannels', { idNames: favoriteChannels });
    skProfileService!.modifyStudySummary(StudySummary.asNameValues(skProfileService!.studySummary))
      .then(() => {
        if (typeof onConfirmCallback === 'function') {
          onConfirmCallback();
        }
        this.onCloseModal();
      });
  }

  onChangeSearchKey(event : any) {
    //
    this.setState({
      searchKey: event.target.value,
    });
  }

  onSearch() {
    //
    const { collegeService } = this.props;

    collegeService!.findChannelByName(this.state.searchKey);
  }

  onReset() {
    this.setState({ selectedCollegeIds: [], favoriteChannels: []});
  }

  onToggleCollege(college: CollegeModel) {
    //
    let { selectedCollegeIds }: State = this.state;

    if (selectedCollegeIds.includes(college.collegeId)) {
      selectedCollegeIds = selectedCollegeIds.filter(collegeId => collegeId !== college.collegeId);
    }
    else {
      selectedCollegeIds.push(college.collegeId);
    }
    this.setState({ selectedCollegeIds: [...selectedCollegeIds]});
  }

  onToggleChannel(channel: ChannelModel) {
    //
    let { favoriteChannels }: State = this.state;

    if (favoriteChannels.map(favoriteChannel => favoriteChannel.id).includes(channel.id)) {
      favoriteChannels = favoriteChannels.filter(favoriteChannel => favoriteChannel.id !== channel.id);
    }
    else {
      favoriteChannels.push(new ChannelModel(channel));
    }
    this.setState({ favoriteChannels: [...favoriteChannels]});
  }

  render() {
    //
    const { collegeService, trigger } = this.props;
    const { open, favoriteChannels, selectedCollegeIds }: State = this.state;
    const { colleges } = collegeService!;

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
            <Header
              favoriteChannels={favoriteChannels}
              onChangeSearchKey={this.onChangeSearchKey}
              onSearch={this.onSearch}
              onResetSelected={this.onReset}
            />

            <FavoriteChannelChangeView
              colleges={colleges}
              favoriteChannels={favoriteChannels}
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
