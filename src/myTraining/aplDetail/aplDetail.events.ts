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
