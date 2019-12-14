import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import {
  Button, Modal, Form, Header, Radio, Grid, List, Segment, Icon,
} from 'semantic-ui-react';
import { CubeModel } from '../..';
import { ChannelModel } from '../../model/ChannelModel';
import { CollegeService } from '../../../college';
import { CollegeModel } from '../../../college/model/CollegeModel';
import { IdName } from '../../../shared/model/IdName';


interface Props {
  open: boolean
  handleChangeOpen: (open: boolean) => void
  cube: CubeModel
  onChangeCubeProps: (name: string, value: string | {}) => void
  collegeService?: CollegeService
  colleges: CollegeModel[]
  selectedMainCollege: CollegeModel

}

interface States {
  isSelectedMainChannel: boolean
}

@inject('collegeService')
@observer
@reactAutobind
class FirstCategoryModal extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = { isSelectedMainChannel: false };
  }

  selectChannelButton(selectedChannel: IdName) {
    //
    const { onChangeCubeProps } = this.props;
    onChangeCubeProps('channel.channel', selectedChannel);
  }

  selectCollegeButton(selectedMainCollege: CollegeModel) {
    //
    const { onChangeCubeProps, collegeService } = this.props;
    onChangeCubeProps('channel.college.id', selectedMainCollege.collegeId);
    onChangeCubeProps('channel.college.name', selectedMainCollege.name);
    if (collegeService) collegeService.findMainCollege(selectedMainCollege.collegeId);
  }

  handleCancel() {
    //
    const { onChangeCubeProps, handleChangeOpen } = this.props;
    onChangeCubeProps('channel', {} as ChannelModel);
    handleChangeOpen(false);
  }

  handleOk() {
    //
    const { handleChangeOpen, onChangeCubeProps, cube } = this.props;
    const channelList: any = [];
    const channelListMapForView: Map<IdName, IdName[]> = new Map<IdName, IdName[]>();
    channelListMapForView.set(cube.channel.college, [cube.channel.channel]);
    channelListMapForView.forEach((value, key) => {
      value.map(channel => {
        channelList.push({ college: key, channel });
      });
    });
    onChangeCubeProps('channelList.channels', channelList);
    onChangeCubeProps('channelList.channelsMap', channelListMapForView);
    this.setState({ isSelectedMainChannel: true });
    handleChangeOpen(false);
  }

  render() {
    //
    const { open, handleChangeOpen, cube, colleges, selectedMainCollege } = this.props;
    const { isSelectedMainChannel } = this.state;
    const isSelectedCollegeAndChannel = cube && cube.channel && cube.channel.college
      && cube.channel.college.name && cube.channel.channel && cube.channel.channel.name;
    return (
      <>
        <Button onClick={() => handleChangeOpen(true)}>Channel 선택</Button>
        <React.Fragment>
          {/* 카테고리 선택 후 활성화 */}
          {
            isSelectedMainChannel && isSelectedCollegeAndChannel
            && (<span>{cube.channel.college.name} &gt; {cube.channel.channel.name}</span>) || ''
          }

          <Modal size="large" open={open} onClose={() => handleChangeOpen(false)}>
            <Modal.Header>
              대표 카테고리 선택
            </Modal.Header>
            <Modal.Content>
              <Form>
                <Grid celled>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <Header as="h3">선호하는 College의 학습 채널을 선택하세요.</Header>
                    </Grid.Column>
                    {
                      isSelectedCollegeAndChannel
                      && (
                        <Grid.Column width={6}>
                          <Header as="h3">선택된 채널</Header>
                        </Grid.Column> || ''
                      )
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
                                cube && cube.channel && cube.channel.college
                                && cube.channel.college.id === college.collegeId ? 'active' : ''
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
                        selectedMainCollege && selectedMainCollege.channels && selectedMainCollege.channels.length
                        && selectedMainCollege.channels.map((channel, index) => (
                          <Form.Field
                            key={index}
                            control={Radio}
                            checked={cube && cube.channel && cube.channel.channel && cube.channel.channel.id === channel.id}
                            label={channel.name}
                            onChange={() => this.selectChannelButton(channel)}
                          />
                        )) || null
                      }
                    </Grid.Column>
                    {
                      isSelectedCollegeAndChannel
                      && (
                        <Grid.Column width={6}>
                          <List>
                            <List.Item>
                              <Segment>
                                {cube.channel.college.name} &gt; {cube.channel.channel.name}
                                <div className="fl-right"><Icon name="times" /></div>
                              </Segment>
                            </List.Item>
                          </List>
                        </Grid.Column>
                      ) || ''
                    }
                  </Grid.Row>
                </Grid>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => this.handleCancel()}>Cancel</Button>
              <Button primary onClick={() => this.handleOk()}>OK</Button>
            </Modal.Actions>
          </Modal>
        </React.Fragment>
      </>
    );
  }
}

export default FirstCategoryModal;
