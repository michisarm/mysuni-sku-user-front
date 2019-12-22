import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Checkbox, Form, Grid, Header, Icon, List, Modal, Segment } from 'semantic-ui-react';
import { mobxHelper, IdName } from 'shared';
import { PersonalCubeModel, PersonalCubeService } from 'personalcube/personalcube';
import { CollegeService, CollegeModel } from 'college';


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
    };
  }

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
    const { channelsMap } = this.props.personalCubeService || {} as PersonalCubeService;
    const channelListMap: Map<IdName, IdName[]> = new Map<IdName, IdName[]>();
    channelsMap.forEach((value, key) => {
      channelListMap.set(key, value);
    });
    this.setState({
      channelListMapForViewState: channelListMap,
      selectedCollegeState: { id: selectedSubCollege.collegeId, name: selectedSubCollege.name },
      channelListMap: new Map<string, IdName>(),
    });
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

  render() {
    //
    const { open, personalCube, handleChangeOpen, colleges, selectedSubCollege } = this.props;
    const { channelListMap, selectedCollegeState } = this.state;
    const selectedChannels: any = [];
    if (personalCube && personalCube.subCategories) {
      const channelListMap = PersonalCubeModel.makeChannelsMap(personalCube.subCategories);
      channelListMap.forEach((value, key, map) => (
        selectedChannels.push(
          map.size === 1 ? null : <p key={key} />,
          <span key={key}>{key} &gt; </span>,
          value.map((channel, index) => {
            if (index === 0) return <span key={index}>{channel}</span>;
            else return <span key={index}>, {channel}</span>;
          }
          )
        )
      )
      );
    }
    const selectedChannelsInModal: any = [];
    if (personalCube && personalCube.subCategories) {
      const channelListMap = PersonalCubeModel.makeChannelsMap(personalCube.subCategories);
      channelListMap.forEach((value, key) => (
        selectedChannelsInModal.push(
          <List key={key}>
            {
              value.map((channel, index) => (
                <List.Item key={index}>
                  <Segment>
                    {key} &gt; {channel}
                    <div className="fl-right"><Icon name="times" /></div>
                  </Segment>
                </List.Item>
              )) || ''
            }
          </List>
        ))
      );
    }
    return (
      <>
        <Button onClick={() => handleChangeOpen(true)}>Channel 선택</Button>
        <React.Fragment>
          {
            selectedChannels
            && selectedChannels
          }
          <Modal size="large" open={open} onClose={() => handleChangeOpen(false)}>
            <Modal.Header>
              서브 카테고리 선택
            </Modal.Header>
            <Modal.Content>
              <Form>
                <Grid celled>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <Header as="h3">선호하는 College의 학습 채널을 선택하세요.</Header>
                    </Grid.Column>
                    {
                      personalCube && personalCube.subCategories && personalCube.subCategories.length
                      && (
                        <Grid.Column width={6}>
                          <Header as="h3">선택된 채널 {personalCube.subCategories.length} 개</Header>
                        </Grid.Column>
                      ) || ''
                    }
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <List>
                        {
                          colleges && colleges.length
                          && colleges.map((college, index) => (
                            <List.Item
                              key={index}
                              className={
                                college.collegeId === selectedCollegeState.id ? 'active' : ''
                              }
                            >
                              <Segment
                                onClick={() => this.selectCollegeButton(college) }
                              >
                                {college.name}
                                <div className="fl-right"><Icon name="check" /></div>
                              </Segment>
                            </List.Item>
                          )) || ''
                        }
                      </List>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      {
                        selectedSubCollege && selectedSubCollege.channels && selectedSubCollege.channels.length
                        && selectedSubCollege.channels.map((channel, index) => (
                          <Form.Field
                            key={index}
                            control={Checkbox}
                            checked={!!channelListMap.get(`${channel.id}`)}
                            disabled={
                              personalCube && personalCube.category && personalCube.category.channel
                              && personalCube.category.channel.id === channel.id
                            }
                            label={channel.name}
                            onChange={() => this.selectChannelButton(channel)}
                          />
                        )) || null
                      }
                    </Grid.Column>
                    <Grid.Column width={6}>
                      {
                        selectedChannelsInModal && selectedChannelsInModal
                      }
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleCancel}>Cancel</Button>
              <Button primary onClick={() => handleChangeOpen(false)}>OK</Button>
            </Modal.Actions>
          </Modal>
        </React.Fragment>
      </>
    );
  }
}

export default SecondCategoryModal;
