import PostType from "./PostType";

export default interface PostCdo {
  type: PostType;
  title: string;
  html: string;
  visible: boolean;
  menuId: string;
}