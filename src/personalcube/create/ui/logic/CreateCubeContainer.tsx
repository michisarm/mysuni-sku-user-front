import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAlert, reactConfirm } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { useHistory, useParams } from 'react-router-dom';
import { CreateCubePageParams } from '../../model/CreateCubePageParams';
import { FormTitle } from '../view/DetailElementsView';
import { Button } from 'semantic-ui-react';
import cubePaths from '../../../routePaths';
import { getBlankRequiredField } from '../../model/CubeSdo';
import { CollegeService } from '../../../../college/stores';
import { CollegeType } from '../../../../college/model';
import CreateBasicFormContainer from './CreateBasicFormContainer';
import CreateExposureFormContainer from './CreateExposureFormContainer';
import { useRequestCreateCubeDetail } from '../../service/useRequestCreateCubeDetail';
import { getMainCategory } from '../../model/CreateCubeDetail';

interface CreateCubeContainerProps {
  createCubeService?: CreateCubeService;
  collegeService?: CollegeService;
}

function CreateCubeContainer({
  createCubeService,
  collegeService,
}: CreateCubeContainerProps) {
  const history = useHistory();
  const params = useParams<CreateCubePageParams>();

  useRequestCreateCubeDetail();

  const { createCubeDetail, cubeSdo } = createCubeService!;

  useEffect(() => {
    const mainCategory = getMainCategory(createCubeDetail?.cube.categories || []);

    if(mainCategory !== undefined) {
      setCompanyCineroom(mainCategory.collegeId);
    }

  }, [createCubeDetail]);

  const setCompanyCineroom = async (collegeId: string) => {
    const college = await collegeService!.findCollege(collegeId);
    if(college && college.collegeType === CollegeType.Company) {
      CreateCubeService.instance.setCompanyCineroomId(collegeId);
    }
  }

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
    const blankField = getBlankRequiredField(cubeSdo);

    if(blankField === 'none') {
      reactConfirm({
        title: '저장 안내',
        message: '입력하신 강좌를 저장 하시겠습니까?',
        onOk: onSave,
      });
    } else {
      alertRequiredField(blankField);
    }
  };

  const onClickNext = () => {
    const blankField = getBlankRequiredField(cubeSdo);

    if(blankField === 'none') {
      reactConfirm({
        title: '저장 안내',
        message: '입력하신 강좌를 저장 하시겠습니까?',
        onOk: onNext,
      });
    } else {
      alertRequiredField(blankField);
    }
  };

  const onClickDelete = () => {

  };

  const onSave = () => {
    if(params.personalCubeId === undefined) {
      return;
    }

    CreateCubeService.instance.modifyUserCube(params.personalCubeId, cubeSdo);
  };

  const onNext = async () => {
    if(params.personalCubeId) {
      await CreateCubeService.instance.modifyUserCube(params.personalCubeId, cubeSdo);
      moveToCreateIntro();
    } else {
      const newCubeId = await CreateCubeService.instance.registerUserCube(cubeSdo);
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
      <CreateBasicFormContainer />
      <CreateExposureFormContainer />
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
  'college.collegeService',
))(observer(CreateCubeContainer));