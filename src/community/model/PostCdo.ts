import PostType from "./PostType";

export default interface PostCdo {
  type?: PostType;
  title: string;
  html: string;
  fileBoxId?: string;
  commentFeedbackId?: string;
  pinned: boolean;
  readCount?: number;
  visible: boolean;
  menuId: string;
}