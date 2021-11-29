import { MenuControlAuthService } from 'approval/stores';
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
}
