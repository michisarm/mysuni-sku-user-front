import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Accordion, Button, Icon, Modal, Radio } from 'semantic-ui-react';
import { CategoryModel, IdName, mobxHelper } from 'shared';
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
  isSelectedMainChannel: boolean
  activeIndex: number
  value ?: any
}

@inject(mobxHelper.injectFrom('collegeService', 'personalCube.personalCubeService'))
@observer
@reactAutobind
class FirstCategoryModal extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = { isSelectedMainChannel: false, activeIndex: -1 };
  }

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  selectChannelButton(selectedChannel: IdName) {
    //
    this.setState({ value: selectedChannel.id });
    const { onChangePersonalCubeProps } = this.props;
    onChangePersonalCubeProps('category.channel', selectedChannel);
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
    const { onChangePersonalCubeProps, handleChangeOpen } = this.props;
    onChangePersonalCubeProps('category', new CategoryModel());
    handleChangeOpen(false);
  }

  handleOk() {
    //
    const { handleChangeOpen, onChangePersonalCubeProps, personalCube } = this.props;
    const { changeChannelsMapProps } = this.props.personalCubeService || {} as PersonalCubeService;
    const channelList: any = [];
    const channelListMapForView: Map<IdName, IdName[]> = new Map<IdName, IdName[]>();
    channelListMapForView.set(personalCube.category.college, [personalCube.category.channel]);
    channelListMapForView.forEach((value, key) => {
      value.map(channel => {
        channelList.push({ college: key, channel });
      });
    });
    onChangePersonalCubeProps('subCategories', channelList);
    changeChannelsMapProps(channelListMapForView);
    this.setState({ isSelectedMainChannel: true });
    handleChangeOpen(false);
  }

  render() {
    //
    const { open, handleChangeOpen, personalCube, colleges, selectedMainCollege } = this.props;
    // const { isSelectedMainChannel, activeIndex, value } = this.state;
    const { isSelectedMainChannel, activeIndex, value } = this.state;
    const isSelectedCollegeAndChannel = personalCube && personalCube.category && personalCube.category.college
      && personalCube.category.college.name && personalCube.category.channel && personalCube.category.channel.name;

    // FIXME: 사용안하는 state 제거 후 아래 코드 삭제하세요
    if (!personalCube) {
      console.log(isSelectedMainChannel, value);
    }

    return (
      <>
        <div className="cell v-middle">
          <span className="text1">대표 카테고리</span>
          {/* 카테고리 선택 후 활성화 */}
          <Button icon className="left post delete" onClick={() => handleChangeOpen(true)}>카테고리 선택</Button>
          <Modal className="base w560" open={open} onClose={() => handleChangeOpen(false)}>
            <Modal.Header className="res">
              Main Category Choice
              <span className="sub f12">Please select a category</span>
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
                                  <span className="name purple">{college.name}</span>
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
                                              personalCube && personalCube.category && personalCube.category.channel
                                              && personalCube.category.channel.id === channel.id
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
              <Button className="w190 pop d" onClick={() => this.handleCancel()}>Cancel</Button>
              <Button className="w190 pop p" onClick={() => this.handleOk()}>OK</Button>
            </Modal.Actions>
          </Modal>
        </div>
        <div className="cell v-middle">
          {
            // isSelectedMainChannel && isSelectedCollegeAndChannel
            isSelectedCollegeAndChannel ?
              <span>{personalCube.category.college.name} &gt; {personalCube.category.channel.name}</span>
              :
              <span className="text1">대표 카테고리를 선택해주세요.</span>
          }

        </div>

      </>
    );
  }
}

export default FirstCategoryModal;
