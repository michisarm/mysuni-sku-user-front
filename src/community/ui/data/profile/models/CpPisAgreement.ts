import { PisOptionalClauseAgreement } from './PisOptionalClauseAgreement';

export interface CpPisAgreement {
  id: string;
  entityVersion: number;
  agreementFormId: string;
  serviceId: string;
  signedDate: number;
  optionalClauseAgreements: PisOptionalClauseAgreement[];
}
