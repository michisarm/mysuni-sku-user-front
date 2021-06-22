import { PisOptionalClauseAgreement } from "../model/PisOptionalClauseAgreement";

export interface PisAgreementViewModel {
  agreementFormId: string;
  serviceId: string;
  signedDate: number;
  optionalClauseAgreements: PisOptionalClauseAgreement[];
}