import { AplState } from 'myTraining/model/AplState';
import { APL_FOCUS_MAP } from 'myTraining/model/AplValidationData';
import { AplService } from 'myTraining/stores';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { routeToList } from '../aplCreate.events';
import AplCreateFocusService from '../mobx/AplCreateFocusService';
import AplCreateSaveOnService from '../mobx/AplCreateSaveOnService';
import { getAplCreateModal, setAplCreateModal } from './aplCreateModal.stores';

export function confirmBlank(message: string | any) {
  const aplCreateModal = getAplCreateModal();
  if (aplCreateModal !== undefined) {
    setAplCreateModal({
      ...aplCreateModal,
      alertMessage2: message,
      alertWinOpen2: true,
      alertTitle2: getPolyglotText(
        '필수 정보 입력 안내',
        '개학등록-승인요청-필수정보'
      ),
    });
  }
}

export function confirmSave(message: string | any, mode: string | any) {
  const aplCreateModal = getAplCreateModal();
  if (aplCreateModal !== undefined) {
    setAplCreateModal({
      ...aplCreateModal,
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: getPolyglotText(
        '승인 요청 안내',
        '개학등록-승인요청-주요내용'
      ),
      alertType: mode,
    });
  }
}

export function confirmList(message: string | any) {
  const aplCreateModal = getAplCreateModal();
  if (aplCreateModal !== undefined) {
    setAplCreateModal({
      ...aplCreateModal,
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: getPolyglotText('안내', '개학등록-승인요청-안내'),
      alertType: 'list',
    });
  }
}

export function confirmSaveCheck(message: string | any) {
  const aplCreateModal = getAplCreateModal();
  if (aplCreateModal !== undefined) {
    setAplCreateModal({
      ...aplCreateModal,
      alertMessage2: message,
      alertWinOpen2: true,
      alertTitle2: getPolyglotText(
        '요청 정보 입력 안내',
        '개학등록-승인요청-요청정보'
      ),
    });
  }
}

export function handleOKConfirmWinApl() {
  const { saveAplOn, setSaveAplOn } = AplCreateSaveOnService.instance;
  if (saveAplOn === false) {
    setSaveAplOn(true);
    const aplService = AplService.instance;
    const { apl } = aplService;

    aplService
      .saveApl(apl)
      .then(() => routeToList())
      .finally(() => {
        setSaveAplOn(false);
        const { aplCreateFocus, setAplCreateFocus } =
          AplCreateFocusService.instance;
        setAplCreateFocus({
          ...aplCreateFocus,
          focusYn: '',
        });
        const aplCreateModal = getAplCreateModal();
        if (aplCreateModal !== undefined) {
          setAplCreateModal({
            ...aplCreateModal,
            alertWinOpen: false,
          });
        }
      });
  }
}

export function handleSaveOk(type: string) {
  if (type === 'save') handleOKConfirmWinApl();
  if (type === 'list') routeToList();
}

export function handleAlertOk(type: string) {
  if (type === '안내') handleCloseAlertWin();
}

export function handleCloseSaveWin() {
  AplService.instance.changeAplProps('state', AplState.Created);

  const { aplCreateFocus } = AplCreateFocusService.instance;
  if (aplCreateFocus.focusYn === 'Y') {
    setFocusControl(aplCreateFocus.objStr, '');
  }
  const aplCreateModal = getAplCreateModal();
  if (aplCreateModal !== undefined) {
    setAplCreateModal({
      ...aplCreateModal,
      alertWinOpen: false,
    });
  }
}

export function handleCloseAlertWin() {
  AplService.instance.changeAplProps('state', AplState.Created);
  const { aplCreateFocus } = AplCreateFocusService.instance;
  if (aplCreateFocus.focusYn === 'Y') {
    setFocusControl(aplCreateFocus.objStr, '');
  }
  const aplCreateModal = getAplCreateModal();
  if (aplCreateModal !== undefined) {
    setAplCreateModal({
      ...aplCreateModal,
      alertWinOpen2: false,
    });
  }
}

export function setFocusControl(aplBlankField: string, focusYn: string) {
  if (APL_FOCUS_MAP[aplBlankField]) {
    const { aplCreateFocus, setAplCreateFocus } =
      AplCreateFocusService.instance;
    setAplCreateFocus({
      ...aplCreateFocus,
      focusControlName: APL_FOCUS_MAP[aplBlankField],
      focusYn,
    });
  }
}
