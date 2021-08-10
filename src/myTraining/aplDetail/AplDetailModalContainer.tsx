import React from 'react';
import { observer } from 'mobx-react';
import { AlertWin, ConfirmWin } from 'shared';
import ApprovalRejectModal from 'myTraining/ui/view/modal/ApprovalRejectModal';
import { useAplDetailModal } from './aplDetail.stores';
import { initAplDetailModal } from './aplDetail.models';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  cancelRouteToList,
  onCancelApproval,
  onCancelReject,
  onCloseAlertModal,
  onConfirmApproval,
  onConfirmReject,
  routeToList,
} from './aplDetail.events';

function AplDetailModalContainer() {
  const { openListModal, openRejectModal, openApprovalModal, openAlertModal } =
    useAplDetailModal() || initAplDetailModal();

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
