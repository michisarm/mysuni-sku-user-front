import  {getMainPagePopupFirst}  from '../api/MainPagePopupApi';
import { setMainPagePopupItem } from '../store/MainPagePopupStore';

export function requestMainPagePopupFirst() {
  getMainPagePopupFirst().then((result) => {
    setMainPagePopupItem({
      id            : result.id,
      open          : result.open,
      contents      : result.contents,
      modifiedTime  : result.modifiedTime,
      modifier      : result.modifier,
      period        : result.period,
      time          : result.time,
      title         : result.title,
    })
  })
}
