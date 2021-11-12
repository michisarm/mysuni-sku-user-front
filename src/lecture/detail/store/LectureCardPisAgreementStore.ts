import LectureCardPisAgreementModal from '../viewModel/LectureCardPisAgreementModal';
import { createStore } from './Store';

const [
  setLectureCardPisAgreementModal,
  onLectureCardPisAgreementModal,
  getLectureCardPisAgreementModal,
  useLectureCardPisAgreementModal,
] = createStore<LectureCardPisAgreementModal>();

export {
  setLectureCardPisAgreementModal,
  onLectureCardPisAgreementModal,
  getLectureCardPisAgreementModal,
  useLectureCardPisAgreementModal,
};
