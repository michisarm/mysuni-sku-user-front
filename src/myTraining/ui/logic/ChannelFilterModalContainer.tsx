import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

import { Button, Modal } from 'semantic-ui-react';
import { CollegeModel, ChannelModel, CollegeService } from 'college';
import { LectureCountService } from 'lecture';


interface Props {
  collegeService? : CollegeService
  lectureCountService? : LectureCountService

  trigger?: React.ReactNode
  channels?: ChannelModel[]
  onFilter?:(channels: ChannelModel[]) => void
}

interface State{
  open: boolean
  searchKey : string
  selectedCollege: CollegeModel | null
  channels : ChannelModel [];
}


@inject(mobxHelper.injectFrom('lecture.lectureCountService', 'college.collegeService'))
@observer
@reactAutobind
class ChannelFilterModalContainer extends Component<Props, State> {
  //
  state = {
    open: false,
    searchKey: '',
    selectedCollege: null,
    channels: [],
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
      channels: [ ...this.props.channels || [] ],
    });
  }

  onCloseModal() {
    this.setState({
      open: false,
      selectedCollege: null,
      channels: [],
    });
  }

  onFilter() {
    //favoriteChannel 변경사항 저장하기
    const { onFilter } = this.props;
    if (onFilter) onFilter(this.state.channels);
    this.onCloseModal();
  }

  onSelectChannel(channel: ChannelModel) {
    //
    let { channels }: State = this.state;
    if (channels.map(ch => ch.id).includes(channel.id)) {
      channels = channels.filter(ch => ch.id !== channel.id);
    }
    else channels.push(new ChannelModel(channel));
    this.setState({ channels });
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
    }
    //
  }

  onReset() {
    this.setState({ selectedCollege: null, channels: []});
  }

  handleClick(college: CollegeModel) {
    //
    const { lectureCountService } = this.props;
    this.setState({ selectedCollege: college });
    lectureCountService!.findLectureCountByCollegeId(college.collegeId, college.channels);
  }

  render() {
    const { collegeService, trigger, lectureCountService } = this.props;
    const { open, channels, selectedCollege }: State = this.state;
    const { colleges } = collegeService as CollegeService;
    const { channelLectureCounts } = lectureCountService as LectureCountService;

    return (

      <Modal
        open={open}
        onOpen={this.onOpenModal}
        onClose={this.onCloseModal}
        className="base w1000"
        trigger={trigger}
      >
        <Modal.Header>
          List Filter
        </Modal.Header>
        <Modal.Content>
          <div className="filter-wrap">
            <div className="column">
              <div className="f-tit">College</div>
              <div className="f-list">
                <div className="scrolling">
                  <div className="college">
                    {
                      colleges && colleges.length
                      && colleges.map((college: CollegeModel, index:number) => (
                        <Button
                          key={college.collegeId}
                          className={classNames({
                            toggle: true,
                            toggle3: true,
                            active: selectedCollege && college.collegeId === selectedCollege!.collegeId,
                          })}
                          onClick={() => this.handleClick(college)}
                        >
                          {college.name} ({college.channels.length})
                        </Button>
                      )) || null
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="f-tit">Channel</div>
              <div className="f-list">
                <div className="scrolling">
                  <div className="channel">
                    <ul>
                      {
                        selectedCollege && selectedCollege!.channels && selectedCollege!.channels.length
                        && selectedCollege!.channels.map((channel, index) => (
                          <li key={channel.channelId} onClick={() => this.onSelectChannel(channel)}>
                            <div className="ui checkbox base">
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={channels.map(ch => ch.id).includes(channel.id)}
                              />
                              <label>
                                {channel.name}
                                <span>
                                  ({
                                    channelLectureCounts && channelLectureCounts.length > 0
                                    && channelLectureCounts[index] && channelLectureCounts[index].lectureCount
                                  })
                                </span>
                              </label>
                            </div>
                          </li>
                        )) || null
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="f-tit">Selected <span className="counter"><span className="now">{channels.length}</span></span>
              </div>
              <div className="f-list">
                <div className="scrolling">
                  <div className="selected">
                    {/* 선택 전 */}
                    {
                      channels && channels.length
                      && channels.map((channel) => (
                        <Button
                          className="del"
                          key={`del_${channel.id}`}
                          onClick={() => this.onSelectChannel(channel)}
                        >
                          {channel.name}
                        </Button>
                      )) || (<div className="empty">Not Selected</div>)
                    }
                  </div>
                </div>
              </div>
            </div>
            <button className="clear" onClick={this.onReset}>
              <i className="icon reset"><span className="blind">reset</span></i>
            </button>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.onCloseModal}>Cancel</Button>
          <Button className="w190 pop p" onClick={this.onFilter}>Filter</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ChannelFilterModalContainer;
