export default interface PostRdo {
  searchFilter?: string;
  creatorName?: string;
  startDate?: number;
  endDate?: number;
  limit: number;
  offset: number;
  sort: string;
  searchGubun?: string;
  searchTitle?: string;
  
  postId?: string;
  communityId?: string;
  menuId?: string;
  //type?: PostTypeModel;
  title?: string;
  html?: string;
  likeCount?: number;
  replyCount?: number;
  attchmentCount?: number;
  visible?: boolean;
  creatorId?: string;
  createdTime?: number;
  modifierId?: string;
  modifiedTime?: number;
  pinned?: boolean;
}

// searchFilter: string;
//   name: string;
//   creatorName?: string;
//   startDate: number;
//   endDate: number;
//   limit: number;
//   offset: number;

//   id?: string;
//   communityId?: string;
//   courseId?: string;
//   createdTime?: number;
//   creatorId?: string;
//   deleted?: true;
//   description?: string;
//   field?: string;
//   managerId?: string;
//   managerName?: string;
//   modifiedTime?: number;
//   modifierId?: string;
//   thumbnailId?: string;
//   type?: string;
//   visible?: string;