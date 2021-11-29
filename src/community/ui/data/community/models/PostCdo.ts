import { PostType } from './PostType';

export interface PostCdo {
  type?: PostType;
  title: string;
  html: string;
  fileBoxId?: string;
  thumbImagePath?: string;
  thumbImageFileName?: string;
  commentFeedbackId?: string;
  pinned: boolean;
  visible: boolean;
  menuId: string;
  videoId?: string;
  videoName?: string;
  relatedCardIds?: string[];
}
