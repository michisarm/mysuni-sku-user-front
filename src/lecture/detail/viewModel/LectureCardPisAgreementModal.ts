export default interface LectureCardPisAgreementModal {
  isOpen: boolean;
  pisAgreementTitle: string;
  pdfUrl: string;
  file: fileModel;
  numPages: number;
  pageNumber: number;
  checkedName: string;
  showWarning: boolean;
  isCard: boolean;
}

interface fileModel {
  //
  url: string;
  httpHeaders: {
    audienceId: string;
    Authorization: string;
  };
}

export function initLectureCardPisAgreementModal() {
  //
  return {
    isOpen: false,
    pisAgreementTitle: '',
    pdfUrl: '',
    file: initFileModel(),
    numPages: 0,
    pageNumber: 1,
    checkedName: '',
    showWarning: false,
    isCard: false,
  };
}

export function initFileModel() {
  //
  return {
    url: '',
    httpHeaders: {
      audienceId: '',
      Authorization: '',
    },
  };
}
