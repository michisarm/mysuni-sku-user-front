import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { useParams } from 'react-router-dom';
import { CreateCubeParams } from '../../model/CreateCubeParams';
import { Button } from 'semantic-ui-react';
import { routeToCreateList } from '../../../routePaths';
import { getBlankRequiredCubeField } from '../../model/CubeSdo';
import { useRequestCreateCubeDetail } from '../../service/useRequestCreateCubeDetail';
import CreateCubeContentsFormView from '../view/CreateCubeContentsFormView';
import CreateCubeContentsTypeContainer from './CreateCubeContentsTypeContainer';
import CreateCubeBasicInfoFormView from '../view/CreateCubeBasicInfoFormView';
import CreateCubeExposureInfoFormView from '../view/CreateCubeExposureInfoFormView';
import { useRequestSelectedCollege } from '../../service/useRequestSelectedCollege';


function CreateCubeContainer() {
  const params = useParams<CreateCubeParams>();
  useRequestCreateCubeDetail(params.personalCubeId);
  useRequestSelectedCollege();

  const { cubeSdo } = CreateCubeService.instance;

  const onClickSave = useCallback(() => {
    const blankField = getBlankRequiredCubeField(cubeSdo);

    if(blankField === 'none') {
      reactConfirm({
        title: '저장 안내',
        message: '입력하신 강좌를 저장 하시겠습니까?',
        onOk: onSave,
      });
    } else {
      alertRequiredField(blankField);
    }
  }, [cubeSdo]);

  const onSave = useCallback(async () => {
    if(cubeSdo.organizerId !== 'PVD00018') {
      cubeSdo.otherOrganizerName = '';
    }
    
    if(params.personalCubeId === undefined) {
      const newCubeId = await CreateCubeService.instance.registerUserCube(cubeSdo);

      if(newCubeId !== undefined) {
        reactAlert({
          title: '저장완료',
          message: '저장되었습니다.',
          onClose: routeToCreateList,
        }); 
      } else {
        reactAlert({ title: '저장 실패', message: '저장을 실패했습니다. 잠시 후 다시 시도해주세요.' });
      }
      return;
    }

    const result = await CreateCubeService.instance.modifyUserCube(params.personalCubeId, cubeSdo);

    if(result) {
      reactConfirm({
        title: '저장완료',
        message: '저장되었습니다. 목록 페이지로 이동하시겠습니까?',
        onOk: routeToCreateList
      }); 
    } else {
      reactAlert({ title: '저장 실패', message: '저장을 실패했습니다. 잠시 후 다시 시도해주세요.' });
    }
    
  }, [params.personalCubeId, cubeSdo]);

  const onClickDelete = useCallback(() => {
    reactConfirm({
      title: '강좌 삭제',
      message: '등록된 강좌정보를 삭제하시겠습니까? 삭제하신 정보는 복구하실 수 없습니다.',
      onOk: onDelete,
    });
  }, []);

  const onDelete = async () => {
    if(params.personalCubeId === undefined) {
      return;
    }

    const result = await CreateCubeService.instance.removeUserCube(params.personalCubeId);

    if(result) {
      routeToCreateList();
    } else {
      reactAlert({ title: '삭제 실패', message: '삭제를 실패했습니다. 잠시 후 다시 시도해주세요.' });
    } 
  };

  const alertRequiredField = useCallback((message: string) => {
    reactAlert({ title: '필수 정보 입력 안내', message, warning: true });
  }, []);

  return (
    <>
      <CreateCubeBasicInfoFormView />
      <hr className="dividing" />
      <CreateCubeExposureInfoFormView />
      <hr className="dividing" />
      <CreateCubeContentsFormView />
      <CreateCubeContentsTypeContainer />
      {
        params.personalCubeId !== undefined && (
          <div className="buttons">
            <Button type="button" className="fix line" onClick={onClickDelete}>Delete</Button>
            <Button type="button" className="fix line" onClick={routeToCreateList}>Cancel</Button>
            <Button type="button" className="fix bg" onClick={onClickSave}>Save</Button>
          </div>
        )
      }
      {
        params.personalCubeId === undefined && (
          <div className="buttons">
            <Button type="button" className="fix line" onClick={routeToCreateList}>Cancel</Button>
            <Button type="button" className="fix bg" onClick={onClickSave}>Save</Button>
          </div>
        )
      }
    </>
  );
}

const CreateCubeContainerDefault =  observer(CreateCubeContainer);

export default CreateCubeContainerDefault;