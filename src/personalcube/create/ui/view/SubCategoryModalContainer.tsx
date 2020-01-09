import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { Accordion, Button, Checkbox, Icon, Modal } from 'semantic-ui-react';
import { ChannelModel, CollegeModel, CollegeService } from '../../../../college';
import { CategoryModel } from '../../../../shared';

interface Props {
  collegeService? : CollegeService

  trigger?: React.ReactNode
  channels?: ChannelModel[]
  onSubCategory:(channels: ChannelModel[]) => void
  colleges: CategoryModel[]
  //selectedChannels?:(channels: ChannelModel[]) => void
}

interface State{
  open: boolean
  //searchKey : string
  selectedCollege: CollegeModel | null
  channels : ChannelModel []
  colleges: CollegeModel []
  activeIndex: number
}

const color : string [] = ['purple', 'violet', 'yellow', 'orange', 'red', 'green', 'blue', 'teal'];

@inject(mobxHelper.injectFrom( 'college.collegeService'))
@observer
@reactAutobind
class SubCategoryModalContainer extends React.Component<Props, State> {
  //
  state = {
    open: false,
    // searchKey: '',
    selectedCollege: null,
    channels: [],
    activeIndex: 0,
    colleges: [],
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
    const { onSubCategory } = this.props;
    if (onSubCategory) onSubCategory(this.state.channels);
    this.onCloseModal();
  }

  onSelectChannel(channel: ChannelModel, college?: CollegeModel ) {
    //
    console.log(college);
    let { channels }: State = this.state;
    const { colleges }: State = this.state;
    if (channels.map(ch => ch.id).includes(channel.id)) {
      channels = channels.filter(ch => ch.id !== channel.id);
    }
    else channels.push(new ChannelModel(channel));
    this.setState({ channels, colleges });
  }

  onReset() {
    this.setState({ selectedCollege: null, channels: []});
  }

  handleClick(college: CollegeModel, index: number) {
    //
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex, selectedCollege: college });
  }

  render() {
    const { collegeService, trigger } = this.props;
    const { open, channels, selectedCollege, activeIndex }: State = this.state;
    const { colleges } = collegeService as CollegeService;
    //  const { channelLectureCounts } = lectureCountService as LectureCountService;

    return (
      <Modal
        open={open}
        onOpen={this.onOpenModal}
        onClose={this.onCloseModal}
        className="base w1000"
        trigger={trigger}
      >
        <Modal.Header className="res">
          Sub Category Choice
          <span className="sub f12">Please select a category</span>
        </Modal.Header>
        <Modal.Content>
          <div className="channel-change">
            <div className="table-css">
              <div className="row head">
                <div className="cell v-middle">
                  <span className="text01">Channel list</span>
                </div>
                <div className="cell v-middle">
                  <span className="text01">Selected</span>
                  <span className="count"><span className="text01 add">{channels.length}</span>
                    <span className="text02"> / 80</span>
                  </span>
                  <div className="right">
                    <button className="clear" onClick={this.onReset}>
                      <Icon className="reset" /><span className="blind">reset</span>
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
                          && colleges.map((college: CollegeModel, index:number) => (
                            <Accordion className="channel">
                              <Accordion.Title
                                key={college.collegeId}
                                active={activeIndex === index}
                                index={0}
                                onClick={() => this.handleClick(college, index)}
                              >
                                <span className={`name ${color[index]}`}>{college.name}</span>
                                <Icon onClick={() => this.handleClick(college, index)} />
                              </Accordion.Title>
                              <Accordion.Content active={activeIndex === index}>
                                <ul>
                                  {
                                    selectedCollege && selectedCollege!.channels && selectedCollege!.channels.length
                                    && selectedCollege!.channels.map((channel, index) => (
                                      <li key={channel.channelId} onClick={() => this.onSelectChannel(channel, college)}>
                                        <Checkbox
                                          className="base"
                                          label={channel.name}
                                          checked={channels.map(ch => ch.id).includes(channel.id)}
                                         /* checked={!!channelListMap.get(`${channel.id}`)}
                                          disabled={
                                            personalCube && personalCube.category && personalCube.category.channel
                                            && personalCube.category.channel.id === channel.id
                                          }*/
                                          //onChange={() => this.onSelectChannel(channel)}
                                        />
                                        {/*<div className="ui base checkbox">
                                          <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={channels.map(ch => ch.id).includes(channel.id)}
                                          />
                                          <label>
                                            {channel.name}
                                          </label>
                                        </div>*/}
                                      </li>
                                    )) || null
                                  }
                                </ul>
                              </Accordion.Content>
                            </Accordion>
                          ))
                        }
                    </div>
                  </div>
                </div>
                <div className="cell vtop">
                  <div className="select-area">
                    <div className="scrolling-60vh">
                      <div className="select-item">
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
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions">
          <Button className="w190 pop d" onClick={this.onCloseModal}>Cancel</Button>
          <Button className="w190 pop p" onClick={this.onFilter}>Confirm</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SubCategoryModalContainer;
