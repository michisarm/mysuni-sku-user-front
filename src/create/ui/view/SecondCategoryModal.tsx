import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Accordion, Button, Checkbox, Icon, List, Modal } from 'semantic-ui-react';
import { IdName, mobxHelper } from 'shared';
import { PersonalCubeModel, PersonalCubeService } from 'personalcube/personalcube';
import { CollegeModel, CollegeService } from 'college';


interface Props {
  open: boolean
  handleChangeOpen: (open: boolean) => void
  personalCube: PersonalCubeModel
  onChangePersonalCubeProps: (name: string, value: string | {} | []) => void
  colleges: CollegeModel[]
  selectedSubCollege: CollegeModel
  collegeService?: CollegeService
  personalCubeService?: PersonalCubeService
}

interface States {
  channelListMap: Map<string, IdName>
  selectedCollegeState: IdName
  channelListMapForViewState: Map<IdName, IdName[]>
  activeIndex: number
}

@inject(mobxHelper.injectFrom('collegeService', 'personalCube.personalCubeService'))
@observer
@reactAutobind
class SecondCategoryModal extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = {
      channelListMap: new Map<string, IdName>(),
      selectedCollegeState: { id: '', name: '' },
      channelListMapForViewState: new Map<IdName, IdName[]>(),
      activeIndex: -1,
    };
  }

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  selectChannelButton(channel: IdName) {
    //
    const { onChangePersonalCubeProps } = this.props;
    const { changeChannelsMapProps } = this.props.personalCubeService || {} as PersonalCubeService;
    const { channelListMap, selectedCollegeState, channelListMapForViewState } = this.state;
    const tempListMap = channelListMap;
    const channelListMapForView = channelListMapForViewState;

    if (tempListMap.get(`${channel.id}`)) {
      tempListMap.delete(`${channel.id}`);

      this.setState({ channelListMap: tempListMap });
    } else {
      tempListMap.set(channel.id, channel);

      this.setState({ channelListMap: tempListMap });
    }

    const channelList: any = [];
    const channelNameList: IdName[] = [];
    tempListMap.forEach((value) => {
      channelNameList.push(value);
    });
    if (channelListMapForView.has(selectedCollegeState)) {
      const tempChannelListMap = channelListMapForView.get(selectedCollegeState);
      const newTempChannelListMap = tempChannelListMap && tempChannelListMap.concat(channelNameList);
      if (newTempChannelListMap) channelListMapForView.set(selectedCollegeState, newTempChannelListMap);
    }
    channelListMapForView.set(selectedCollegeState, channelNameList);
    channelListMapForView.forEach((value, key) => {
      value.map(channel => {
        channelList.push({ college: key, channel });
      });
    });
    onChangePersonalCubeProps('subCategories', channelList);
    changeChannelsMapProps(channelListMapForView);
    this.setState({ channelListMapForViewState: channelListMapForView });
  }

  selectCollegeButton(selectedSubCollege: CollegeModel) {
    //
    const { collegeService } = this.props;
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    const { channelsMap } = this.props.personalCubeService || {} as PersonalCubeService;
    const channelListMap: Map<IdName, IdName[]> = new Map<IdName, IdName[]>();
    channelsMap.forEach((value, key) => {
      channelListMap.set(key, value);
    });

    if (personalCube.subsidiaries && personalCube.subsidiaries.length) {
      this.setState({
        channelListMapForViewState: PersonalCubeModel.makeChannelsIdNameMap(personalCube.subCategories),
        selectedCollegeState: { id: selectedSubCollege.collegeId, name: selectedSubCollege.name },
        channelListMap: new Map<string, IdName>(),
      });
    } else {
      this.setState({
        channelListMapForViewState: channelListMap,
        selectedCollegeState: { id: selectedSubCollege.collegeId, name: selectedSubCollege.name },
        channelListMap: new Map<string, IdName>(),
      });
    }
    if (collegeService) collegeService.findSubCollege(selectedSubCollege.collegeId);
  }

  handleCancel() {
    //
    const { handleChangeOpen, onChangePersonalCubeProps } = this.props;
    this.setState({
      selectedCollegeState: new IdName(),
      channelListMap: new Map<string, IdName>(),
      channelListMapForViewState: new Map<IdName, IdName[]>(),
    });
    onChangePersonalCubeProps('subCategories', []);
    handleChangeOpen(false);
  }

  onRemove(channel: string, key: string ) {

    const { personalCube, onChangePersonalCubeProps } = this.props;
    // const { channelListMap, selectedCollegeState, channelListMapForViewState } = this.state;
    const { channelListMap } = this.state;
    const tempListMap = channelListMap;
    const categories = personalCube.subCategories;
    const index = categories.findIndex(category => category.channel.name === channel);
    let categoryId = '';
    categories.map((category, index ) => {
      categoryId = category.channel.id;
    }
    );

    const newCategories = [
      ...categories.slice(0, index),
      ...categories.slice(index + 1, categories.length),
    ];

    onChangePersonalCubeProps('subCategories', newCategories);

    if (tempListMap.get(categoryId)) {
      tempListMap.delete(categoryId);

      this.setState({ channelListMap: tempListMap });
    }

    //tempListMap.slice(0, 2).concat(array.slice(3, 5));
    /* if (tempListMap.get(`${channel.id}`)) {
      tempListMap.delete(`${channel.id}`);

      this.setState({ channelListMap: tempListMap });
    } else {
      tempListMap.set(channel.id, channel);

      this.setState({ channelListMap: tempListMap });
    }*/


  }

  render() {
    //
    const { open, personalCube, handleChangeOpen, colleges, selectedSubCollege } = this.props;
    // const { channelListMap, selectedCollegeState, activeIndex } = this.state;
    const { channelListMap, activeIndex } = this.state;
    const selectedChannels: any = [];
    if (personalCube && personalCube.subCategories) {
      const channelListMap = PersonalCubeModel.makeChannelsMap(personalCube.subCategories);
      if (channelListMap.size === 0) {
        selectedChannels.push(
          <span className="text1">서브 카테고리를 선택해주세요.</span>
        );
      } else {
        channelListMap.forEach((value, key, map) => {
          selectedChannels.push(
            map.size === 1 ? null : <p key={key} />,
            <span key={key}>{key} &gt; </span>,
            value.map((channel, index) => {
              if (index === 0) return <span key={index}>{channel}</span>;
              else return <span key={index}>, {channel}</span>;
            }
            ));
        });
      }
    }
    const selectedChannelsInModal: any = [];
    if (personalCube && personalCube.subCategories) {
      const channelListMap = PersonalCubeModel.makeChannelsMap(personalCube.subCategories);
      channelListMap.forEach((value, key) => (
        selectedChannelsInModal.push(
          <List key={key}>
            {
              value.map((channel, index) => (
                <Button
                  className="del"
                  key={index}
                  onClick={() => this.onRemove(channel, key)}
                 // onClick={() => this.deleteChannelList(selectedChannelsInModal, channel)}
                >{key} &gt; {channel}
                </Button>
              )) || ''
            }
          </List>
        ))
      );
    }

    return (
      <>
        <div className="cell v-middle">
          <span className="text1">서브 카테고리</span>

          <Button icon className="left post delete" onClick={() => handleChangeOpen(true)}>카테고리 선택</Button>

          <Modal className="base w1000" open={open} onClose={() => handleChangeOpen(false)}>
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
                      <span className="count">
                        {
                          personalCube && personalCube.subCategories && personalCube.subCategories.length
                           && (
                             <span className="text01 add">{personalCube.subCategories.length}</span>
                           ) || ''
                         }
                        <span className="text02"> / 80</span>
                      </span>
                      <div className="right">
                        <button className="clear">
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
                            colleges && colleges.length && colleges.map((college, index) => (
                              <Accordion className="channel" key={index}>
                                <Accordion.Title
                                  active={activeIndex === index}
                                  index={index}
                                  onClick={this.handleClick}
                                  key ={index}
                                >
                                  <span className="name purple">{college.name}</span>
                                  <Icon onClick={() => this.selectCollegeButton(college) } />
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === index}>
                                  <ul>
                                    {
                                      selectedSubCollege && selectedSubCollege.channels && selectedSubCollege.channels.length
                                      && selectedSubCollege.channels.map((channel, idx) => (
                                        <li key={channel.id}>
                                          <Checkbox
                                            className="base"
                                            key ={channel.id}
                                            checked={!!channelListMap.get(`${channel.id}`)}
                                            disabled={
                                                      personalCube && personalCube.category && personalCube.category.channel
                                                      && personalCube.category.channel.id === channel.id
                                                    }
                                            label={channel.name}
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
                    <div className="cell vtop">
                      <div className="select-area">
                        <div className="scrolling-60vh">
                          <div className="select-item">
                            {
                              selectedChannelsInModal && selectedChannelsInModal
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button className="w190 pop d" onClick={this.handleCancel}>Cancel</Button>
              <Button className="w190 pop p" onClick={() => handleChangeOpen(false)}>OK</Button>
            </Modal.Actions>
          </Modal>
        </div>
        <div className="cell v-middle">
          {
            selectedChannels && selectedChannels
          }
        </div>
      </>
    );
  }
}

export default SecondCategoryModal;
