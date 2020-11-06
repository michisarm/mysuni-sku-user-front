import { IdName } from "@nara.platform/accent";

export default interface Profile {
  name: string;
	company: IdName;
	department: IdName;
	email: string;
	profileImg: string;
	profileBgImg: string;
	nickname: string;
	introduce: string;
	hobby: string;
  creatorId: string;
  createdTime: number;
  modifierId: string;
  modifiedTime: number;
}