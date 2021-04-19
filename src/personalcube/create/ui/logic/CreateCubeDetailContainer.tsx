import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { useParams } from 'react-router-dom';
import { CreateCubeDetailParams } from '../../model/CreateCubeDetailParams';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { Segment, Form, Button } from 'semantic-ui-react';
import { routeToCreateList } from '../../../routePaths';
import CreateCubeEditView from '../view/CreateCubeEditView';
import { useRequestCreateCubeDetail } from '../../service/useRequestCreateCubeDetail';
import CreateCubeBasicInfoView from '../view/CreateCubeBasicInfoView';
import CreateCubeExposureInfoView from '../view/CreateCubeExposureInfoView';
import CreateCubeDetailInfoView from '../view/CreateCubeDetailInfoView';
import { getBlankRequiredCubeContentsField, alertRequiredField } from '../../model/CubeSdo';
import CreateCubeDetailTypeContainer from '../view/CreateCubeDetailTypeContainer';


function CreateCubeDetailContainer() {
  const params = useParams<CreateCubeDetailParams>();
  useRequestCreateCubeDetail(params.personalCubeId);

  const { createCubeDetail, cubeSdo } = CreateCubeService.instance;

  const onSave = useCallback(async () => {
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

  const onClickSave = useCallback(() => {
    const blankField = getBlankRequiredCubeContentsField(cubeSdo);

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

  return (
    <>
      <div className="add-personal-learning support">
        <div className="add-personal-learning-wrap">
          <div className="apl-tit">Detail</div>
          <div className="apl-notice">
            생성하신 학습에 대한 확인과 수정, 그리고 승인요청을 할수 있습니다.
          </div>
        </div>
      </div>
      <Segment className="full">
        <div className="apl-form-wrap create">
          {
            createCubeDetail !== undefined && (
              <Form>
                <CreateCubeBasicInfoView
                  name={createCubeDetail.cube.name}
                  categories={createCubeDetail.cube.categories}
                  cubeType={createCubeDetail.cube.type}
                  cubeState={params.cubeState}
                  time={createCubeDetail.cube.time}
                  creatorName={createCubeDetail.cubeContents.creatorName}
                />
                <CreateCubeExposureInfoView
                  tags={createCubeDetail.cubeContents.tags}
                />
                {
                  params.cubeState === 'OpenApproval' && (
                    <CreateCubeDetailInfoView
                      createCubeDetail={createCubeDetail}
                    /> 
                  )
                }
                { params.cubeState !== 'OpenApproval' && ( 
                    <CreateCubeEditView />
                  )
                }
                <CreateCubeDetailTypeContainer />
                {
                  params.cubeState === 'OpenApproval' && (
                    <div className="buttons editor">
                      <Button className="fix bg" onClick={routeToCreateList}>List</Button>
                    </div>
                  )
                }
                {
                  params.cubeState !== 'OpenApproval' && (
                    <div className="buttons">
                      <Button className="fix line" onClick={routeToCreateList}>Cancel</Button>
                      <Button className="fix bg" onClick={onClickSave}>Save</Button>
                    </div>
                  )
                }
              </Form>
            )
          }
        </div>
      </Segment>
    </>
  );
}


const CreateCubeDetailContainerDefault = observer(CreateCubeDetailContainer);

export default CreateCubeDetailContainerDefault;