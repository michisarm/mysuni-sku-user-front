import { decorate, observable } from 'mobx';

export class PanoptoCdoModel {
  currentPage: string = '1';
  'page_size': string = '10';
  folderOwnerId: string = '';     // 사용자 email => folderName
  sessionState: string = '110000';     // 방송 상태
}

decorate(PanoptoCdoModel, {
  currentPage: observable,
  page_size: observable,
  folderOwnerId: observable,
  sessionState: observable,
});
