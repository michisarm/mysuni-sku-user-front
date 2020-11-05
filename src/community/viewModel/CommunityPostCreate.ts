interface Item {
  activated?: boolean;
}
export interface CommunityPostCreateItem extends Item {
  postId: string;
  pinned: boolean;
  title: string;
  contents: string;
  visible: boolean;
  // file
}

export interface CommunityPostCreate {
  postId: string;
  pinned: boolean;
  title: string;
  contents: string;
  visible: boolean;
  // file
}