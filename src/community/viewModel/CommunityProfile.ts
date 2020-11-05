import { IdName } from "@nara.platform/accent";

export default interface CommunityProfile {
  name: string;
  company: IdName;
  photo: string;
  nickname: string;
  introduce: string;
  hobby: string;
}