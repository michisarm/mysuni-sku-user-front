import { useEffect } from 'react';
import { CheckboxProps } from 'semantic-ui-react';
import { findContentProviderCache } from '../../api/cubeApi';
import { updateAgreement } from '../../api/profileApi';
import {
  setLectureAgreementModal,
  getLectureAgreementModal,
  initLectureAgreementModal,
} from '../../store/LectureAgreementModalStore';
import { getLectureState } from '../../store/LectureStateStore';
import { isEmpty } from 'lodash';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';

export async function requestLectureAgreementModal() {
  const lectureState = getLectureState();

  if (lectureState !== undefined) {
    const organizedId = lectureState.cubeDetail.cubeContents.organizerId;
    const contentProvider = await findContentProviderCache(organizedId);
    let organizedName = '';
    if (contentProvider !== undefined) {
      organizedName = parsePolyglotString(
        contentProvider.name,
        getDefaultLang(contentProvider.langSupports)
      );
    }
    const lectureAgreementModal =
      getLectureAgreementModal() || initLectureAgreementModal();

    setLectureAgreementModal({
      ...lectureAgreementModal,
      organizedId,
      organizedName,
    });
  }
}

export function useRequsetLectureAgreementModal() {
  useEffect(() => {
    requestLectureAgreementModal();
  }, []);
}

export function onCloseLectureAgreementModal() {
  const lectureAgreementModal =
    getLectureAgreementModal() || initLectureAgreementModal();

  setLectureAgreementModal({
    ...lectureAgreementModal,
    isOpen: false,
  });
}

export function onOpenLectureAgreementModal() {
  const lectureAgreementModal =
    getLectureAgreementModal() || initLectureAgreementModal();

  setLectureAgreementModal({
    ...lectureAgreementModal,
    showWarning: false,
    checkedName: '',
    isOpen: true,
  });
}

export function onChangeLectureAgreementRadio(
  _: React.FormEvent,
  data: CheckboxProps
) {
  const lectureAgreementModal =
    getLectureAgreementModal() || initLectureAgreementModal();

  setLectureAgreementModal({
    ...lectureAgreementModal,
    checkedName: data.value as 'agree' | 'disagree' | '',
    showWarning: false,
  });
}

export async function onConfirmLectureAgreement(
  onShowClassroomModalView?: () => void
) {
  const lectureAgreementModal =
    getLectureAgreementModal() || initLectureAgreementModal();

  const { checkedName, organizedId } = lectureAgreementModal;

  if (isEmpty(checkedName)) {
    setLectureAgreementModal({
      ...lectureAgreementModal,
      showWarning: true,
    });
    return;
  }

  if (checkedName === 'disagree') {
    updateAgreement(organizedId, [false]);
    onCloseLectureAgreementModal();
    return;
  }

  if (checkedName === 'agree') {
    await updateAgreement(organizedId, [true]);
    onCloseLectureAgreementModal();
    onShowClassroomModalView && onShowClassroomModalView();
  }
}
