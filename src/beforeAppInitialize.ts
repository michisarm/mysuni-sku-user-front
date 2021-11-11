import { SkProfileService } from './profile/stores';
import { requestAvailablePageElements } from './shared/service/requestAvailablePageElements';
import { reqeustBookmark } from './shared/service/requestBookmarks';
import { initializeI18nResource } from './shared/viewmodel/PolyglotText';

export async function beforeAppInitialize() {
  await SkProfileService.instance.findSkProfile();
  await initializeI18nResource();
  await requestAvailablePageElements();
  await reqeustBookmark();
}
