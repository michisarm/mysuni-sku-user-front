import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { Form, Button, Select } from 'semantic-ui-react';
import CreateInput from '../shared/CreateInput';
import { ChannelFieldRow } from '../view/DetailElementsView';
import MainChannelModalContainer from './MainChannelModalContainer';
import SubChannelModalContainer from './SubChannelModalContainer';
import { CollegeModel, CollegeType } from '../../../../college/model';
import { IdName, CategoryModel } from '../../../../shared/model';
import { CubeCategory } from '../../../../shared/model/CubeCategory';
import { useParams } from 'react-router-dom';
import { CreateDetailPageParams } from '../../model/CreateDetailPageParams';
import SelectOptions from '../../model/SelectOptions';

interface CubeBasicFormContainerProps {
  createCubeService?: CreateCubeService;
}

function CubeBasicFormContainer({
  createCubeService,
}: CubeBasicFormContainerProps) {
  const params = useParams<CreateDetailPageParams>();

  const [selectedCollegeId, setSelectedCollegeId] = useState<string>();
  const [collegeType, setCollegeType] = useState<CollegeType>();

  const { cubeSdo, setTargetSubsidiaryId } = createCubeService!;

  const onChangeName = (e: any, data: any) => {
    e.preventDefault();
    createCubeService!.changeCubeSdoProps('name', data.value);
  };


  const onChangeCubeType = (e: any, data: any) => {
    createCubeService!.changeCubeSdoProps('cubeType', data.value);
  };

  const onConfirmMainChannel = (college: CollegeModel, channel: IdName) => {
    const cubeCategory: CubeCategory = {
      collegeId: college.id,
      channelId: channel.id,
      mainCategory: true,
    }

    createCubeService!.changeCubeSdoProps('categories', [cubeCategory]);

    setSelectedCollegeId(college.id);
    setCollegeType(college.collegeType);

    if(college.collegeType === CollegeType.Company) {
      setTargetSubsidiaryId(college.id);
    } else {
      setTargetSubsidiaryId('');
    }
  };

  const onConfirmSubChannel = (categoryChannels: CategoryModel[]) => {
    const subCategories: CubeCategory[] = categoryChannels.map(channel => {
      return {
        collegeId: channel.college.id,
        channelId: channel.channel.id,
        mainCategory: false,
      };
    });

    createCubeService!.changeCubeSdoProps('categories', [subCategories]);
  };

  return (
    <>
      <Form.Field>
        <CreateInput
          required
          label="강좌명"
          placeholder="제목을 입력해주세요."
          value={cubeSdo.name || ''}
          sizeLimited
          maxSize={100}
          invalidMessage="You can enter up to 100 characters."
          onChange={onChangeName}
        />
      </Form.Field>

      <Form.Field>
        <label className="necessary">채널선택</label>

        <div>
          <ChannelFieldRow>
            {/* <div className="cell v-middle">
              <span className="text1">메인채널</span>

              <MainChannelModalContainer
                trigger={
                  <Button icon className="left post delete">
                    채널선택
                  </Button>
                }
                defaultSelectedChannel={personalCube.category.channel}
                onConfirmChannel={this.onConfirmMainChannel}
              />
            </div>
            <div className="cell v-middle">
              {!personalCube.category.channel.id ? (
                <span className="text1">메인채널을 선택해주세요.</span>
              ) : (
                <span className="text2">
                  {personalCube.category.college.name} &gt;{' '}
                  {personalCube.category.channel.name}
                </span>
              )}
            </div> */}
          </ChannelFieldRow>
          <ChannelFieldRow>
            {/* <div className="cell v-middle">
              <span className="text1">서브채널</span>

              <SubChannelModalContainer
                trigger={
                  <Button icon className="left post delete">
                    채널선택
                  </Button>
                }
                collegeType={collegeType}
                targetCollegeId={selectedCollegeId}
                defaultSelectedCategoryChannels={personalCube.subCategories}
                onConfirmCategoryChannels={onConfirmSubChannel}
              />
            </div> */}
            <div className="cell v-middle">
              {/* {subCategoriesGroupByCollege.length < 1 ? (
                <span key="select-sub-category" className="text1">
                  서브채널을 선택해주세요.
                </span>
              ) : (
                subCategoriesGroupByCollege.map((categoryChannels, index) => (
                  <span className="text2" key={`channels-${index}`}>
                    {categoryChannels[0].college.name}
                    {` > `}
                    {categoryChannels
                      .map(categoryChannel => categoryChannel.channel.name)
                      .join(', ')}
                  </span>
                ))
              )} */}
            </div>
          </ChannelFieldRow>
        </div>
      </Form.Field>

      <Form.Field>
        <label className="necessary">교육형태</label>
        <div className="select-box">
          {params.personalCubeId === undefined ? (
            <Select
              className="dropdown selection"
              value=""
              options={SelectOptions.cubeType}
              onChange={onChangeCubeType}
            />
          ) : (
            <input readOnly value={cubeSdo.type || ''} />
          )}
        </div>
      </Form.Field>
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
))(observer(CubeBasicFormContainer));