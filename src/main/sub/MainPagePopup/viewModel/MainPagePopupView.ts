import { NewDatePeriod } from 'shared/model/NewDatePeriod';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export default interface MainPagePopupView {
  //
  id: string;
  title: PolyglotString | null;
  contents: PolyglotString | null; //본문내용
  open: boolean; //게시 플레그(Y,N)
  time: string; //생성시간
  modifier: string;
  modifiedTime: string;

  period: NewDatePeriod; //게시 시간
}
