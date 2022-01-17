import { setIsOpenRecommendMemberPopUp } from './recommendMemberPopUp.store';

export function onOpenRecommendMemberPopUp() {
  setIsOpenRecommendMemberPopUp(true);
}

export function onCloseRecommendMemberPopUp() {
  setIsOpenRecommendMemberPopUp(false);
}
