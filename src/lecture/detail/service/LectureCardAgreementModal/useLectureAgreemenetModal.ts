import {
  getLectureCardPisAgreementModal,
  setLectureCardPisAgreementModal,
} from '../../store/LectureCardPisAgreementStore';
import {
  initFileModel,
  initLectureCardPisAgreementModal,
} from '../../viewModel/LectureCardPisAgreementModal';
import { useEffect } from 'react';
import { findCardCache } from '../../api/cardApi';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import deport, { DepotFileViewModel } from '@nara.drama/depot';
import { patronInfo } from '@nara.platform/dock';
import { CheckboxProps } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import { getCurrentHistory } from '../../../../shared/store/HistoryStore';
import routePaths from '../../../routePaths';
import { updateCardPisAgreement } from '../../api/profileApi';

export function useRequestLectureCardPisAgreementModal(cardId: string) {
  //
  useEffect(() => {
    requestLectureCardPisAgreementModal(cardId);
  }, [cardId]);
}

export async function requestLectureCardPisAgreementModal(cardId: string) {
  //
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  const lectureCardPisAgreementModal =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  console.log(cardWithContentsAndRelatedCountRom);

  if (!cardWithContentsAndRelatedCountRom) {
    return;
  }

  if (cardWithContentsAndRelatedCountRom.cardContents.pisAgreementRequired) {
    const pisAgreementTitle = parsePolyglotString(
      cardWithContentsAndRelatedCountRom.cardContents.pisAgreementTitle
    );

    const file = initFileModel();
    const files:
      | DepotFileViewModel
      | DepotFileViewModel[] = await deport.getDepotFiles(
      parsePolyglotString(
        cardWithContentsAndRelatedCountRom.cardContents.pisAgreementDepotId
      ),
      true
    );

    if (!Array.isArray(files)) {
      file.url = '/api/depot/depotFile/flow/download/' + files.id;
    } else {
      file.url = '/api/depot/depotFile/flow/download/' + files[0].id;
    }

    file.httpHeaders = {
      audienceId: patronInfo.getPatronId() || '',
      Authorization: 'Bearer ' + localStorage.getItem('nara.token'),
    };

    setLectureCardPisAgreementModal({
      ...lectureCardPisAgreementModal,
      pisAgreementTitle,
      file,
    });
  }
}

export function onOpenLectureCardPisAgreementModal(isCard?: boolean) {
  // export function onOpenLectureCardPisAgreementModal() {
  //
  const lectureCardPisAgreement =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  setLectureCardPisAgreementModal({
    ...lectureCardPisAgreement,
    isOpen: true,
    isCard: isCard || false,
  });
}

export function onCloseLectureCardPisAgreementModal(cardId: string) {
  //
  const history = getCurrentHistory();
  const lectureCardPisAgreement =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  setLectureCardPisAgreementModal({
    ...lectureCardPisAgreement,
    isOpen: false,
    pageNumber: 1,
    showWarning: false,
    checkedName: '',
  });

  lectureCardPisAgreement.isCard
    ? setTimeout(() => {
        onOpenLectureCardPisAgreementModal(lectureCardPisAgreement.isCard);
      }, 500)
    : history?.push(routePaths.lectureCard(cardId));
}

export function setNumPages(page: number) {
  //
  const lectureCardPisAgreement =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  setLectureCardPisAgreementModal({
    ...lectureCardPisAgreement,
    numPages: page,
  });
}

export function nextPage() {
  //
  const lectureCardPisAgreement =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  if (lectureCardPisAgreement.pageNumber === lectureCardPisAgreement.numPages)
    return;

  setLectureCardPisAgreementModal({
    ...lectureCardPisAgreement,
    pageNumber: lectureCardPisAgreement.pageNumber + 1,
  });
}

export function prevPage() {
  //
  const lectureCardPisAgreement =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  if (lectureCardPisAgreement.pageNumber === 1) return;

  setLectureCardPisAgreementModal({
    ...lectureCardPisAgreement,
    pageNumber: lectureCardPisAgreement.pageNumber - 1,
  });
}

export function onChangeLectureCardPisAgreementRadio(
  _: React.FormEvent,
  data: CheckboxProps
) {
  //
  const lectureCardPisAgreement =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  setLectureCardPisAgreementModal({
    ...lectureCardPisAgreement,
    checkedName: data.value as 'agree' | 'disagree' | '',
  });
}

export async function onConfirmLectureCardPisAgreement(cardId: string) {
  //
  const lectureCardPisAgreement =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  const { checkedName } = lectureCardPisAgreement;

  if (isEmpty(checkedName)) {
    setLectureCardPisAgreementModal({
      ...lectureCardPisAgreement,
      showWarning: true,
    });
    return;
  }

  if (checkedName === 'disagree') {
    updateCardPisAgreement(cardId, [false]);
    onCloseLectureCardPisAgreementModal(cardId);
    return;
  }

  if (checkedName === 'agree') {
    //
    await updateCardPisAgreement(cardId, [true]);

    setLectureCardPisAgreementModal({
      ...lectureCardPisAgreement,
      isOpen: false,
    });
  }
}
