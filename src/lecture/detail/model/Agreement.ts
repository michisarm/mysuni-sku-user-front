import { PatronKey } from '@nara.platform/accent';

export interface Agreement {
  agreementFormId: string;
  id: string;
  optionalClauseAgreements: optionalClauseAgreements[];
  patronKey: PatronKey;
  serviceId: string;
  signedDate: number;
}

interface optionalClauseAgreements {
  clauseId: string;
  accepted: boolean;
}
