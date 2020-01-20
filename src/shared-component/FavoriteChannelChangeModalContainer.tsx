import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Icon, Modal, Accordion, Checkbox } from 'semantic-ui-react';
import { IdNameCount } from 'shared';
import { SkProfileService, StudySummary } from 'profile';
import { ChannelModel, CollegeService } from 'college';
import { CollegeLectureCountService } from 'lecture';
import classNames from 'classnames';
import CollegeLectureCountRdo from '../lecture/shared/model/CollegeLectureCountRdo';



interface Props {
  skProfileService?: SkProfileService
  collegeService?: CollegeService
  collegeLectureCountService?: CollegeLectureCountService

  trigger?: React.ReactNode
  favorites: ChannelModel[]
  onConfirmCallback: () => void
}

interface State {
  open: boolean
  focus: boolean
  searchKey: string
  selectedCollegeIds: string[]
  favoriteChannels: ChannelModel [];
}

const color : string [] = ['purple', 'violet', 'yellow', 'orange', 'red', 'green', 'blue', 'teal'];

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'lecture.collegeLectureCountService',
  'college.collegeService',
))
@observer
@reactAutobind
class FavoriteChannelChangeModalContainer extends Component<Props, State> {
  //
  state = {
    open: false,
    focus: false,
    searchKey: '',
    selectedCollegeIds: [],
    favoriteChannels: [],
  };


  onOpenModal() {
    //
    this.props.collegeService!.findChannelByName(this.state.searchKey);
    this.props.collegeLectureCountService!.findCollegeLectureCounts();
    this.setState({
      open: true,
      favoriteChannels: [ ...this.props.favorites ],
    });
  }

  onCloseModal() {
    this.setState({
      open: false,
      selectedCollegeIds: [],
      favoriteChannels: [],
    });
  }

  onConfirm() {
    //favoriteChannel 변경사항 저장하기
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

  onSelectChannel(channel: IdNameCount | ChannelModel) {
    //
    let { favoriteChannels }: State = this.state;

    if (favoriteChannels.map(favoriteChannel => favoriteChannel.id).includes(channel.id)) {
      favoriteChannels = favoriteChannels.filter(favoriteChannel => favoriteChannel.id !== channel.id);
    }
    else {
      favoriteChannels.push(new ChannelModel(channel));
    }
    this.setState({ favoriteChannels });
  }

  searchKey(event : any) {
    this.setState({
      searchKey: event.target.value,
    });
  }

  onSearch() {
    const { collegeService } = this.props;

    collegeService!.findChannelByName(this.state.searchKey);
  }

  onReset() {
    this.setState({ selectedCollegeIds: [], favoriteChannels: []});
  }

  handleClick(college: CollegeLectureCountRdo) {
    //
    let { selectedCollegeIds }: State = this.state;

    if (selectedCollegeIds.includes(college.collegeId)) {
      selectedCollegeIds = selectedCollegeIds.filter(collegeId => collegeId !== college.collegeId);
    }
    else {
      selectedCollegeIds.push(college.collegeId);
    }
    this.setState({ selectedCollegeIds });
  }

  render() {
    const { collegeService, collegeLectureCountService, trigger } = this.props;
    const { open, favoriteChannels, selectedCollegeIds }: State = this.state;
    const { channels } = collegeService!;
    const { collegeLectureCounts } = collegeLectureCountService!;
    const channelIds = channels.map(channel => channel.channelId);

    return (
      <Modal
        open={open}
        onOpen={this.onOpenModal}
        onClose={this.onCloseModal}
        className="base w1000"
        trigger={trigger}
      >
        <Modal.Header className="res">
          관심 Channel 변경
          <span className="sub f12">맞춤형 학습카드 추천을 위한 관심 채널을 3개 이상 선택해주세요.</span>
        </Modal.Header>
        <Modal.Content>
          <div className="channel-change">

            <div className="table-css">
              <div className="row head">
                <div className="cell v-middle">
                  <span className="text01">Channel list</span>
                  <div className="right">
                    <div className={classNames('ui h30 search input', { focus: this.state.focus, write: this.state.searchKey })}>
                      <input
                        type="text"
                        placeholder="Search"
                        value={this.state.searchKey}
                        onChange={this.searchKey}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') this.onSearch();
                        }}
                        onClick={() => this.setState({ focus: true })}
                        onBlur={() => this.setState({ focus: false })}
                      />
                      <Icon className="clear link" onClick={() => this.setState({ searchKey: '' }, this.onSearch)} />
                      <Icon className="search link" onClick={this.onSearch} />
                    </div>
                  </div>
                </div>
                <div className="cell v-middle">
                  <span className="text01">Selected</span>
                  <span className="count">
                    <span className="text01 add">{favoriteChannels.length}</span>
                    <span className="text02" />
                  </span>
                  <div className="right">
                    <button className="clear" onClick={this.onReset}>
                      <i className="icon reset">
                        <span className="blind">reset</span>
                      </i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="cell vtop">
                  <div className="select-area">
                    <div className="scrolling-60vh">
                      {
                        collegeLectureCounts && collegeLectureCounts.length
                        && (
                          <Accordion className="channel">
                            {
                              collegeLectureCounts.map((college: CollegeLectureCountRdo, index:number) => (
                                <div key={`college-${index}`}>
                                  <Accordion.Title
                                    active={selectedCollegeIds.includes(college.collegeId)}
                                    onClick={() => this.handleClick(college)}
                                  >
                                    <span className={`name ${color[index]}`}>{college.name}</span>
                                    <Icon />
                                  </Accordion.Title>
                                  <Accordion.Content active={selectedCollegeIds.includes(college.collegeId)}>
                                    <ul>
                                      {
                                        college.channelCounts && college.channelCounts.length
                                        && college.channelCounts.filter(channel => channelIds.includes(channel.id)).map((channel, index) => (
                                          <li key={`channel-${index}`}>
                                            <Checkbox
                                              label={`${channel.name}(${channel.count})`}
                                              name={channel.name}
                                              className="base"
                                              checked={favoriteChannels.map(favoriteChannel => favoriteChannel.id).includes(channel.id)}
                                              onChange={() => this.onSelectChannel(channel)}
                                            />
                                          </li>
                                        ))
                                    }
                                    </ul>
                                  </Accordion.Content>
                                </div>
                              ))
                            }
                          </Accordion>
                        ) || (
                        <div className="search-empty">
                          <Icon className="rocket50" />
                          <div>검색된 Channel이 없습니다.</div>
                        </div>
                        )
                      }
                    </div>
                  </div>
                </div>
                <div className="cell vtop">
                  <div className="select-area">
                    <div className="scrolling-60vh">
                      <div className="select-item">
                        {
                          favoriteChannels && favoriteChannels.length && favoriteChannels.map((channel: ChannelModel) => (
                            <Button className="del"
                              key={`del_${channel.id}`}
                              onClick={() => this.onSelectChannel(channel)}
                            >
                              {channel.name}
                            </Button>
                          )) || ''
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {/* // .select-item */}
              </div>
            </div>
          </div>
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
