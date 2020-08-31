
import { CategoryModel, CreatorModel, IconBoxModel, CourseOpenModel } from 'shared/model';
import { CourseOperatorModel } from './CourseOperatorModel';
import { ReportFileBoxModel } from './ReportFileBoxModel';
import { StampModel } from './StampModel';


export class CoursePlanCdoModel {
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  category: CategoryModel = new CategoryModel();
  subCategories: CategoryModel[] = [];
  name: string = '';
  contentsId: string = '';
  courseOperator: CourseOperatorModel = new CourseOperatorModel();
  iconBox: IconBoxModel = new IconBoxModel();
  courseOpen: CourseOpenModel = new CourseOpenModel();
  reportFileBox: ReportFileBoxModel | null = new ReportFileBoxModel();
  stamp: StampModel = new StampModel();
  creator: CreatorModel = new CreatorModel();
}
