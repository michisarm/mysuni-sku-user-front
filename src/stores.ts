import { ReviewService, CommentService } from '@nara.drama/feedback';
import { sharedStores } from 'shared';
import layoutStores from 'layout/stores';
import { collegeStores, CollegeService } from 'college';
import { courseStores } from 'course';
import { personalCubeStores } from 'personalcube';
import { lectureCardStores } from 'lecture';
import { expertStores } from 'expert';
import { profileStores } from 'profile';
import { boardStores } from 'board';
import { myTrainingStores } from 'myTraining';
import { assistantStores } from 'assistant';


const stores = {
  shared: {
    ...sharedStores.shared,
    collegeService: new CollegeService(),
    reviewService: ReviewService.instance,
    commentService: CommentService.instance,
  },
  ...layoutStores,
  ...collegeStores,
  ...personalCubeStores,
  ...lectureCardStores,
  ...courseStores,
  ...myTrainingStores,
  ...boardStores,
  ...expertStores,
  ...profileStores,
  ...assistantStores,
};

export default stores;
