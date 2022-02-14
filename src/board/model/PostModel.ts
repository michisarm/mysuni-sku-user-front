import { DomainEntity, PatronKey } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { IdName, NameValueList, DatePeriod } from 'shared/model';

import PostContentsModel from './PostContentsModel';
import PostConfigModel from './PostConfigModel';
import PostCdoModel from './PostCdoModel';
import OpenState from './OpenState';
import WriterModel from './WriterModel';
import AlarmInfoModel from './AlarmInfoModel';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import { LangSupport } from 'lecture/model/LangSupport';
import IdPolyglotString from 'shared/model/IdPolyglotString';

class PostModel implements DomainEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  audienceKey: string = '';

  postId: string = '';
  title: PolyglotString | null = null;
  // title: string = '';
  writer: WriterModel = new WriterModel();
  contents: PostContentsModel = new PostContentsModel();
  registeredTime: number = 0;
  // time: number = 0;
  readCount: string = '';
  config: PostConfigModel = new PostConfigModel();
  category: IdPolyglotString = new IdPolyglotString();
  boardId: string = '';
  pinned: boolean = false;
  deleted: boolean = false;
  answered: boolean = false;
  answeredAt: string = '';
  answerUpdatedAt: string = '';
  openState: OpenState = OpenState.Created;
  answer: IdName = new IdName();
  period: DatePeriod = new DatePeriod();

  commentCount: number = 0;
  commentFeedbackId: string = '';
  alarmInfo: AlarmInfoModel = new AlarmInfoModel();
  langSupports: LangSupport[] = [];
  patronKey: PatronKey | undefined;

  constructor(post?: PostModel) {
    if (post) {
      const writer =
        (post.writer && new WriterModel(post.writer)) || this.writer;
      const category =
        (post.category && new IdPolyglotString(post.category)) || this.category;
      const contents =
        (post.contents && new PostContentsModel(post.contents)) ||
        this.contents;
      const config =
        (post.config && new PostConfigModel(post.config)) || this.config;
      const answer = (post.answer && new IdName(post.answer)) || this.answer;
      const period =
        (post.period && new DatePeriod(post.period)) || this.period;
      const alarmInfo =
        (post.alarmInfo && new AlarmInfoModel(post.alarmInfo)) ||
        this.alarmInfo;

      Object.assign(this, {
        ...post,
        writer,
        category,
        contents,
        config,
        answer,
        period,
        alarmInfo,
        patronKey: post.patronKey,
      });

      this.openState = post.openState || post.openState;
    }
  }

  static isBlank(post: PostModel): string {
    if (!post.title) return '제목';
    if (!post.category.id) return '문의유형';
    if (!post.contents || !post.contents.contents) return '내용';
    return 'success';
  }

  static asCdo(post: PostModel): PostCdoModel {
    return {
      audienceKey: post.audienceKey && post.audienceKey,
      boardId: post.boardId && post.boardId,
      title: post.title,
      writer: post.writer && post.writer,
      contents: post.contents && post.contents,
      config: post.config && post.config,
      category: post.category && post.category,
      alarmInfo: post.alarmInfo && post.alarmInfo,
    };
  }

  static modifyNameValueList(post: PostModel): NameValueList {
    const modifyNameValues = {
      nameValues: [
        {
          name: 'title',
          value: String(post.title),
        },
        {
          name: 'contents',
          value: JSON.stringify(post.contents),
        },
        {
          name: 'category',
          value: JSON.stringify(post.category),
        },
      ],
    };
    return modifyNameValues;
  }

  static asNameValueList(post: PostModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'deleted',
          value: String(post.deleted),
        },
        {
          name: 'commentFeedbackId',
          value: post.commentFeedbackId,
        },
      ],
    };
    return asNameValues;
  }
}

decorate(PostModel, {
  id: observable,
  entityVersion: observable,

  audienceKey: observable,
  postId: observable,
  title: observable,
  writer: observable,
  contents: observable,
  // time: observable,
  registeredTime: observable,
  readCount: observable,
  config: observable,
  category: observable,
  boardId: observable,
  langSupports: observable,
  pinned: observable,
  deleted: observable,
  answered: observable,
  answeredAt: observable,
  answerUpdatedAt: observable,
  openState: observable,
  answer: observable,
  period: observable,
  commentCount: observable,
  commentFeedbackId: observable,
  alarmInfo: observable,
  patronKey: observable,
});

export default PostModel;
