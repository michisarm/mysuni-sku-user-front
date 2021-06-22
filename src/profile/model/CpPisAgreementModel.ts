import { PisOptionalClauseAgreement } from "./PisOptionalClauseAgreement";

export interface CpPisAgreementModel {
  id: string;
  entityVersion: number;
  agreementFormId: string;
  serviceId: string;
  signedDate: number;
  optionalClauseAgreements: PisOptionalClauseAgreement[];
}