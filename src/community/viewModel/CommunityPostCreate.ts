interface Item {
  activated?: boolean;
}
export interface CommunityPostCreateItem extends Item {
  postId: string;
  title: string;
  contents: string;
  // 공지여부
  // file
  // 공개설정
}

export interface CommunityPostCreate {
  postId: string;
  title: string;
  contents: string;
  // 공지여부
  // file
  // 공개설정
}