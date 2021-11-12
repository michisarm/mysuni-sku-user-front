export default interface LectureCardPisAgreementModal {
  isOpen: boolean;
  pisAgreementTitle: string;
  pdfUrl: string;
  file: fileModel;
  numPages: number;
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
    numPage: 0,
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
