import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAlert, reactConfirm } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { useHistory, useParams } from 'react-router-dom';
import { CreateDetailPageParams } from '../../model/CreateDetailPageParams';
import { FormTitle } from '../view/DetailElementsView';
import { Button } from 'semantic-ui-react';
import cubePaths from '../../../routePaths';
import { getEmptyRequiredField } from '../../model/CubeSdo';
import CubeBasicFormContainer from './CubeBasicFormContainer';

interface CreateCubeContainerProps {
  createCubeService?: CreateCubeService;
}

function CreateCubeContainer({
  createCubeService,
}: CreateCubeContainerProps) {
  const history = useHistory();
  const params = useParams<CreateDetailPageParams>();

  const { createCubeDetail, setTargetSubsidiaryId, cubeSdo } = createCubeService!;

  useEffect(() => {
    if(!params.personalCubeId) {
      return;
    }
    createCubeService!.findCreateCubeDetail(params.personalCubeId);

    return () => {
      createCubeService!.clearCreateCubeDetail();
    };
  }, [params.personalCubeId]);

  useEffect(() => {
    if(createCubeDetail === undefined) {
      return;
    }

    const mainCategory = createCubeDetail.cube.categories.find(category => category.mainCategory === true); 
    const mainCategoryId = mainCategory?.collegeId || '';
    setTargetSubsidiaryId(mainCategoryId);
  }, [createCubeDetail]);


  const moveToCreateList = () => {
    history.push(cubePaths.create());
  };

  const moveToCreateIntro = () => {
    if(params.personalCubeId === undefined || params.cubeType === undefined) {
      return;
    }

    history.push(cubePaths.createCubeIntroDetail(params.personalCubeId, params.cubeType));
  };

  const onClickSave = () => {
    const result = getEmptyRequiredField(cubeSdo);

    if(result === 'success') {
      reactConfirm({
        title: '저장 안내',
        message: '입력하신 강좌를 저장 하시겠습니까?',
        onOk: onSave,
      });
    } else {
      alertRequiredField(result);
    }
  };

  const onClickNext = () => {
    const result = getEmptyRequiredField(cubeSdo);

    if(result === 'success') {
      reactConfirm({
        title: '저장 안내',
        message: '입력하신 강좌를 저장 하시겠습니까?',
        onOk: onNext,
      });
    } else {
      alertRequiredField(result);
    }
  };

  const onClickDelete = () => {

  };

  const onSave = () => {
    if(params.personalCubeId === undefined) {
      return;
    }

    createCubeService!.modifyUserCube(params.personalCubeId, cubeSdo);
  };

  const onNext = async () => {
    if(params.personalCubeId) {
      await createCubeService!.modifyUserCube(params.personalCubeId, cubeSdo);
      moveToCreateIntro();
    } else {
      const newCubeId = await createCubeService!.registerUserCube(cubeSdo);
      if(newCubeId !== undefined) {
        moveToCreateIntro();
      } else {
        reactAlert({ title: '저장 실패', message: '저장을 실패했습니다. 잠시 후 다시 시도해주세요.' });
      }
    }
  };

  const alertRequiredField = (message: string) => {
    reactAlert({ title: '필수 정보 입력 안내', message, warning: true });
  };

  return (
    <>
      <FormTitle
        activeStep={1}
      />
      <CubeBasicFormContainer />
      {/* <BasicInfoFormContainer
        contentNew={!params.personalCubeId}
        createCube={createCubeDetail}
        onChangePersonalCubeProps={this.onChangePersonalCubeProps}
        onChangeCollege={this.onChangeCollege}
      />
      <ExposureInfoFormContainer
        createCube={createCubeDetail}
        targetSubsidiaryId={targetSubsidiaryId}
        onChangePersonalCubeProps={this.onChangePersonalCubeProps}
      /> */}
      { params.personalCubeId ?
        <div className="buttons">
          <Button type="button" className="fix line" onClick={onClickDelete}>Delete</Button>
          <Button type="button" className="fix line" onClick={moveToCreateList}>Cancel</Button>
          <Button type="button" className="fix line" onClick={onClickSave}>Save</Button>
          <Button type="button" className="fix bg" onClick={onClickNext}>Next</Button>
        </div>
        :
        <div className="buttons">
          <Button type="button" className="fix line" onClick={moveToCreateList}>Cancel</Button>
          <Button type="button" className="fix bg" onClick={onClickNext}>Next</Button>
        </div>
      }
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
))(observer(CreateCubeContainer));