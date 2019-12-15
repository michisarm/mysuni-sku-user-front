import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import {
  Button, Modal, Form, Header, Radio, Grid, List, Segment, Icon,
} from 'semantic-ui-react';
import { IdName } from 'shared';
import { PersonalCubeModel, PersonalCubeService } from '../..';
import { CollegeService } from '../../../college';
import { CollegeModel } from '../../../college/model/CollegeModel';
import { CategoryModel } from '../../model/CategoryModel';


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
}

@inject('collegeService', 'personalCubeService')
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
    const { onChangePersonalCubeProps } = this.props;
    onChangePersonalCubeProps('category.channel', selectedChannel);
  }

  selectCollegeButton(selectedMainCollege: CollegeModel) {
    //
    const { onChangePersonalCubeProps, collegeService } = this.props;
    onChangePersonalCubeProps('category.college.id', selectedMainCollege.collegeId);
    onChangePersonalCubeProps('category.college.name', selectedMainCollege.name);
    if (collegeService) collegeService.findMainCollege(selectedMainCollege.collegeId);
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
    const { isSelectedMainChannel } = this.state;
    const isSelectedCollegeAndChannel = personalCube && personalCube.category && personalCube.category.college
      && personalCube.category.college.name && personalCube.category.channel && personalCube.category.channel.name;
    return (
      <>
        <Button onClick={() => handleChangeOpen(true)}>Channel 선택</Button>
        <React.Fragment>
          {/* 카테고리 선택 후 활성화 */}
          {
            isSelectedMainChannel && isSelectedCollegeAndChannel
            && (<span>{personalCube.category.college.name} &gt; {personalCube.category.channel.name}</span>) || ''
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
                                personalCube && personalCube.category && personalCube.category.college
                                && personalCube.category.college.id === college.collegeId ? 'active' : ''
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
                            checked={personalCube && personalCube.category && personalCube.category.channel
                              && personalCube.category.channel.id === channel.id
                            }
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
                                {personalCube.category.college.name} &gt; {personalCube.category.channel.name}
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
