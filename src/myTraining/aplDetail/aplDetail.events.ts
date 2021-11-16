import routePaths from 'myTraining/routePaths';
import { getAplDetailRouteParams } from 'myTraining/routeParams';
import { MyLearningContentType } from 'myTraining/ui/model/MyLearningContentType';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { AplService } from 'myTraining/stores';
import { AplState } from 'myTraining/model/AplState';
import {
  getAplDetailForm,
  getAplDetailModal,
  setAplDetailForm,
  setAplDetailModal,
} from './aplDetail.stores';
import AplApprovalUdo from 'myTraining/model/AplApprovalUdo';

export function routeToList() {
  const params = getAplDetailRouteParams();
  if (params === undefined) {
    return;
  }

  const currentHistory = getCurrentHistory();
  if (params.page === 'learning') {
    currentHistory?.push(
      routePaths.learningTab(MyLearningContentType.PersonalCompleted)
    );
  }
  if (params.page === 'approval') {
    currentHistory?.push(routePaths.approvalPersonalLearning());
  }
  const aplDetailModal = getAplDetailModal();
  if (aplDetailModal !== undefined) {
    setAplDetailModal({
      ...aplDetailModal,
      openListModal: false,
    });
  }
}

export function onClickList() {
  const params = getAplDetailRouteParams();
  const { apl } = AplService.instance;

  if (params === undefined) {
    return;
  }
  if (params.page === 'learning') {
    routeToList();
    return;
  }
  if (apl.state === AplState.Opened || apl.state === AplState.Rejected) {
    routeToList();
    return;
  }
  const aplDetailModal = getAplDetailModal();
  if (aplDetailModal !== undefined) {
    setAplDetailModal({
      ...aplDetailModal,
      openListModal: true,
    });
  }
}

export function onChangeTime(hourOrMinute: string, e: any) {
  const aplDetailForm = getAplDetailForm();
  if (aplDetailForm === undefined) {
    return;
  }
  if (hourOrMinute === 'hour') {
    const allowHour = Number(e.target.value);
    if (allowHour >= 0 && allowHour <= 999999) {
      setAplDetailForm({
        ...aplDetailForm,
        allowHour: String(allowHour),
      });
    }

    return;
  }
  const allowMinute = Number(e.target.value);
  if (allowMinute >= 0 && allowMinute <= 59) {
    setAplDetailForm({
      ...aplDetailForm,
      allowMinute: String(allowMinute),
    });
  }
}

export function onClearTime(hourOrMinute: string) {
  const aplDetailForm = getAplDetailForm();
  if (aplDetailForm === undefined) {
    return;
  }
  if (hourOrMinute === 'hour') {
    setAplDetailForm({
      ...aplDetailForm,
      allowHour: '',
    });
  } else {
    setAplDetailForm({
      ...aplDetailForm,
      allowMinute: '',
    });
  }
}

export function cancelRouteToList() {
  const aplDetailModal = getAplDetailModal();
  if (aplDetailModal !== undefined) {
    setAplDetailModal({
      ...aplDetailModal,
      openListModal: false,
    });
  }
}

export function onClickReject() {
  const aplDetailModal = getAplDetailModal();
  if (aplDetailModal !== undefined) {
    setAplDetailModal({
      ...aplDetailModal,
      openRejectModal: true,
    });
  }
}

export function onCancelReject() {
  const aplDetailModal = getAplDetailModal();
  if (aplDetailModal !== undefined) {
    setAplDetailModal({
      ...aplDetailModal,
      openRejectModal: false,
    });
  }
}

export function onCancelApproval() {
  const aplDetailModal = getAplDetailModal();
  if (aplDetailModal !== undefined) {
    setAplDetailModal({
      ...aplDetailModal,
      openApprovalModal: false,
    });
  }
}

export const onClickApproval = () => {
  /* allowHour & allowMinute 가 공백일 때, 필수 입력 알람창을 띄워야 함. */
  const aplDetailModal = getAplDetailModal();
  const aplDetailForm = getAplDetailForm();
  if (aplDetailModal === undefined || aplDetailForm === undefined) {
    return;
  }
  if (aplDetailForm.allowHour === '' || aplDetailForm.allowMinute === '') {
    setAplDetailModal({
      ...aplDetailModal,
      openAlertModal: true,
    });
    return;
  }

  setAplDetailModal({
    ...aplDetailModal,
    openApprovalModal: true,
  });
};

export const onCloseAlertModal = () => {
  const aplDetailModal = getAplDetailModal();
  const aplDetailForm = getAplDetailForm();
  if (aplDetailModal === undefined || aplDetailForm === undefined) {
    return;
  }

  if (!aplDetailForm.allowHour) {
    aplDetailForm.allowHourRef.current?.focus();
  }

  if (!aplDetailForm.allowMinute) {
    aplDetailForm.allowMinuteRef.current?.focus();
  }
  setAplDetailModal({
    ...aplDetailModal,
    openAlertModal: false,
  });
};

export const onConfirmReject = async (remark: string) => {
  /* 반려사유를 전달 받아 aplUdo 를 생성해 반려 로직을 처리해야 함. */
  const aplService = AplService.instance;
  const { apl } = aplService;
  const aplUdo = AplApprovalUdo.createForReject(apl.id, remark);
  await aplService.modifyAplWithApprovalState(aplUdo);

  const aplDetailModal = getAplDetailModal();
  if (aplDetailModal !== undefined) {
    setAplDetailModal({
      ...aplDetailModal,
      openRejectModal: false,
    });
  }
  routeToList();
};

export const onConfirmApproval = async () => {
  /* aplUdo 를 생성해 승인 로직을 처리해야 함. */
  const aplService = AplService.instance;
  const { apl } = aplService;
  const aplDetailForm = getAplDetailForm();
  if (aplDetailForm === undefined) {
    return;
  }
  const allowHourNumber = Number.parseInt(aplDetailForm.allowHour);
  const allowMinuteNumber = Number.parseInt(aplDetailForm.allowMinute);

  const aplUdo = AplApprovalUdo.createForApproval(
    apl.id,
    allowHourNumber,
    allowMinuteNumber
  );
  await aplService.modifyAplWithApprovalState(aplUdo);
  const aplDetailModal = getAplDetailModal();
  if (aplDetailModal !== undefined) {
    setAplDetailModal({
      ...aplDetailModal,
      openApprovalModal: false,
    });
  }
  routeToList();
};
