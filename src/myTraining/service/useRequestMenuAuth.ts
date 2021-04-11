import { SkProfileService } from "../../profile/stores";
import { MenuControlAuthService } from "../../approval/stores";

export function useRequestMenuAuth() {
  requestMenuAuth();
}

const requestMenuAuth = async () => {
  const profile = SkProfileService.instance.skProfile;

  if (profile) {
    return;
  }

  const foundProfile = await SkProfileService.instance.findSkProfile();
  MenuControlAuthService.instance.findMenuControlAuth(foundProfile.member.companyCode);
};