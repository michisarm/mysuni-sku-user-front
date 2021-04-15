import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper, reactAlert, reactConfirm } from '@nara.platform/accent';
import { useParams } from 'react-router-dom';
import { CreateCubeDetailPageParams } from '../../model/CreateCubeDetailPageParams';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { Segment, Form, Button } from 'semantic-ui-react';
import { routeToCreateList } from '../../../routePaths';
import CreateCubeEditView from '../view/CreateCubeEditView';
import { useRequestCreateCubeDetail } from '../../service/useRequestCreateCubeDetail';
import CreateCubeBasicInfoView from '../view/CreateCubeBasicInfoView';
import CreateCubeExposureInfoView from '../view/CreateCubeExposureInfoView';
import CreateCubeDetailInfoView from '../view/CreateCubeDetailInfoView';
import CreateCubeTypeView from '../view/CreateCubeTypeView';
import { FileService } from '../../../../shared/present/logic/FileService';
import { getBlankRequiredCubeContentsField } from '../../model/CubeSdo';


interface CreateCubeDetailContainerProps {
  createCubeService?: CreateCubeService;
  fileService?: FileService;
}

function CreateCubeDetailContainer({  
  createCubeService,
  fileService,
}: CreateCubeDetailContainerProps) {
  const params = useParams<CreateCubeDetailPageParams>();

  const { createCubeDetail, cubeSdo } = createCubeService!;
  const { fileMap } = fileService!;

  useRequestCreateCubeDetail();

  const onSave = useCallback(() => {
    CreateCubeService.instance.modifyUserCube(params.personalCubeId, cubeSdo);
    routeToCreateList();
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

  const alertRequiredField =useCallback((message: string) => {
    reactAlert({ title: '필수 정보 입력 안내', message, warning: true });
  }, []);

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
                  sharingCineroomIds={createCubeDetail.cube.sharingCineroomIds}
                  tags={createCubeDetail.cubeContents.tags}
                />
                {
                  params.cubeState === 'OpenApproval' && (
                    <CreateCubeDetailInfoView
                      createCubeDetail={createCubeDetail}
                      cubeType={params.cubeState}
                    /> 
                  )
                }
                { params.cubeState !== 'OpenApproval' && ( 
                    <CreateCubeEditView />
                  )
                }
                <CreateCubeTypeView 
                  cubeMaterial={createCubeDetail.cubeMaterial} 
                  fileMap={fileMap}
                />
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

export default inject(mobxHelper.injectFrom(
  'personalCube.createCubeService',
  'shared.fileService',
))(observer(CreateCubeDetailContainer));