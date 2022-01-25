import { patronInfo } from '@nara.platform/dock';
import { MenuControlAuthService } from 'approval/stores';
import { isSuperManager } from 'shared/helper/isSuperManager';
import { requestUserWorkspaces } from 'shared/service/useRequestUserWorkspaces';
import { SkProfileService } from './profile/stores';
import { requestAllColleges } from './shared/service/requestAllColleges';
import { requestAvailablePageElements } from './shared/service/requestAvailablePageElements';
import { requestBookmark } from './shared/service/requestBookmarks';
import { initializeI18nResource } from './shared/viewmodel/PolyglotText';

export async function beforeAppInitialize() {
  await SkProfileService.instance.findSkProfile();
  await MenuControlAuthService.instance.findMenuControlAuth();
  await initializeI18nResource();
  await requestAvailablePageElements();
  await requestBookmark();
  await requestAllColleges();
  if (isSuperManager()) {
    requestUserWorkspaces().then((workspaces) => {
      const companyCode = patronInfo.getPatronCompanyCode();
      if (workspaces && companyCode) {
        const target = workspaces.find(
          (workspace) => workspace.usid === companyCode
        );
        if (target) {
          patronInfo.setCineroomId(target.id);
        }
      }
    });
  }
}
