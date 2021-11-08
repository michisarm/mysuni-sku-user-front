import { getMainPagePopupFirst } from '../api/MainPagePopupApi';
import { setMainPagePopupItem } from '../store/MainPagePopupStore';
import { getCookie } from '@nara.platform/accent';

export function requestMainPagePopupFirst() {
  const mainModal = getCookie('mainPopupModal');

  getMainPagePopupFirst().then((result) => {
    if (mainModal === 'HIDE') {
      // result.open = false;
    }

    setMainPagePopupItem({
      id: result.id,
      open: result.open,
      contents: result && result.contents,
      modifiedTime: result.modifiedTime,
      modifier: result.modifier,
      period: result.period,
      time: result.time,
      title: result.title,
    });
    return null;
  });
}
