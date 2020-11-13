import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Form, Segment } from 'semantic-ui-react';
import { mobxHelper } from '@nara.platform/accent';
import depot from '@nara.drama/depot';
import myTrainingRoutePaths from 'myTraining/routePaths';
import AplService from 'myTraining/present/logic/AplService';
import AplUdoModel from 'myTraining/model/AplUdoModel';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';
import { AlertWin, ConfirmWin } from 'shared';
import ApprovalButtons from '../view/button/ApprovalButtons';
import MyApprovalInfoTable from '../view/table/MyApprovalInfoTable';
import ApprovalInfoView from '../view/ApprovalInfoView';
import ApprovalRejectModal from '../view/modal/ApprovalRejectModal';
import { MyLearningContentType } from '../model';


interface Props {
  model: AplModel;
  aplService?: AplService;
}

interface RouteParams {
  page: string;
}

function AplDetailContainer(props: Props) {
  const { model, aplService } = props;
  const history = useHistory();
  const { page } = useParams<RouteParams>();

  /* states */
  const [allowHour, setAllowHour] = useState<string>('');
  const [allowMinute, setAllowMinute] = useState<string>('');

  const [openListModal, setOpenListModal] = useState<boolean>(false);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openApprovalModal, setOpenApprovalModal] = useState<boolean>(false);
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);

  const [filesMap, setFilesMap] = useState(new Map<string, any>());

  const allowHourRef = useRef<HTMLInputElement>(null);
  const allowMinuteRef = useRef<HTMLInputElement>(null);

  /* effects */
  useEffect(() => {
    const allowHourStr = String(model.requestHour);
    const allowMinuteStr = String(model.requestMinute);

    setAllowHour(allowHourStr);
    setAllowMinute(allowMinuteStr);

  }, []);

  useEffect(() => {
    getFileIds();
  }, [model]);

  /* functions */
  const routeToList = () => {
    if (page === 'learning') {
      history.push(myTrainingRoutePaths.learningTab(MyLearningContentType.PersonalCompleted));
    }

    if (page === 'approval') {
      history.push(myTrainingRoutePaths.approvalPersonalLearning());
    }
  };


  const getFileIds = async () => {
    const referenceFileBoxIds = model && model.fileIds;

    if (referenceFileBoxIds) {
      await findFiles('reference', referenceFileBoxIds);
    }
  }

  const findFiles = async (type: string, fileBoxId: string) => {
    const files = await depot.getDepotFiles(fileBoxId);
    const newMap = new Map(filesMap.set(type, files));

    setFilesMap(newMap);
  };

  /* handlers */
  const onCloseAlertModal = useCallback(() => {
    setOpenAlertModal(false);

    if (!allowHour) {
      allowHourRef.current!.focus();
      return;
    }

    if (!allowMinute) {
      allowMinuteRef.current!.focus();
    }
  }, [allowHour, allowMinute, allowHourRef, allowMinuteRef]);

  const onChangeTime = useCallback((hourOrMinute: string, e: any) => {
    if (hourOrMinute === 'hour') {
      const allowHour = Number(e.target.value);
      /* input value 유효성 검사 */
      if (allowHour >= 0 && allowHour <= 12) {
        setAllowHour(String(allowHour));
      }

      return;
    }
    const allowMinute = Number(e.target.value);
    /* input value 유효성 검사 */
    if (allowMinute >= 0 && allowMinute <= 59) {
      setAllowMinute(String(allowMinute));
    }

  }, []);

  const onClearTime = useCallback((hourOrMinute: string) => {
    if (hourOrMinute === 'hour') {
      setAllowHour('');
      return;
    }

    setAllowMinute('');
  }, []);

  const onClickList = useCallback(() => {
    if (page === 'learning') {
      routeToList();
      return;
    }

    if (model.state === AplState.Opened || model.state === AplState.Rejected) {
      routeToList();
      return;
    }

    setOpenListModal(true);
  }, [model, page])

  const cancelRouteToList = useCallback(() => {
    setOpenListModal(false);
  }, []);

  const onClickReject = useCallback(() => {
    setOpenRejectModal(true);
  }, []);

  const onCancelReject = useCallback(() => {
    setOpenRejectModal(false);
  }, []);

  const onConfirmReject = useCallback((remark: string) => {
    /* 반려사유를 전달 받아 aplUdo 를 생성해 반려 로직을 처리해야 함. */
    const aplUdo = AplUdoModel.createForReject(model, remark);
    aplService!.modifyAplWithApprovalState(aplUdo)

    setOpenRejectModal(false);
    routeToList();
  }, [model]);


  const onClickApproval = useCallback(() => {
    /* allowHour & allowMinute 가 공백일 때, 필수 입력 알람창을 띄워야 함. */
    if (allowHour === '' || allowMinute === '') {
      setOpenAlertModal(true);
      return;
    }

    setOpenApprovalModal(true);
  }, [allowHour, allowMinute]);

  const onCancelApproval = useCallback(() => {
    setOpenApprovalModal(false);
  }, []);

  const onConfirmApproval = useCallback(() => {
    /* aplUdo 를 생성해 승인 로직을 처리해야 함. */
    const allowHourNumber = Number.parseInt(allowHour);
    const allowMinuteNumber = Number.parseInt(allowMinute);

    const aplUdo = AplUdoModel.createForApproval(model, allowHourNumber, allowMinuteNumber)
    aplService!.modifyAplWithApprovalState(aplUdo);

    setOpenApprovalModal(false);
    routeToList();

  }, [allowHour, allowMinute, model]);

  /* render */
  return model &&
    (
      <Segment className="full">
        <div className="apl-form-wrap create">
          <Form>
            <ApprovalInfoView
              model={model}
            />
            <MyApprovalInfoTable
              model={model}
              files={filesMap}
              allowHour={allowHour}
              allowMinute={allowMinute}
              onChangeTime={onChangeTime}
              onClearTime={onClearTime}
              allowHourRef={allowHourRef}
              allowMinuteRef={allowMinuteRef}
            />
            <ApprovalButtons
              approvalState={model.state}
              onClickList={onClickList}
              onClickReject={onClickReject}
              onClickApproval={onClickApproval}
            />
          </Form>
        </div>
        {/* 리스트 이동 확인 모달 */}
        {openListModal && (
          <ConfirmWin
            open={openListModal}
            title=""
            message={listMessage}
            handleOk={routeToList}
            handleClose={cancelRouteToList}
            buttonNoName="No"
            buttonYesName="Yes"
          />
        )}

        {/* 반려 확인 모달 */}
        {openRejectModal && (
          <ApprovalRejectModal
            open={openRejectModal}
            onCloseModal={onCancelReject}
            onConfirmModal={onConfirmReject}
          />
        )}

        {/* 승인 확인 모달 */}
        {openApprovalModal && (
          <ConfirmWin
            open={openApprovalModal}
            title=""
            message={approvalMessage}
            handleOk={onConfirmApproval}
            handleClose={onCancelApproval}
            buttonNoName="No"
            buttonYesName="Yes"
          />
        )}
        {openAlertModal && (
          <AlertWin
            open={openAlertModal}
            handleClose={onCloseAlertModal}
            title={alertTitle}
            message={alertMessage}
          />
        )}
      </Segment>
    );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.aplService'
))(observer(AplDetailContainer));

const listMessage = `개인학습 List 화면으로 이동하시겠습니까?
개인학습 List로 이동 시 입력된 정보는 저장되지 않습니다.`;

const approvalMessage = '등록된 내용에 대해 승인 처리하시겠습니까?';

const alertTitle = '필수 정보 입력 안내';

const alertMessage = `교육시간은 필수 입력 항목입니다.
해당 정보를 입력하신 후 승인 요청 해주세요.`;