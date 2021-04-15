import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { useParams } from 'react-router-dom';
import { CreateCubeDetailPageParams } from '../../model/CreateCubeDetailPageParams';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { Segment, Form, Button } from 'semantic-ui-react';
import { AlertWin, ConfirmWin } from 'shared';
import SharedDetailBasicInfoView from '../view/SharedDetailBasicInfoView';
import SharedDetailExposureInfoView from '../view/SharedDetailExposureInfoView';
import SharedDetailIntroView from '../view/SharedDetailIntroView';
import SharedDetailIntroEditContainer from './SharedDetailIntroEditContainer';
import SharedTypeDetailView from '../view/SharedTypeDetailView';
import cubePaths, { routeToCreateList } from '../../../routePaths';
import CreateDetailBasicInfoView from '../view/CreateDetailBasicInfoView';
import CreateDetailExposureInfoView from '../view/CreateDetailExposureInfoView';
import CreateDetailInfoView from './CreateDetailInfoView';
import CreateDetailEditView from '../view/CreateDetailEditView';
import { useRequestCreateCubeDetail } from '../../service/useRequestCreateCubeDetail';
import CreateDetailTypeView from './CreateDetailTypeView';
import { DepotFileViewModel } from '@nara.drama/depot';


interface CreateCubeDetailContainerProps {
  createCubeService?: CreateCubeService;
}

function CreateCubeDetailContainer({  
  createCubeService,
}: CreateCubeDetailContainerProps) {
  const params = useParams<CreateCubeDetailPageParams>();

  const [alertWinOpen, setAlertWinOpen] = useState<boolean>(false);
  const [confirmWinOpen, setConfirmWinOpen] = useState<boolean>(false);

  const [fileMap ,setFileMap] = useState<Map<string, DepotFileViewModel[]>>(new Map<string, DepotFileViewModel[]>());
 

  useRequestCreateCubeDetail();

  const onClickSave = () => {

  };

  const onCloseAlertWin = () => {

  };

  const onConfirmAlertWin = () => {

  };

  const onCloseConfirmWin = () => {

  };

  const onConfrimConfirmWin = () => {

  };

  const { createCubeDetail } = createCubeService!;

  const message = <p className="center">입력하신 학습 강좌에 대해 저장 하시겠습니까?</p>;

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
            createCubeDetail && (
              <Form>
                <CreateDetailBasicInfoView createCubeDetail={createCubeDetail} />
                <CreateDetailExposureInfoView createCubeDetail={createCubeDetail} />
                {
                  params.cubeState === 'OpenApproval' && (
                    <CreateDetailInfoView
                      createCubeDetail={createCubeDetail}
                      cubeType={params.cubeState}
                    /> 
                  )|| ( 
                    <CreateDetailEditView createCubeDetail={createCubeDetail}/>
                  )
                }
                <CreateDetailTypeView createCubeDetail={createCubeDetail} fileMap={fileMap}/>
                {
                  params.cubeState === 'OpenApproval' ?
                    <div className="buttons editor">
                      <Button className="fix bg" onClick={routeToCreateList}>List</Button>
                    </div>
                    :
                    <div className="buttons">
                      <Button className="fix line" onClick={routeToCreateList}>Cancel</Button>
                      <Button className="fix bg" onClick={onClickSave}>Save</Button>
                    </div>
                }
                <AlertWin
                  message="hello"
                  handleClose={onCloseAlertWin}
                  open={alertWinOpen}
                  alertIcon="triangle"
                  title= "필수 정보 입력 안내"
                  handleOk={onConfirmAlertWin}
                />
                <ConfirmWin
                  id={params.personalCubeId}
                  message={message}
                  open={confirmWinOpen}
                  handleClose={onCloseConfirmWin}
                  handleOk={onConfrimConfirmWin}
                  title="저장 안내"
                  buttonYesName="OK"
                  buttonNoName="Cancel"
                />
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
))(observer(CreateCubeDetailContainer));