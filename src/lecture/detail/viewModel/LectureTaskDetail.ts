import PostContentsModel from 'board/model/PostContentsModel';
import WriterModel from 'board/model/WriterModel';

export interface LectureTaskRepliesItem {
  contents: string;
  RepliesCount: number;
  writer: string;
  readCount: number;
  time: Date;
  child: [];
}

export interface LectureTaskChildRepliesItem {
  contents: string;
  RepliesCount: number;
  writer: string;
  readCount: number;
  time: Date;
}

export interface LectureTaskDetail {
  id: string;
  fileBoxId: string;
  title: string;
  writer: WriterModel;
  name: string;
  contents: string;
  time: number;
  readCount: number;
  commentFeedbackId: string;
}

export interface CommentInfo {
  writer: WriterModel;
}

export interface LectureTaskDetailCreateReplies {
  id: string;
  message: string;
  base64AttachedImage: string;
}
