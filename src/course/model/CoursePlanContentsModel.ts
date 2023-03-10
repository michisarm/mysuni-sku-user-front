import { DramaEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { PatronKey, DatePeriod, NameValueList, CreatorModel } from 'shared/model';
import { CourseSetModel } from './CourseSetModel';
import { CoursePlanContentsCdoModel } from './CoursePlanContentsCdoModel';

export class CoursePlanContentsModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = new PatronKey();

  description: string = '';
  creator: CreatorModel = new CreatorModel();
  learningPeriod: DatePeriod = new DatePeriod();
  courseSet: CourseSetModel = new CourseSetModel();

  surveyId: string = '';
  surveyCaseId: string = '';
  surveyTitle: string = '';
  surveyDesignerName: string = '';

  testId: string = '';
  paperId: string = '';
  examTitle: string = '';
  examAuthorName: string = '';

  fileBoxId: string = '';

  totalCourseCount: number = 0;

  constructor(courseContents?: CoursePlanContentsModel) {
    //
    if (courseContents) {
      const creator = courseContents.creator && new CreatorModel(courseContents.creator) || this.creator;
      const learningPeriod = courseContents.learningPeriod && new DatePeriod(courseContents.learningPeriod) || this.learningPeriod;
      const courseSet = courseContents.courseSet && new CourseSetModel(courseContents.courseSet) || this.courseSet;

      Object.assign(this, { ...courseContents, creator, learningPeriod, courseSet });
    }
  }

  static  asNameValues(courseContents: CoursePlanContentsModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'description',
          value: courseContents.description,
        },
        {
          name: 'creator',
          value: JSON.stringify(courseContents.creator),
        },
        {
          name: 'learningPeriod',
          value: JSON.stringify(courseContents.learningPeriod),
        },
        {
          name: 'courseSet',
          value: JSON.stringify(courseContents.courseSet),
        },
        {
          name: 'surveyId',
          value: courseContents.surveyId,
        },
        {
          name: 'testId',
          value: courseContents.testId,
        },
      ],
    };

    return asNameValues;
  }

  static isBlank(courseContents: CoursePlanContentsModel) : string {
    // if (!courseContents.learningPeriod.startDateSub || !courseContents.learningPeriod.endDateSub) return '????????????';
    // if (!courseContents.description) return 'Course ??????';
    return 'success';
  }


  static asCdo(coursePlanContents: CoursePlanContentsModel): CoursePlanContentsCdoModel {
    //
    return (
      {
        audienceKey: 'r2p8-r@nea-m5-c5',
        description: coursePlanContents.description,
        creator: coursePlanContents.creator,
        learningPeriod: coursePlanContents.learningPeriod,
        courseSet: coursePlanContents.courseSet,
        surveyId: coursePlanContents.surveyId,
        testId: coursePlanContents.testId,
        fileBoxId: coursePlanContents.fileBoxId,
      }
    );
  }
}

decorate(CoursePlanContentsModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  description: observable,
  creator: observable,
  learningPeriod: observable,
  courseSet: observable,

  surveyId: observable,
  surveyTitle: observable,
  surveyDesignerName: observable,

  testId: observable,
  paperId: observable,
  examTitle: observable,
  examAuthorName: observable,

  fileBoxId: observable,

  totalCourseCount: observable,
});
