import SkProfileService from '../present/logic/SkProfileService';
import { SkProfileModel } from '../model';
import { findMyPisAgreement } from '../present/apiclient/SkProfileApi';
import { getCurrentHistory } from '../../shared/store/HistoryStore';
import profilePaths from '../routePaths';
import { setPisAgreementViewModel } from '../store/PisAgreementStore';
import { isEmpty } from 'lodash';

export async function requestProfile() {
  // TODO :: 현재 하드코딩 => 변경 예정
  const agreementFormId = '20210622-1';
  const serviceId = 'SUNI';

  const additionalUserInfo = SkProfileService.instance.additionalUserInfo;
  const currentHistory = getCurrentHistory();

  if (additionalUserInfo.mySuniPisAgreementFormId !== agreementFormId) {
    currentHistory?.push(profilePaths.personalInfoAgreement());
    return;
  }

  if (isEmpty(additionalUserInfo.currentJobGroupId)) {
    currentHistory?.push(profilePaths.favoriteWelcome());
  }
}
