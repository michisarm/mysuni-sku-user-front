
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { patronInfo } from '@nara.platform/dock';

import { Button, Form, Select } from 'semantic-ui-react';
import { IdName, CategoryModel } from 'shared';
import { CollegeModel, CollegeType } from 'college/model';
import { CollegeService } from 'college/stores';
import { PersonalCubeModel } from 'personalcube/personalcube';
import SelectOptions from '../../model/SelectOptions';
import CreateInput from '../shared/CreateInput';
import MainChannelModalContainer from './MainChannelModalContainer';
import SubChannelModalContainer from './SubChannelModalContainer';
import { ChannelFieldRow } from '../view/DetailElementsView';


interface Props {
  collegeService?: CollegeService
  contentNew: boolean
  personalCube: PersonalCubeModel
  onChangePersonalCubeProps: (name: string, value: string | {}) => void
  onChangeCollege: (college: CollegeModel) => void
}

interface State {
  selectedCollegeId: string
  collegeType?: CollegeType
}

@inject(mobxHelper.injectFrom(
  'college.collegeService',
))
@observer
@reactAutobind
class BasicInfoFormContainer extends Component<Props, State> {
  //
  state = {
    selectedCollegeId: '',
    collegeType: undefined,
  };


  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    //
    const { personalCube: prevPersonalCube } = prevProps;
    const { personalCube } = this.props;

    if (prevPersonalCube !== personalCube && personalCube.personalCubeId) {
      this.setSelectedCollege();
    }
  }

  async setSelectedCollege() {
    //
    const { collegeService, personalCube } = this.props;
    const collegeId = personalCube.category.college.id;

    const college = await collegeService!.findCollege(collegeId);

    if (college) {
      this.setState({
        collegeType: college.collegeType,
        selectedCollegeId: college.collegeId,
      });
    }
  }

  onChangeName(e: any, data: any) {
    //
    this.props.onChangePersonalCubeProps('name', data.value);
  }

  onChangeContentsType(e: any, data: any) {
    //
    this.props.onChangePersonalCubeProps('contents.type', data.value);
  }

  onConfirmMainChannel(college: CollegeModel, channel: IdName) {
    //
    const { onChangePersonalCubeProps, onChangeCollege } = this.props;

    const category = new CategoryModel({
      college: college.toIdName(),
      channel,
    });

    patronInfo.setWorkspaceByDomain(college);
    onChangePersonalCubeProps('category', category);
    onChangePersonalCubeProps('subCategories', [category]);

    this.setState({
      selectedCollegeId: college.collegeId,
      collegeType: college.collegeType,
    });
    onChangeCollege(college);
  }

  onConfirmSubChannel(categoryChannels: CategoryModel[]) {
    //
    const { onChangePersonalCubeProps } = this.props;

    onChangePersonalCubeProps('subCategories', categoryChannels);
  }

  render() {
    //
    const {
      contentNew, personalCube,
    } = this.props;
    const { selectedCollegeId, collegeType } = this.state;
    const subCategoriesGroupByCollege = PersonalCubeModel.getSubCategoriesGroupByCollege(personalCube);

    return (
      <>
        <Form.Field>
          <CreateInput
            required
            label="강좌명"
            placeholder="제목을 입력해주세요."
            value={personalCube.name}
            sizeLimited
            maxSize={100}
            invalidMessage="You can enter up to 100 characters."
            onChange={this.onChangeName}
          />
        </Form.Field>

        <Form.Field>
          <label className="necessary">채널선택</label>

          <div>
            <ChannelFieldRow>
              <div className="cell v-middle">
                <span className="text1">메인채널</span>

                <MainChannelModalContainer
                  trigger={<Button icon className="left post delete">채널선택</Button>}
                  defaultSelectedChannel={personalCube.category.channel}
                  onConfirmChannel={this.onConfirmMainChannel}
                />
              </div>
              <div className="cell v-middle">
                { !personalCube.category.channel.id ?
                  <span className="text1">메인채널을 선택해주세요.</span>
                  :
                  <span className="text2">{personalCube.category.college.name} &gt; {personalCube.category.channel.name}</span>
                }
              </div>
            </ChannelFieldRow>
            <ChannelFieldRow>
              <div className="cell v-middle">
                <span className="text1">서브채널</span>

                <SubChannelModalContainer
                  trigger={<Button icon className="left post delete">채널선택</Button>}
                  collegeType={collegeType}
                  targetCollegeId={selectedCollegeId}
                  defaultSelectedCategoryChannels={personalCube.subCategories}
                  onConfirmCategoryChannels={this.onConfirmSubChannel}
                />
              </div>
              <div className="cell v-middle">
                { subCategoriesGroupByCollege.length < 1 ?
                  <span key="select-sub-category" className="text1">서브채널을 선택해주세요.</span>
                  :
                  subCategoriesGroupByCollege.map((categoryChannels, index) => (
                    <span className="text2" key={`channels-${index}`}>
                      {categoryChannels[0].college.name}{` > `}
                      {categoryChannels.map((categoryChannel) => categoryChannel.channel.name).join(', ')}
                    </span>
                  ))
                }
              </div>
            </ChannelFieldRow>
          </div>
        </Form.Field>

        <Form.Field>
          <label className="necessary">교육형태</label>
          <div className="select-box">
            { contentNew ?
              <Select
                className="dropdown selection"
                value={personalCube.contents.type || 'None'}
                options={SelectOptions.cubeType}
                onChange={this.onChangeContentsType}
              />
              :
              <input
                readOnly
                value={personalCube.contents.type || ''}
              />
            }
          </div>
        </Form.Field>
      </>
    );
  }
}
export default BasicInfoFormContainer;
