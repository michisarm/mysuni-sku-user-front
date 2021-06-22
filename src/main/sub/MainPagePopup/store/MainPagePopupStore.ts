import MainPagePopupView from '../viewModel/MainPagePopupView';
import { createStore } from './Store';
import {NewDatePeriod} from "../../../../shared/model/NewDatePeriod";

const [
    setMainPagePopupItem,
    onMainPagePopupItem,
    getMainPagePopupItem,
    useMainPagePopupItem
] = createStore<MainPagePopupView>(
    {
      id          : '',
      title       : '',
      contents    : '', //본문내용
      open        : false, //게시 플레그(Y,N)
      time        : '', //생성시간
      modifier    : '',
      modifiedTime: '',
      period: new NewDatePeriod(),//게시 시간
    }
);

export {
  setMainPagePopupItem,
  onMainPagePopupItem,
  getMainPagePopupItem,
  useMainPagePopupItem
}
