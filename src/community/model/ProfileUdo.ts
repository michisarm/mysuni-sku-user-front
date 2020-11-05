import { IdName } from "@nara.platform/accent";
import photo from "./photo";

export default interface ProfileUdo {
	company:IdName;
	department:IdName;
	email:string;
	photo:photo;
	nickname:string;
	introduce:string;
	hobby:string;
	modifierId:string;

}