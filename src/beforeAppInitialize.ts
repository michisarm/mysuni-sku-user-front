import { requestAvailablePageElements } from './shared/service/requestAvailablePageElements';
import { initializeI18nResource } from './shared/viewmodel/PolyglotText';

export async function beforeAppInitialize() {
  await initializeI18nResource();
  await requestAvailablePageElements();
}
