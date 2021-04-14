import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAlert } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { useHistory, useParams } from 'react-router-dom';
import { CreateDetailPageParams } from '../../model/CreateDetailPageParams';
import { FormTitle } from '../view/DetailElementsView';
import { Button } from 'semantic-ui-react';
import cubePaths from '../../../routePaths';
import { SkProfileService } from '../../../../profile/stores';
import { CollegeService } from '../../../../college/stores';

interface CreateCubeContainerProps {
  createCubeService?: CreateCubeService;
  skProfileService?: SkProfileService;
  collegeService?: CollegeService;
}

function CreateCubeContainer({
  createCubeService,
  skProfileService,
  collegeService,
}: CreateCubeContainerProps) {
  const history = useHistory();
  const params = useParams<CreateDetailPageParams>();

  const { createCubeDetail, setTargetSubsidiaryId } = createCubeService!;

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
    const cubeType = createCubeDetail?.cube.type || '';
    history.push(cubePaths.createCubeIntroDetail(params.personalCubeId, cubeType));
  };

  const onClickSave = () => {
    
  };

  const onClickNext = () => {

  };

  const onClickDelete = () => {

  };

  const onSave = () => {

  };

  const onNext = () => {
    
  };

  const alertRequiredField = (message: string) => {
    reactAlert({ title: '필수 정보 입력 안내', message, warning: true });
  };

  return (
    <>
      <FormTitle
        activeStep={1}
      />
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
  'profile.skProfileService',
  'college.collegeService',
))(observer(CreateCubeContainer));