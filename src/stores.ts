import { stores as learningStores } from '@sku/learning';

import { sharedStores } from './shared';
import { personalCubeStores } from './personalcube';
import { lectureCardStores } from './lecture';
import { InstructorService } from './expert';
import { CollegeService, SubsidiaryService } from './college';
import { SkProfileService } from './profile';
import { AnswerService, BoardService, CategoryService, PostService } from './board';


const stores = {
  ...learningStores,
  ...sharedStores,
  ...personalCubeStores,
  ...lectureCardStores,
  instructorService: InstructorService.instance,
  boardService: BoardService.instance,
  categoryService: CategoryService.instance,
  postService: PostService.instance,
  answerService: AnswerService.instance,
  collegeService: CollegeService.instance,
  skProfileService: SkProfileService.instance,
  subsidiaryService: SubsidiaryService.instance,
};

export default stores;
