import { DramaEntity } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { PatronKey, DatePeriod, NameValueList } from 'shared';
import { CreatorModel } from 'personalcube/personalcube';
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
  surveyTitle: string = '';
  surveyDesignerName: string = '';

  examId: string = '';
  examTitle: string = '';
  examAuthorName: string = '';

  fileBoxId: string = '';

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
          name: 'examId',
          value: courseContents.examId,
        },
      ],
    };

    return asNameValues;
  }

  static isBlank(courseContents: CoursePlanContentsModel) : string {
    // if (!courseContents.learningPeriod.startDateSub || !courseContents.learningPeriod.endDateSub) return '교육기간';
    // if (!courseContents.description) return 'Course 소개';
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
        examId: coursePlanContents.examId,
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

  examId: observable,
  examTitle: observable,
  examAuthorName: observable,

  fileBoxId: observable,
});
