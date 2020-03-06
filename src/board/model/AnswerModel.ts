
import { DomainEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

import PostContentsModel from './PostContentsModel';
import WriterModel from './WriterModel';


class AnswerModel implements DomainEntity {
  //
  id: string = '';
  entityVersion: number = 0;

  postId: string = '';
  writer: WriterModel = new WriterModel();
  updater: WriterModel = new WriterModel();
  writtenTime: number = 0;
  updateTime: number = 0;
  title: string = '';
  contents: PostContentsModel = new PostContentsModel();
  answerId: string = '';

  constructor(answer ?: AnswerModel) {
    if (answer) {
      //
      const writer = answer.writer && new WriterModel(answer.writer) || this.writer;
      const updater = answer.writer && new WriterModel(answer.updater) || this.updater;
      const writtenTime = new Date(answer.writtenTime).toLocaleDateString()
        .replace('. ', '-').replace('. ', '-')
        .replace('.', '');
      const contents = answer.contents && new PostContentsModel(answer.contents) || this.contents;

      Object.assign(this, { ...answer, writer, updater, writtenTime, contents });

    }
  }
}

decorate(AnswerModel, {
  id: observable,
  entityVersion: observable,

  postId: observable,
  writer: observable,
  updater: observable,
  writtenTime: observable,
  updateTime: observable,
  title: observable,
  contents: observable,
  answerId: observable,
});

export default AnswerModel;
