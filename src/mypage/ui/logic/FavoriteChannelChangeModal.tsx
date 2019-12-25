import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon, Modal, Accordion, Checkbox } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { SkProfileService } from '../../../profile';
import { CollegeModel, ChannelModel, CollegeService } from '../../../college';

interface Props {
  skProfileService? : SkProfileService
  collegeService? : CollegeService

  favorites : ChannelModel[]
  open : boolean
  handleClose : ()=>void
  handleConfirm : ()=>void
}

interface State{
  searchKey : string
  activeIndex : number
}

const color : string [] = ['purple', 'violet', 'yellow', 'orange', 'red', 'green', 'blue', 'teal'];

@inject('skProfileService', 'collegeService')
@observer
@reactAutobind
class FavoriteChannelChangeModal extends Component<Props, State> {

  state={
    searchKey: '',
    activeIndex: 0,
  };

  componentDidMount(): void {
    const { collegeService, favorites } = this.props;

    if (collegeService) {
      collegeService.findAllColleges();
      collegeService.setChannels(favorites);
    }
  }

  onSelectChannel(e:any, checkboxProps : any) {
    const { collegeService } = this.props;

    if (collegeService) {
      collegeService.selectChannel(checkboxProps.id, checkboxProps.name, checkboxProps.checked);
    }
  }

  onDeselectChannel(e:any, buttonProps:any) {
    const { collegeService } = this.props;
    if (collegeService) {
      collegeService.deselectChannel(buttonProps.id);
    }
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
    const { collegeService } = this.props;
    if (collegeService) {
      collegeService.clearFavoriteChannels();
      //college channel checked false로 변경
    }
  }

  handleClick(e : any, titleProps:any) {
    const { collegeService } = this.props;
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    if (collegeService && (activeIndex !== index)) {
      collegeService.setCollege(titleProps.college);
      collegeService.setSelectChannels();
      collegeService.setFavoriteChannel();
    }

    this.setState({
      activeIndex: newIndex,
    });
  }

  render() {
    const { open, handleClose, handleConfirm, collegeService } = this.props;
    const { colleges, favoriteChannels } = collegeService as CollegeService;

    const { activeIndex } = this.state;

    return (

      <Modal size="large" open={open} onClose={handleClose} className="base w1000">

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
                              colleges.map((college:CollegeModel, index:number) => (
                                <div key={`college-${index}`}>
                                  <Accordion.Title
                                    active={activeIndex === index}
                                    index={index}
                                    college={college}
                                    onClick={(e, titleProps) => this.handleClick(e, titleProps)}
                                  >
                                    <span className={`name ${color[index]}`}>{college.name}</span>
                                    <Icon />
                                  </Accordion.Title>
                                  <Accordion.Content active={activeIndex === index}>
                                    <ul>
                                      {
                                        college.channels && college.channels.length && college.channels.map((channel, index) => (
                                          <li key={`channel-${index}`}>
                                            <Checkbox
                                              label={channel.name}
                                              name={channel.name}
                                              id={channel.id}
                                              className="base"
                                              onChange={(e, checkboxProps ) => this.onSelectChannel(e, checkboxProps)}
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
                          favoriteChannels && favoriteChannels.length && favoriteChannels.map((channel, index) => (
                            <Button className="del"
                              key={`del_${index}`}
                              id={channel.id}
                              onClick={(event, buttonProps) => this.onDeselectChannel(event, buttonProps)}
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
          <Button className="w190 pop d" onClick={handleClose}>Cancel</Button>
          <Button className="w190 pop p" onClick={handleConfirm}>Confirm</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FavoriteChannelChangeModal;
