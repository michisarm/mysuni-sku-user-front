import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import {
  Button, Modal, Form, Header, Grid, List, Segment, Icon, Checkbox,
} from 'semantic-ui-react';
import { CubeModel } from '../..';
import { CollegeService } from '../../../college';
import { CollegeModel } from '../../../college/model/CollegeModel';
import { IdName } from '../../../shared/model/IdName';
import { ChannelListModel } from '../../model/ChannelListModel';


interface Props {
  open: boolean
  handleChangeOpen: (open: boolean) => void
  cube: CubeModel
  onChangeCubeProps: (name: string, value: string | {}) => void
  colleges: CollegeModel[]
  selectedSubCollege: CollegeModel
  collegeService?: CollegeService
}

interface States {
  channelListMap: Map<string, IdName>
  selectedCollegeState: IdName
  channelListMapForViewState: Map<IdName, IdName[]>
}

@inject('collegeService')
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
    const { onChangeCubeProps } = this.props;
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
    onChangeCubeProps('channelList.channels', channelList);
    onChangeCubeProps('channelList.channelsMap', channelListMapForView);
    this.setState({ channelListMapForViewState: channelListMapForView });
  }

  selectCollegeButton(selectedSubCollege: CollegeModel) {
    //
    const { collegeService, cube } = this.props;
    const channelListMap: Map<IdName, IdName[]> = new Map<IdName, IdName[]>();
    cube.channelList.channelsMap.forEach((value, key) => {
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
    const { handleChangeOpen, onChangeCubeProps } = this.props;
    this.setState({
      selectedCollegeState: new IdName(),
      channelListMap: new Map<string, IdName>(),
      channelListMapForViewState: new Map<IdName, IdName[]>(),
    });
    onChangeCubeProps('channelList', new ChannelListModel());
    handleChangeOpen(false);
  }

  render() {
    //
    const { open, cube, handleChangeOpen, colleges, selectedSubCollege } = this.props;
    const { channelListMap, selectedCollegeState } = this.state;
    const selectedChannels: any = [];
    if (cube && cube.channelList && cube.channelList.channelsMap) {
      cube.channelList.channelsMap.forEach((value, key, map) => (
        selectedChannels.push(
          map.size === 1 ? null : <p key={key.id + '-blank'} />,
          <span key={key.id}>{key.name} &gt; </span>,
          value.map((channel, index) => {
            if (index === 0) return <span key={index}>{channel.name}</span>;
            else return <span key={index}>, {channel.name}</span>;
          }
          )
        )
      )
      );
    }
    const selectedChannelsInModal: any = [];
    if (cube && cube.channelList && cube.channelList.channelsMap) {
      cube.channelList.channelsMap.forEach((value, key) => (
        selectedChannelsInModal.push(
          <List key={key.id}>
            {
              value.map((channel, index) => (
                <List.Item key={index}>
                  <Segment>
                    {key.name} &gt; {channel.name}
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
                      cube && cube.channelList && cube.channelList.channels && cube.channelList.channels.length
                      && (
                        <Grid.Column width={6}>
                          <Header as="h3">선택된 채널 {cube.channelList.channels.length} 개</Header>
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
                            disabled={cube && cube.channel && cube.channel.channel && cube.channel.channel.id === channel.id}
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
