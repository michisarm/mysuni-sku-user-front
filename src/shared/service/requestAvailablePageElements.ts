import { findAvailablePageElementsCache } from '../../lecture/shared/api/arrangeApi';
import { setPageElements } from '../store/PageElementsStore';

export async function requestAvailablePageElements() {
  const pageElements = await findAvailablePageElementsCache();
  setPageElements(pageElements || []);
}
