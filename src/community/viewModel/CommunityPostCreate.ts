interface Item {
  activated?: boolean;
}
export interface CommunityPostCreateItem extends Item {
  postId?: string;
  pinned: boolean;
  title: string;
  contents: string;
  visible: boolean;
  fileBoxId?: string;
  menuType?: string;
}

export interface CommunityPostCreate {
  postId?: string;
  pinned: boolean;
  title: string;
  contents: string;
  visible: boolean;
  fileBoxId?: string;
  menuType?: string;
}