import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Form, Segment } from 'semantic-ui-react';
import { mobxHelper } from '@nara.platform/accent';
import AplService from 'myTraining/present/logic/AplService';
import AplUdoModel from 'myTraining/model/AplUdoModel';
import { AplModel } from 'myTraining/model';
import { AplState } from 'myTraining/model/AplState';
import { ConfirmWin } from 'shared';
import approvalRoutePaths from 'myTraining/routePaths';
import ApprovalButtons from '../view/button/ApprovalButtons';
import MyApprovalInfoTable from '../view/table/MyApprovalInfoTable';
import ApprovalInfoView from '../view/ApprovalInfoView';
import ApprovalRejectModal from '../view/modal/ApprovalRejectModal';


interface Props {
  model: AplModel;
  aplService?: AplService;
}

function AplDetailContainer(props: Props) {
  const { model, aplService } = props;
  const history = useHistory();

  /* states */
  const [allowHour, setAllowHour] = useState<string>('');
  const [allowMinute, setAllowMinute] = useState<string>('');

  const [openListModal, setOpenListModal] = useState<boolean>(false);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openApprovalModal, setOpenApprovalModal] = useState<boolean>(false);

  /* effects */
  useEffect(() => {
    const allowHourStr = String(model.requestHour);
    const allowMinuteStr = String(model.requestMinute);

    setAllowHour(allowHourStr);
    setAllowMinute(allowMinuteStr);

  }, [model]);

  /* functions */
  const routeToList = () => {
    history.push(approvalRoutePaths.approvalPersonalLearning());
  };

  /* handlers */
  const onChangeAllowHour = useCallback((e: any) => {
    setAllowHour(e.target.value);
  }, []);

  const onChangeAllowMinute = useCallback((e: any) => {
    setAllowMinute(e.target.value);
  }, []);

  const onClearAllowHour = useCallback(() => {
    setAllowHour('');
  }, []);

  const onClearAllowMinute = useCallback(() => {
    setAllowMinute('');
  }, []);

  const onClickList = useCallback(() => {
    if (model.state === AplState.Opened || model.state === AplState.Rejected) {
      routeToList();
      return;
    }

    setOpenListModal(true);
  }, [model])

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
    const aplUdo = AplUdoModel.createForReject(model.id, remark);
    aplService!.modifyAplWithApprovalState(aplUdo)

    setOpenRejectModal(false);
    routeToList();
  }, [model]);


  const onClickApproval = useCallback(() => {
    setOpenApprovalModal(true);
  }, []);

  const onCancelApproval = useCallback(() => {
    setOpenApprovalModal(false);
  }, []);

  const onConfirmApproval = useCallback(() => {
    /* aplUdo 를 생성해 승인 로직을 처리해야 함. */
    const allowHourNumber = Number.parseInt(allowHour);
    const allowMinuteNumber = Number.parseInt(allowMinute);

    const aplUdo = AplUdoModel.createForApproval(model.id, allowHourNumber, allowMinuteNumber)
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
              allowHour={allowHour}
              allowMinute={allowMinute}
              onChangeAllowHour={onChangeAllowHour}
              onChangeAllowMinute={onChangeAllowMinute}
              onClearAllowHour={onClearAllowHour}
              onClearAllowMinute={onClearAllowMinute}
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
      </Segment>
    );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.aplService'
))(observer(AplDetailContainer));

const listMessage = `개인학습 List 화면으로 이동하시겠습니까?
개인학습 List로 이동 시 입력된 정보는 저장되지 않습니다.`;

const approvalMessage = '등록된 내용에 대해 승인 처리하시겠습니까?';