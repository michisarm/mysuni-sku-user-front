import SkProfileService from "../present/logic/SkProfileService";
import { SkProfileModel } from "../model";
import { findMyPisAgreement } from "../present/apiclient/SkProfileApi";
import { getCurrentHistory } from "../../shared/store/HistoryStore";
import profilePaths from "../routePaths";
import { setPisAgreementViewModel } from "../store/PisAgreementStore";

export async function requestProfile() {
  const skProfileService = SkProfileService.instance;
  const skProfileModel: SkProfileModel = await skProfileService.findSkProfile();
  
  const agreementFormId = '20210622-1';
  const serviceId = 'SUNI';
  const CpPisAgreementModel = await findMyPisAgreement(agreementFormId, serviceId);

  const currentHistory = getCurrentHistory();
  
  if(CpPisAgreementModel === undefined) {
    currentHistory?.push(profilePaths.personalInfoAgreement());
    return;
  }

  setPisAgreementViewModel({
    agreementFormId: CpPisAgreementModel.agreementFormId,
    serviceId: CpPisAgreementModel.serviceId,
    signedDate: CpPisAgreementModel.signedDate,
    optionalClauseAgreements: CpPisAgreementModel.optionalClauseAgreements,
  });

  if(needToReAgree(CpPisAgreementModel.signedDate)) {
    currentHistory?.push(profilePaths.guideAgreement());
    return;
  }

  if(skProfileModel !== null && skProfileModel.studySummaryConfigured === false) {
    currentHistory?.push(profilePaths.favoriteWelcome());
  }
}

function needToReAgree(signedDate: number) {
  const reAgreeDate = new Date('2020-08-30').getTime();
  return reAgreeDate > signedDate ? true : false;
}