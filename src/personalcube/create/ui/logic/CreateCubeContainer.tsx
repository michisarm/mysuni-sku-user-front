import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { useParams } from 'react-router-dom';
import { CreateCubeParams } from '../../model/CreateCubeParams';
import { Button } from 'semantic-ui-react';
import { routeToCreateList } from '../../../routePaths';
import { getBlankRequiredCubeContentsField } from '../../model/CubeSdo';
import { useRequestCreateCubeDetail } from '../../service/useRequestCreateCubeDetail';
import CreateCubeContentsFormView from '../view/CreateCubeContentsFormView';
import CreateCubeContentsTypeContainer from './CreateCubeContentsTypeContainer';
import CreateCubeBasicInfoFormView from '../view/CreateCubeBasicInfoFormView';
import CreateCubeExposureInfoFormView from '../view/CreateCubeExposureInfoFormView';
import { useRequestSelectedCollege } from '../../service/useRequestSelectedCollege';
import { requestOpenUserCube } from '../../../personalcube/present/apiclient/cubeApi';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../shared/ui/logic/PolyglotText';

function CreateCubeContainer() {
  const params = useParams<CreateCubeParams>();
  useRequestCreateCubeDetail(params.personalCubeId);
  useRequestSelectedCollege();

  const { cubeSdo } = CreateCubeService.instance;

  const onClickSave = useCallback(() => {
    const blankField = getBlankRequiredCubeContentsField(cubeSdo);

    if (blankField === 'none') {
      reactConfirm({
        title: getPolyglotText('저장 안내', 'Create-NewButtonSave-ModalTitle'),
        message: getPolyglotText(
          '입력하신 강좌를 저장 하시겠습니까?',
          'Create-NewButtonSave-ModalInfo'
        ),
        onOk: onSave,
      });
    } else {
      alertRequiredField(blankField);
    }
  }, [cubeSdo]);

  const onSave = useCallback(async () => {
    if (cubeSdo.organizerId !== 'PVD00018') {
      cubeSdo.otherOrganizerName = '';
    }

    if (params.personalCubeId === undefined) {
      const newCubeId = await CreateCubeService.instance.registerUserCube(
        cubeSdo
      );

      if (newCubeId !== undefined) {
        reactAlert({
          title: getPolyglotText('저장완료', 'Create-NewButtonSave-Complete'),
          message: getPolyglotText(
            '저장되었습니다.',
            'Create-NewButtonSave-CompleteInfo'
          ),
          onClose: routeToCreateList,
        });
      } else {
        reactAlert({
          title: getPolyglotText('저장 실패', 'Create-NewButtonSave-Fail'),
          message: getPolyglotText(
            '저장을 실패했습니다. 잠시 후 다시 시도해주세요.',
            'Create-NewButtonSave-FailInfo'
          ),
        });
      }
      return;
    }

    const result = await CreateCubeService.instance.modifyUserCube(
      params.personalCubeId,
      cubeSdo
    );

    if (result) {
      reactConfirm({
        title: getPolyglotText('저장완료', 'Create-ModifyButtonSave-Complete'),
        message: getPolyglotText(
          '저장되었습니다. 목록 페이지로 이동하시겠습니까?',
          'Create-ModifyButtonSave-CompleteInfo'
        ),
        onOk: routeToCreateList,
      });
    } else {
      reactAlert({
        title: getPolyglotText('저장 실패', 'Create-ModifyButtonSave-Fail'),
        message: getPolyglotText(
          '저장을 실패했습니다. 잠시 후 다시 시도해주세요.',
          'Create-ModifyButtonSave-FailInfo'
        ),
      });
    }
  }, [params.personalCubeId, cubeSdo]);

  const onClickDelete = useCallback(() => {
    reactConfirm({
      title: getPolyglotText(
        '강좌 삭제',
        'Create-ModifyButtonDelete-ModalTitle'
      ),
      message: getPolyglotText(
        '등록된 강좌정보를 삭제하시겠습니까? 삭제하신 정보는 복구하실 수 없습니다.',
        'Create-ModifyButtonDelete-ModalInfo'
      ),
      onOk: onDelete,
    });
  }, []);

  const onDelete = async () => {
    if (params.personalCubeId === undefined) {
      return;
    }

    const result = await CreateCubeService.instance.removeUserCube(
      params.personalCubeId
    );

    if (result) {
      routeToCreateList();
    } else {
      reactAlert({
        title: getPolyglotText('삭제 실패', 'Create-ModifyButtonDelete-Fail'),
        message: getPolyglotText(
          '삭제를 실패했습니다. 잠시 후 다시 시도해주세요.',
          'Create-ModifyButtonDelete-FailInfo'
        ),
      });
    }
  };

  const onClickApprovalRequest = useCallback(() => {
    const blankField = getBlankRequiredCubeContentsField(cubeSdo);

    if (blankField === 'none') {
      reactConfirm({
        title: getPolyglotText(
          '승인 요청 안내',
          'Create-ModifyButtonApprovol-ModalTitle'
        ),
        message: getPolyglotText(
          '학습 강좌에 대해 승인 요청하시겠습니까?',
          'Create-ModifyButtonApprovol-ModalInfo'
        ),
        onOk: onApprovalRequest,
      });
    } else {
      alertRequiredField(blankField);
    }
  }, [cubeSdo]);

  const onApprovalRequest = useCallback(async () => {
    if (params.personalCubeId === undefined) {
      return;
    }

    const result = await requestOpenUserCube(params.personalCubeId);

    if (result) {
      reactAlert({
        title: getPolyglotText(
          '승인요청 완료',
          'Create-ModifyButtonApprovol-Complete'
        ),
        message: getPolyglotText(
          '승인요청이 완료되었습니다.',
          'Create-ModifyButtonApprovol-CompleteInfo'
        ),
        onClose: routeToCreateList,
      });
    } else {
      reactAlert({
        title: getPolyglotText(
          '승인요청 실패',
          'Create-ModifyButtonApprovol-Fail'
        ),
        message: getPolyglotText(
          '승인요청을 실패했습니다. 잠시 후 다시 시도해주세요.',
          'Create-ModifyButtonApprovol-FailInfo'
        ),
      });
    }
  }, [params.personalCubeId]);

  const alertRequiredField = useCallback((message: string) => {
    reactAlert({
      title: getPolyglotText(
        '필수 정보 입력 안내',
        'Create-NMButtonRequired-필수정보입력'
      ),
      message,
      warning: true,
    });
  }, []);

  return (
    <>
      <CreateCubeBasicInfoFormView />
      <hr className="dividing" />
      <CreateCubeExposureInfoFormView />
      <hr className="dividing" />
      <CreateCubeContentsFormView />
      <CreateCubeContentsTypeContainer />
      {params.personalCubeId !== undefined && (
        <div className="buttons">
          <Button type="button" className="fix line" onClick={onClickDelete}>
            <PolyglotText
              defaultString="Delete"
              id="Create-ModifyButtonDelete-Button"
            />
          </Button>
          <Button
            type="button"
            className="fix line"
            onClick={routeToCreateList}
          >
            <PolyglotText
              defaultString="Cancel"
              id="Create-ModifyButtonCancel-Button"
            />
          </Button>
          <Button type="button" className="fix line" onClick={onClickSave}>
            <PolyglotText
              defaultString="Save"
              id="Create-ModifyButtonSave-Save"
            />
          </Button>
          <Button
            type="button"
            className="fix bg"
            onClick={onClickApprovalRequest}
          >
            <PolyglotText
              defaultString="승인요청"
              id="Create-ModifyButtonApprovol-Button"
            />
          </Button>
        </div>
      )}
      {params.personalCubeId === undefined && (
        <div className="buttons">
          <Button
            type="button"
            className="fix line"
            onClick={routeToCreateList}
          >
            <PolyglotText
              defaultString="Cancel"
              id="Create-NewButtonCancel-Button"
            />
          </Button>
          <Button type="button" className="fix bg" onClick={onClickSave}>
            <PolyglotText defaultString="Save" id="Create-NewButtonSave-Save" />
          </Button>
        </div>
      )}
    </>
  );
}

const CreateCubeContainerDefault = observer(CreateCubeContainer);

export default CreateCubeContainerDefault;
