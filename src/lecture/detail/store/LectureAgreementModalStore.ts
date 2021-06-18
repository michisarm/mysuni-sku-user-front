import { createStore } from './Store';
import { LectureAgreementModal } from '../viewModel/LectureAgreementModal';

export const [
  setLectureAgreementModal,
  onLectureAgreementModal,
  getLectureAgreementModal,
  useLectureAgreementModal,
] = createStore<LectureAgreementModal>();

export function initLectureAgreementModal(): LectureAgreementModal {
  return {
    organizedId: '',
    organizedName: '',
    isOpen: false,
    showWarning: false,
    checkedName: '',
  };
}
