import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { AlertWin, ConfirmWin } from 'shared';
import ApprovalRejectModal from 'myTraining/ui/view/modal/ApprovalRejectModal';
import {
  getAplDetailForm,
  getAplDetailModal,
  setAplDetailModal,
  useAplDetailForm,
  useAplDetailModal,
} from './aplDetail.stores';
import { initAplDetailForm, initAplDetailModal } from './aplDetail.models';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  cancelRouteToList,
  onCancelApproval,
  onCancelReject,
  routeToList,
} from './aplDetail.events';
import { AplService } from 'myTraining/stores';
import AplApprovalUdo from 'myTraining/model/AplApprovalUdo';

function AplDetailModalContainer() {
  const { openListModal, openRejectModal, openApprovalModal, openAlertModal } =
    useAplDetailModal() || initAplDetailModal();
  const { allowHour, allowMinute, allowHourRef, allowMinuteRef } =
    useAplDetailForm() || initAplDetailForm();
  const aplService = AplService.instance;
  const { apl } = aplService;

  const onCloseAlertModal = useCallback(() => {
    const aplDetailModal = getAplDetailModal();
    const aplDetailForm = getAplDetailForm();
    if (aplDetailModal === undefined || aplDetailForm === undefined) {
      return;
    }

    if (!aplDetailForm.allowHour) {
      allowHourRef.current?.focus();
    }

    if (!aplDetailForm.allowMinute) {
      allowMinuteRef.current?.focus();
    }
    setAplDetailModal({
      ...aplDetailModal,
      openAlertModal: false,
    });
  }, []);

  const onConfirmReject = useCallback(
    async (remark: string) => {
      /* 반려사유를 전달 받아 aplUdo 를 생성해 반려 로직을 처리해야 함. */
      const aplUdo = AplApprovalUdo.createForReject(apl.id, remark);
      await aplService!.modifyAplWithApprovalState(aplUdo);

      const aplDetailModal = getAplDetailModal();
      if (aplDetailModal !== undefined) {
        setAplDetailModal({
          ...aplDetailModal,
          openRejectModal: false,
        });
      }
      routeToList();
    },
    [apl]
  );

  const onConfirmApproval = useCallback(async () => {
    /* aplUdo 를 생성해 승인 로직을 처리해야 함. */
    const allowHourNumber = Number.parseInt(allowHour);
    const allowMinuteNumber = Number.parseInt(allowMinute);

    const aplUdo = AplApprovalUdo.createForApproval(
      apl.id,
      allowHourNumber,
      allowMinuteNumber
    );
    await aplService!.modifyAplWithApprovalState(aplUdo);
    const aplDetailModal = getAplDetailModal();
    if (aplDetailModal !== undefined) {
      setAplDetailModal({
        ...aplDetailModal,
        openApprovalModal: false,
      });
    }
    routeToList();
  }, [allowHour, allowMinute, apl]);

  return (
    <>
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
    </>
  );
}

export default observer(AplDetailModalContainer);

const listMessage = getPolyglotText(
  `개인학습 List 화면으로 이동하시겠습니까? \n개인학습 List로 이동 시 입력된 정보는 저장되지 않습니다.`,
  '승인관리-개학목록-목록이동'
);

const approvalMessage = getPolyglotText(
  '등록된 내용에 대해 승인 처리하시겠습니까?',
  '승인관리-개학승인-승인처리'
);

const alertTitle = getPolyglotText(
  '필수 정보 입력 안내',
  '승인관리-개인상세-필수입력'
);

const alertMessage = getPolyglotText(
  `교육시간은 필수 입력 항목입니다. \n해당 정보를 입력하신 후 승인 요청 해주세요.`,
  '승인관리-개인상세-입력안내'
);
