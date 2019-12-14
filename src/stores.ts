import { stores as learningStores } from '@sku/learning';

import { SharedService } from './shared';
import { InstructorService } from './expert';
import { CollegeService, SubsidiaryService } from './college';
import { SkProfileService } from './profile';
import { PersonalCubeService } from './create';
import { AnswerService, BoardService, CategoryService, PostService } from './board';


const stores = {
  ...learningStores,
  sharedService: SharedService.instance,
  instructorService: InstructorService.instance,
  personalCubeService: PersonalCubeService.instance,
  boardService: BoardService.instance,
  categoryService: CategoryService.instance,
  postService: PostService.instance,
  answerService: AnswerService.instance,
  collegeService: CollegeService.instance,
  skProfileService: SkProfileService.instance,
  subsidiaryService: SubsidiaryService.instance,
};

export default stores;
