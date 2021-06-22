import { findMyPisAgreement } from "../present/apiclient/SkProfileApi";
import { setPisAgreementViewModel } from "../store/PisAgreementStore";

export async function requestPisAgreement(agreementFormId: string, serviceId: string) {
  const CpPisAgreementModel = await findMyPisAgreement(agreementFormId, serviceId);
  if(CpPisAgreementModel === undefined) {
    return;
  }

  setPisAgreementViewModel({
    agreementFormId: CpPisAgreementModel.agreementFormId,
    serviceId: CpPisAgreementModel.serviceId,
    signedDate: CpPisAgreementModel.signedDate,
    optionalClauseAgreements: CpPisAgreementModel.optionalClauseAgreements,
  });
}