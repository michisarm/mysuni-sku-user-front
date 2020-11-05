import PostType from "./PostType";

export default interface PostUdo {
  type?: PostType;
  title: string;
  html: string;
  fileBoxId?: string;
  commentFeebackId?: string;
  pinned: boolean;
  readCount?: number;
  visible: boolean;
  menuId?: string;
}