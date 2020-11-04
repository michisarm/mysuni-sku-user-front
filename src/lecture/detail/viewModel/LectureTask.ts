import { PostContentsModel } from 'board/model';
import WriterModel from 'board/model/WriterModel';
import Answer from '../model/Answer';
import ExamQuestion from '../model/ExamQuestion';
import LearningState from '../model/LearningState';
import { LectureType } from './LectureType';

export type LectureTaskType = 'POSTS' | 'MYPOSTS' | 'OVERVIEW';

export interface LectureTask {
  items: LectureTaskItem[];
  totalCount: number;
  empty: boolean;
  offset: number;
  limit: number;
}

export interface LectureTaskItem {
  id: string;
  boardId: string;
  readCount: number;
  title: string;
  writer: string;
  time: number;
  child: boolean;
  count: number;
  childItems: LectureTaskChildItem[];
  commentFeedbackId?: string;
}

export interface LectureTaskChildItem {
  id: string;
  postId: string;
  readCount: number;
  title: string;
  writer: string;
  time: number;
  count: number;
  commentFeedbackId: string;
}
