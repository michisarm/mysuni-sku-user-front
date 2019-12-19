import { stores as learningStores } from '@sku/learning';

import { sharedStores } from './shared';
import { collegeStores } from './college';
import { personalCubeStores } from './personalcube';
import { lectureCardStores } from './lecture';
import { InstructorService } from './expert';
import { SkProfileService } from './profile';
import { AnswerService, BoardService, CategoryService, PostService } from './board';


const stores = {
  ...learningStores,
  ...sharedStores,
  ...collegeStores,
  ...personalCubeStores,
  ...lectureCardStores,
  instructorService: InstructorService.instance,
  boardService: BoardService.instance,
  categoryService: CategoryService.instance,
  postService: PostService.instance,
  answerService: AnswerService.instance,
  skProfileService: SkProfileService.instance,
};

export default stores;
