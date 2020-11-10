import { DenizenKey, PatronType } from "@nara.platform/accent";
import { patronInfo } from "@nara.platform/dock";

//
class StudentHideUdo {

  private readonly denizenKey: DenizenKey = {
    keyString: patronInfo.getDenizenId() || '',
    patronType: PatronType.Denizen
  };

  private readonly lectureUsids: string[] = [];

  private constructor(lectureUsids: string[]) {
    this.lectureUsids = lectureUsids;
  }

  public static createWith(selectedServiceIds: string[]) {
    return new StudentHideUdo(selectedServiceIds);
  }
}

export default StudentHideUdo;