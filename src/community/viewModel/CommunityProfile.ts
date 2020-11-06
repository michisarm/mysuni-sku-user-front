import { IdName } from "@nara.platform/accent";

interface Item {
  activated?: boolean;
  editing?: boolean;
}

export default interface CommunityProfileItem extends Item {
  name: string;
  company: IdName;
  profileImg: string;
  profileBgImg: string;
  nickname: string;
  introduce: string;
  hobby: string;
}

export default interface CommunityProfile {
  name: string;
  company: IdName;
  profileImg: string;
  profileBgImg: string;
  nickname: string;
  introduce: string;
  hobby: string;
}