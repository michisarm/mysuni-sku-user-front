export interface LectureAgreementModal {
  organizedId: string;
  organizedName: string;
  showWarning: boolean;
  isOpen: boolean;
  checkedName: 'agree' | 'disagree' | '';
}
