import PersonalInfoAgreementContainer from './ui/logic/PersonalInfoAgreementContainer';
import FavoriteWelcomePage from './ui/page/FavoriteWelcomePage';
import FavoriteCollegeContainer from './ui/logic/FavoriteCollegeContainer';
import FavoriteJobContainer from './ui/logic/FavoriteJobContainer';
import FavoriteLearningTypeContainer from './ui/logic/FavoriteLearningTypeContainer';
import SkProfileService from './present/logic/SkProfileService';
import ProgressPage from './ui/page/ProgressPage';
import { SkProfileModel } from './model/SkProfileModel';
import { EmployeeModel } from './model/EmployeeModel';
import { CodeNameModel } from './model/CodeNameModel';
import { StudySummary } from './model/StudySummary';

export const profileStores = {
  profile: {
    skProfileService: SkProfileService.instance,
  },
};


export {
  SkProfileModel, EmployeeModel, CodeNameModel, StudySummary,
  PersonalInfoAgreementContainer,
  FavoriteWelcomePage,
  ProgressPage,
  FavoriteCollegeContainer,
  FavoriteJobContainer,
  FavoriteLearningTypeContainer,
  SkProfileService,
};
