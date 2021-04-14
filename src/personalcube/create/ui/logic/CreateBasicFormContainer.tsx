import React, { useState, useEffect } from 'react';
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
import { CreateCubePageParams } from '../../model/CreateCubePageParams';
import SelectOptions from '../../model/SelectOptions';
import { CollegeService } from '../../../../college/stores';
import { getMainCategory } from '../../model/CreateCubeDetail';
import { getCollgeName, getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';

interface CreateBasicFormContainerProps {
  createCubeService?: CreateCubeService;
  collegeService?: CollegeService;
}

function CreateBasicFormContainer({
  createCubeService,
  collegeService,
}: CreateBasicFormContainerProps) {
  const params = useParams<CreateCubePageParams>();

  const [selectedCollegeId, setSelectedCollegeId] = useState<string>();
  const [collegeType, setCollegeType] = useState<CollegeType>();

  const { cubeSdo, setTargetCineroomId } = createCubeService!;

  useEffect(() => {
    if(params.personalCubeId === undefined) {
      return;
    }

    const mainCategory = cubeSdo.categories.find(category => category.mainCategory === true);

    if(mainCategory !== undefined) {
      setSelectedCollege(mainCategory.collegeId);
    }
  }, [params.personalCubeId]);

  const setSelectedCollege = async (collegeId: string) => {
    const college = await collegeService!.findCollege(collegeId);
    if(college) {
      setSelectedCollegeId(college.id);
      setCollegeType(college.collegeType);
    }
  }

  const onChangeName = (e: any, data: any) => {
    e.preventDefault();
    createCubeService!.changeCubeSdoProps('name', data.value);
  };


  const onChangeCubeType = (e: any, data: any) => {
    e.preventDefault();
    createCubeService!.changeCubeSdoProps('type', data.value);
  };

  const onConfirmMainChannel = (college: CollegeModel, channel: IdName) => {
    const mainCategory: CubeCategory = {
      collegeId: college.id,
      channelId: channel.id,
      mainCategory: true,
    }

    createCubeService!.changeCubeSdoProps('categories', [mainCategory]);

    setSelectedCollegeId(college.id);
    setCollegeType(college.collegeType);

    if(college.collegeType === CollegeType.Company) {
      setTargetCineroomId(college.id);
    } else {
      setTargetCineroomId('');
    }
  };

  const onConfirmSubChannel = (categoryModels: CategoryModel[]) => {
    const mainCategory = getMainCategory(cubeSdo.categories);

    const categories: CubeCategory[] = categoryModels.map(categoryModel => {
      const isMainCategory = categoryModel.college.id === mainCategory?.collegeId;
      return {
        collegeId: categoryModel.college.id,
        channelId: categoryModel.channel.id,
        mainCategory: isMainCategory,
      };
    });

    console.log('categories :: ', categories);

    createCubeService!.changeCubeSdoProps('categories', categories);
  };

  const mainCategory = getMainCategory(cubeSdo.categories);
  const mainCollegeName = getCollgeName(mainCategory?.collegeId || '');
  const mainChannelName = getChannelName(mainCategory?.channelId || '');

  console.log('channeNale :', mainChannelName);

  const mainChannel: IdName = {
    id: mainCategory?.channelId || '',
    name: mainChannelName || '',
  };


  console.log('mainChannel :: ', mainChannel);

  const categoryModels: CategoryModel[] = cubeSdo.categories.map(category => {
  const collegeName = getCollgeName(category.collegeId) || '';
  const channelName = getChannelName(category.channelId) || '';

    return {
      college: {
        id: category.collegeId,
        name: collegeName,
      },
      channel: {
        id: category.channelId,
        name: channelName,
      }
    }
  });

  return (
    <>
      <Form.Field>
        <CreateInput
          required
          label="강좌명"
          placeholder="제목을 입력해주세요."
          value={cubeSdo.name}
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
            <div className="cell v-middle">
              <span className="text1">메인채널</span>
              <MainChannelModalContainer
                trigger={
                  <Button icon className="left post delete">
                    채널선택
                  </Button>
                }
                defaultSelectedChannel={mainChannel}
                onConfirmChannel={onConfirmMainChannel}
              />
            </div>
            <div className="cell v-middle">
              {mainCategory === undefined ? (
                <span className="text1">메인채널을 선택해주세요.</span>
              ) : (
                <span className="text2">
                  {getCollgeName(mainCategory.collegeId)} &gt;{' '}
                  {getChannelName(mainCategory.channelId)}
                </span>
              )}
            </div>
          </ChannelFieldRow>
          <ChannelFieldRow>
            <div className="cell v-middle">
              <span className="text1">서브채널</span>

              <SubChannelModalContainer
                trigger={
                  <Button icon className="left post delete">
                    채널선택
                  </Button>
                }
                collegeType={collegeType}
                targetCollegeId={selectedCollegeId}
                defaultSelectedCategoryChannels={categoryModels}
                onConfirmCategoryChannels={onConfirmSubChannel}
              />
            </div>
            <div className="cell v-middle">
              {cubeSdo.categories.length < 1 ? (
                <span key="select-sub-category" className="text1">
                  서브채널을 선택해주세요.
                </span>
              ) : (
                cubeSdo.categories.map((category, index) => (
                  <span className="text2" key={`channels-${index}`}>
                    {getCollgeName(category.collegeId)}
                    {` > `}
                    {getChannelName(category.channelId)}
                  </span>
                ))
              )}
            </div>
          </ChannelFieldRow>
        </div>
      </Form.Field>
      <Form.Field>
        <label className="necessary">교육형태</label>
        <div className="select-box">
          {params.personalCubeId === undefined && (
            <Select
              className="dropdown selection"
              value={cubeSdo.type}
              options={SelectOptions.cubeType}
              onChange={onChangeCubeType}
            />
          ) || (
            <input readOnly value={cubeSdo.type} />
          )}
        </div>
      </Form.Field>
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
  'college.collegeService',
))(observer(CreateBasicFormContainer));