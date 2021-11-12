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

export function useRequestLectureCardPisAgreementModal(cardId: string) {
  //
  useEffect(() => {
    requestLectureCardPisAgreementModal(cardId);
  }, []);
}

export async function requestLectureCardPisAgreementModal(cardId: string) {
  //
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  const lectureCardPisAgreementModal =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

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

    console.log(files);

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

export function onOpenLectureCardPisAgreementModal() {
  //
  const lectureCardPisAgreement =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  setLectureCardPisAgreementModal({
    ...lectureCardPisAgreement,
    isOpen: true,
  });
}

export function onCloseLectureCardPisAgreementModal() {
  //
  const lectureCardPisAgreement =
    getLectureCardPisAgreementModal() || initLectureCardPisAgreementModal();

  setLectureCardPisAgreementModal({
    ...lectureCardPisAgreement,
    isOpen: false,
  });
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
