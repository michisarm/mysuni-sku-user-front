import { IdName } from "@nara.platform/accent";
import photo from "./photo";

export default interface ProfileCdo {
	id:string;
	name:string;
	company:IdName;
	department:IdName;
	email:string;
	photo:photo;
	nickname:string;
	introduce:string;
	hobby:string;
	creatorId:string;
}