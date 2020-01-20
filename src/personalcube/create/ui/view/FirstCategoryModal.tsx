import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Accordion, Button, Icon, Modal, Radio } from 'semantic-ui-react';
import { IdName } from 'shared';
import { PersonalCubeModel, PersonalCubeService } from 'personalcube/personalcube';
import { CollegeModel, CollegeService } from 'college';

interface Props {
  open: boolean
  handleChangeOpen: (open: boolean) => void
  personalCube: PersonalCubeModel
  onChangePersonalCubeProps: (name: string, value: string | {} | []) => void
  collegeService?: CollegeService
  colleges: CollegeModel[]
  selectedMainCollege: CollegeModel
  personalCubeService?: PersonalCubeService;
}

interface States {
  activeIndex: number
  selectedChannel: IdName
}

const color : string [] = ['purple', 'violet', 'yellow', 'orange', 'red', 'green', 'blue', 'teal'];

@inject(mobxHelper.injectFrom('college.collegeService', 'personalCube.personalCubeService'))
@observer
@reactAutobind
class FirstCategoryModal extends React.Component<Props, States> {
  //
  state = {
    activeIndex: -1,
    selectedChannel: new IdName(),
  };

  componentDidMount(): void {
    const { personalCube } = this.props;
    this.setState({ selectedChannel: personalCube.category.channel || new IdName() });
  }

  componentDidUpdate(prevProps: Props): void {
    const { personalCube } = this.props;
    const { personalCube: prevCube } = prevProps;

    if (personalCube.category.channel.id !== prevCube.category.channel.id) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selectedChannel: personalCube.category.channel || new IdName() });
    }
  }

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  selectChannelButton(selectedChannel: IdName) {
    //
    this.setState({ selectedChannel });
  }

  selectCollegeButton(selectedMainCollege: CollegeModel) {
    //
    const { onChangePersonalCubeProps, collegeService } = this.props;
    onChangePersonalCubeProps('category.college.id', selectedMainCollege.collegeId);
    onChangePersonalCubeProps('category.college.name', selectedMainCollege.name);
    if (collegeService)  collegeService.findMainCollege(selectedMainCollege.collegeId);

  }

  handleCancel() {
    //
    const { handleChangeOpen } = this.props;
    handleChangeOpen(false);
  }

  handleOk() {
    //
    const { handleChangeOpen, onChangePersonalCubeProps, personalCube } = this.props;
    const beforeCategoryId = personalCube.category && personalCube.category.channel && personalCube.category.channel.id;
    const { changeChannelsMapProps } = this.props.personalCubeService || {} as PersonalCubeService;
    const channelList: any = [];
    const channelListMapForView: Map<IdName, IdName[]> = new Map<IdName, IdName[]>();

    onChangePersonalCubeProps('category.channel', this.state.selectedChannel);
    channelListMapForView.set(personalCube.category.college, [personalCube.category.channel]);
    channelListMapForView.forEach((value, key) => {
      value.map(channel => {
        channelList.push({ college: key, channel });
      });
    });

    personalCube.subCategories.filter(category =>
      category.channel.id !== beforeCategoryId
    ).concat(channelList);

    onChangePersonalCubeProps('subCategories', personalCube.subCategories.filter(category => category.channel.id !== beforeCategoryId).concat(channelList));
    changeChannelsMapProps(channelListMapForView);
    handleChangeOpen(false);
  }

  render() {
    //
    const { open, handleChangeOpen, personalCube, colleges, selectedMainCollege } = this.props;
    const { activeIndex } = this.state;
    const isSelectedCollegeAndChannel = personalCube && personalCube.category && personalCube.category.college
      && personalCube.category.college.name && personalCube.category.channel && personalCube.category.channel.name;

    return (
      <>
        <div className="cell v-middle">
          <span className="text1">메인채널</span>
          {/* 카테고리 선택 후 활성화 */}
          <Button icon className="left post delete" type="button" onClick={() => handleChangeOpen(true)}>채널선택</Button>

          <Modal className="base w560" open={open} onClose={() => handleChangeOpen(false)}>
            <Modal.Header className="res">
              메인채널 선택
              <span className="sub f12">메인채널을 선택해주세요.</span>
            </Modal.Header>
            <Modal.Content>
              <div className="channel-change">
                <div className="table-css">
                  <div className="row head">
                    <div className="cell v-middle">
                      <span className="text01">Channel list</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="cell vtop">
                      <div className="select-area">
                        <div className="scrolling-60vh">
                          {
                            colleges && colleges.length && colleges.map((college, index) => (
                              <Accordion className="channel" key={index} onClick={() => this.selectCollegeButton(college) }>
                                <Accordion.Title
                                  active={activeIndex === index}
                                  index={index}
                                  onClick={this.handleClick}
                                >
                                  <span className={`name ${color[index]}`}>{college.name}</span>
                                  <Icon />
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === index}>
                                  <ul>
                                    {
                                      selectedMainCollege && selectedMainCollege.channels && selectedMainCollege.channels.length
                                      && selectedMainCollege.channels.map((channel, idx) => (
                                        <li key = {idx}>
                                          <Radio
                                            className="base"
                                            label={channel.name}
                                            checked = {
                                              this.state.selectedChannel.id === channel.id
                                            }
                                            onChange={() => this.selectChannelButton(channel)}
                                          />
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
                  </div>
                </div>
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button type="button" className="w190 pop d" onClick={() => this.handleCancel()}>Cancel</Button>
              <Button type="button" className="w190 pop p" onClick={() => this.handleOk()}>OK</Button>
            </Modal.Actions>
          </Modal>
        </div>
        <div className="cell v-middle">
          {
            isSelectedCollegeAndChannel ?
              <span>{personalCube.category.college.name} &gt; {personalCube.category.channel.name}</span>
              :
              <span className="text1">메인채널을 선택해주세요.</span>
          }

        </div>

      </>
    );
  }
}

export default FirstCategoryModal;
