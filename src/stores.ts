
import { ReviewService } from '@nara.drama/feedback';
import { sharedStores } from 'shared';
import { collegeStores, CollegeService } from 'college';
import { courseStores } from 'course';
import { CubeIntroService, MediaService, personalCubeStores } from 'personalcube';
import { lectureCardStores } from 'lecture';
import { InstructorService } from 'expert';
import { SkProfileService } from 'profile';
import { AnswerService, BoardService, CategoryService, PostService } from './board';


const stores = {
  shared: {
    ...sharedStores.shared,
    collegeService: new CollegeService(),
    reviewService: ReviewService.instance,
  },
  ...collegeStores,
  ...personalCubeStores,
  ...lectureCardStores,
  ...courseStores,
  mediaService: MediaService.instance,
  instructorService: InstructorService.instance,
  cubeIntroService: CubeIntroService.instance,
  boardService: BoardService.instance,
  categoryService: CategoryService.instance,
  postService: PostService.instance,
  answerService: AnswerService.instance,
  skProfileService: SkProfileService.instance,
};

export default stores;
