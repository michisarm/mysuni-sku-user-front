
import { QueryModel } from 'shared/model';
import { CoursePlanRdoModel } from './CoursePlanRdoModel';


export class CoursePlanQueryModel extends QueryModel {
  stamp: string = '';
  courseState: string = '';
  searchFilter: string = '';
  isPopup: boolean = false;

  static asCoursePlanRdo(courseQuery: CoursePlanQueryModel): CoursePlanRdoModel {
    //
    let isName = false;
    let isWord = false;
    if (courseQuery.searchPart === '과정명') isName = true;
    if (courseQuery.searchPart === '생성자') isWord = true;
    return (
      {
        startDate: courseQuery.period.startDateNumber,
        endDate: courseQuery.period.endDateNumber,
        college: courseQuery.college,
        channel: courseQuery.channel,
        name: isName && courseQuery && courseQuery.searchWord || '',
        creatorName: isWord && courseQuery && courseQuery.searchWord || '',
        offset: courseQuery.offset,
        limit: courseQuery.limit,

        stamp: courseQuery.stamp,
        courseState: courseQuery.courseState,
        searchFilter: courseQuery.searchFilter,
        isPopup: courseQuery.isPopup,
      }
    );
  }
}

