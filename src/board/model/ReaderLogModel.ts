import { DomainEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdName } from 'shared/model';

export class ReaderLogModel implements DomainEntity {
  //
  id: string = '';
  entityVersion: number = 0;

  boardId: string = '';
  postingId: string = '';
  reader: IdName = new IdName();
  readTime: string = '';

  constructor(readerLog?: ReaderLogModel) {
    if (readerLog) {

      const reader = readerLog.reader && new IdName(readerLog.reader) || this.reader;

      Object.assign(this, { ...readerLog, reader });
    }
  }
}

decorate(ReaderLogModel, {
  id: observable,
  entityVersion: observable,

  boardId: observable,
  postingId: observable,
  reader: observable,
  readTime: observable,

});
