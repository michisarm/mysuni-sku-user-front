import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { Form, Button, Select, DropdownProps } from 'semantic-ui-react';
import CreateInput from '../shared/CreateInput';
import { ChannelFieldRow } from './DetailElementsView';
import MainChannelModalContainer from '../logic/MainChannelModalContainer';
import SubChannelModalContainer from '../logic/SubChannelModalContainer';
import { CollegeModel } from '../../../../college/model';
import { IdName, CategoryModel } from '../../../../shared/model';
import {
  CubeCategory,
  combineCollege,
  renderChannelNames,
} from '../../../../shared/model/CubeCategory';
import { useParams } from 'react-router-dom';
import { CreateCubeParams } from '../../model/CreateCubeParams';
import SelectOptions from '../../model/SelectOptions';
import {
  getMainCategory,
  getSubCategories,
} from '../../model/CreateCubeDetail';
import {
  getCollgeName,
  getChannelName,
  compareCollgeCineroom,
} from '../../../../shared/service/useCollege/useRequestCollege';
import {
  useSelectedCollege,
  setSelectedCollege,
} from '../../../store/SelectedCollegeStore';
import { setCubeType } from '../../../store/CubeTypeStore';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

function CreateCubeBasicInfoFormView() {
  const params = useParams<CreateCubeParams>();
  const selectedCollege = useSelectedCollege();

  const { cubeSdo } = CreateCubeService.instance;

  const onChangeName = useCallback((e: any, data: any) => {
    e.preventDefault();
    const polyglotString = { en: null, ko: data.value, zh: null };
    CreateCubeService.instance.changeCubeSdoProps('name', polyglotString);
  }, []);

  const onChangeCubeType = useCallback(
    (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
      e.preventDefault();
      const nextCubeType = String(data.value);
      setCubeType(nextCubeType);
      CreateCubeService.instance.changeCubeSdoProps('type', nextCubeType);
    },
    []
  );

  const onConfirmMainChannel = useCallback(
    (college: CollegeModel, channel: IdName) => {
      const mainCategory: CubeCategory = {
        collegeId: college.id,
        channelId: channel.id,
        mainCategory: true,
      };

      CreateCubeService.instance.changeCubeSdoProps('categories', [
        mainCategory,
      ]);

      setSelectedCollege({
        collegeId: college.id,
        collegeType: college.collegeType,
      });
    },
    []
  );

  const onConfirmSubChannel = useCallback(
    (categoryModels: CategoryModel[]) => {
      const mainCategory = getMainCategory(cubeSdo.categories);

      if (mainCategory === undefined) {
        return;
      }

      const subCategories: CubeCategory[] = categoryModels.map(
        (categoryModel) => {
          return {
            collegeId: categoryModel.college.id,
            channelId: categoryModel.channel.id,
            mainCategory: false,
          };
        }
      );

      CreateCubeService.instance.changeCubeSdoProps('categories', [
        mainCategory,
        ...subCategories,
      ]);
    },
    [cubeSdo.categories]
  );

  const mainCategory = getMainCategory(cubeSdo.categories);
  const subCategories = getSubCategories(cubeSdo.categories);
  const { collegeIdList, combineCollegeWithChannel } =
    combineCollege(subCategories);

  const mainChannelId = mainCategory?.channelId || '';
  const mainChannelName = getChannelName(mainChannelId) || '';

  const mainChannel: IdName = {
    id: mainChannelId,
    name: mainChannelName,
  };

  const subCategoryModels: CategoryModel[] = subCategories.map((category) => {
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
      },
    };
  });

  return (
    <>
      <Form.Field>
        <CreateInput
          required
          label={getPolyglotText('?????????', 'Create-NM-?????????')}
          placeholder={getPolyglotText(
            '????????? ??????????????????.',
            'Create-NM-?????????PlaceHolder'
          )}
          value={parsePolyglotString(cubeSdo.name)}
          sizeLimited
          maxSize={100}
          invalidMessage={getPolyglotText(
            'You can enter up to 100 characters.',
            'Create-NM-?????????100cha'
          )}
          onChange={onChangeName}
        />
      </Form.Field>
      <Form.Field>
        <label className="necessary">
          <PolyglotText defaultString="????????????" id="Create-NM-????????????" />
        </label>
        <div>
          <ChannelFieldRow>
            <div className="cell v-middle">
              <span className="text1">
                <PolyglotText
                  defaultString="????????????"
                  id="Create-NM-????????????"
                />
              </span>
              <MainChannelModalContainer
                trigger={
                  <Button icon className="left post delete">
                    <PolyglotText
                      defaultString="????????????"
                      id="Create-NM-????????????Btn1"
                    />
                  </Button>
                }
                defaultSelectedChannel={mainChannel}
                onConfirmChannel={onConfirmMainChannel}
              />
            </div>
            <div className="cell v-middle">
              {mainCategory === undefined && (
                <span className="text1">
                  <PolyglotText
                    defaultString="??????????????? ??????????????????."
                    id="Create-NM-????????????Sub1"
                  />
                </span>
              )}
              {mainCategory !== undefined && (
                <span className="text2">
                  {getCollgeName(mainCategory.collegeId)} &gt;{' '}
                  {getChannelName(mainCategory.channelId)}
                </span>
              )}
            </div>
          </ChannelFieldRow>
          <ChannelFieldRow>
            <div className="cell v-middle">
              <span className="text1">
                <PolyglotText
                  defaultString="????????????"
                  id="Create-NM-????????????"
                />
              </span>
              <SubChannelModalContainer
                trigger={
                  <Button icon className="left post delete">
                    <PolyglotText
                      defaultString="????????????"
                      id="Create-NM-??????????????????Btn"
                    />
                  </Button>
                }
                targetCollegeId={selectedCollege?.collegeId}
                isMysuniCollege={compareCollgeCineroom(
                  selectedCollege?.collegeId || ''
                )}
                defaultSelectedCategoryChannels={subCategoryModels}
                onConfirmCategoryChannels={onConfirmSubChannel}
              />
            </div>
            <div className="cell v-middle">
              {(collegeIdList &&
                collegeIdList.length > 0 &&
                collegeIdList.map((collegeId, index) => (
                  <span className="text2" key={`channels-${index}`}>
                    {getCollgeName(collegeId)}
                    {` > `}
                    {renderChannelNames(collegeId, combineCollegeWithChannel)}
                  </span>
                ))) || (
                <span key="select-sub-category" className="text1">
                  <PolyglotText
                    defaultString="??????????????? ??????????????????."
                    id="Create-NM-??????????????????Sub"
                  />
                </span>
              )}
            </div>
          </ChannelFieldRow>
        </div>
      </Form.Field>
      <Form.Field>
        <label className="necessary">
          <PolyglotText defaultString="????????????" id="Create-NM-????????????" />
        </label>
        <div className="select-box">
          {params.personalCubeId === undefined && (
            <Select
              className="dropdown selection"
              value={cubeSdo.type}
              options={SelectOptions.cubeType}
              onChange={onChangeCubeType}
            />
          )}
          {params.personalCubeId !== undefined && (
            <input readOnly value={cubeSdo.type} />
          )}
        </div>
      </Form.Field>
    </>
  );
}

const CreateCubeBasicInfoFormViewDefault = observer(
  CreateCubeBasicInfoFormView
);

export default CreateCubeBasicInfoFormViewDefault;
