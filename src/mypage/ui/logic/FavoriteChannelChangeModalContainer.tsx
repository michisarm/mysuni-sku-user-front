import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon, Modal, Accordion, Checkbox } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { SkProfileService, StudySummary } from '../../../profile';
import { CollegeModel, ChannelModel, CollegeService } from '../../../college';

interface Props {
  skProfileService? : SkProfileService
  collegeService? : CollegeService

  trigger?: React.ReactNode
  favorites : ChannelModel[]
  onConfirmCallback:() => void
}

interface State{
  open: boolean
  searchKey : string
  selectedCollegeIds: string[]
  favoriteChannels : ChannelModel [];
}

const color : string [] = ['purple', 'violet', 'yellow', 'orange', 'red', 'green', 'blue', 'teal'];

@inject('skProfileService', 'collegeService')
@observer
@reactAutobind
class FavoriteChannelChangeModalContainer extends Component<Props, State> {
  //
  state={
    open: false,
    searchKey: '',
    selectedCollegeIds: [],
    favoriteChannels: [],
  };

  componentDidMount(): void {
    const { collegeService } = this.props;

    if (collegeService) {
      collegeService.findAllColleges();
    }
  }

  onOpenModal() {
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
    const { skProfileService, collegeService, onConfirmCallback } = this.props;
    if (skProfileService && collegeService) {
      skProfileService.setStudySummaryProp('favoriteChannels', collegeService.favoriteChannelIdNames);
      skProfileService.modifyStudySummary(StudySummary.asNameValues(skProfileService.studySummary))
        .then(() => {
          if (onConfirmCallback && typeof onConfirmCallback === 'function') onConfirmCallback();
          this.onCloseModal();
        });
    }
  }

  onSelectChannel(channel: ChannelModel) {
    //
    let { favoriteChannels }: State = this.state;
    if (favoriteChannels.map(favoriteChannel => favoriteChannel.id).includes(channel.id)) {
      favoriteChannels = favoriteChannels.filter(favoriteChannel => favoriteChannel.id !== channel.id);
    }
    else favoriteChannels.push(channel);
    this.setState({ favoriteChannels });
  }

  searchKey(event : any) {
    this.setState({
      searchKey: event.target.value,
    });
  }


  onSearch() {
    const { collegeService } = this.props;
    if (collegeService) {
      collegeService.findChannelByName(this.state.searchKey);
      //화면기획 불명확
      console.log(collegeService._channels.length);
    }
    //
  }

  onReset() {
    this.setState({ selectedCollegeIds: [], favoriteChannels: [ ...this.props.favorites ]});
  }

  handleClick(college: CollegeModel) {
    //
    let { selectedCollegeIds }: State = this.state;
    if (selectedCollegeIds.includes(college.collegeId)) {
      selectedCollegeIds = selectedCollegeIds.filter(collegeId => collegeId !== college.collegeId);
    }
    else selectedCollegeIds.push(college.collegeId);
    this.setState({ selectedCollegeIds });
  }

  render() {
    const { collegeService, trigger } = this.props;
    const { open, favoriteChannels, selectedCollegeIds }: State = this.state;
    const { colleges } = collegeService as CollegeService;

    return (

      <Modal
        size="large"
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
                    <div className="ui h30 search input">
                      <input type="text" placeholder="Search" onChange={this.searchKey}  />
                      <Icon className="clear link" />
                      <Icon className="search link" onClick={this.onSearch} />
                    </div>
                  </div>
                </div>
                <div className="cell v-middle">
                  <span className="text01">Selected</span>
                  <span className="count">
                    <span className="text01 add">{favoriteChannels.length}</span>
                    <span className="text02"> / 80
                    </span>
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
                        colleges && colleges.length
                        && (
                          <Accordion className="channel">
                            {
                              colleges.map((college: CollegeModel, index:number) => (
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
                                        college.channels && college.channels.length && college.channels.map((channel, index) => (
                                          <li key={`channel-${index}`}>
                                            <Checkbox
                                              label={channel.name}
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
