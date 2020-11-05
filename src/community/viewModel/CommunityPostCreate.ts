interface Item {
  activated?: boolean;
}
export interface CommunityPostCreateItem extends Item {
  title: string;
  contents: string;
  // 공지여부
  // file
  // 공개설정
}

export interface CommunityPostCreate {
  title: string;
  contents: string;
  // 공지여부
  // file
  // 공개설정
}