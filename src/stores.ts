
import { ReviewService, CommentService } from '@nara.drama/feedback';
import { sharedStores } from 'shared';
import layoutStores from 'layout/stores';
import collegeStores, { CollegeService } from 'college/stores';
import profileStores from 'profile/stores';
import surveyStores from 'survey/stores';
import assistantStores from 'assistant/stores';
import boardStores from 'board/stores';
import expertStores from 'expert/stores';

import personalCubeStores from 'personalcube/stores';
import { courseStores } from 'course';
import { lectureCardStores } from 'lecture';
import myTrainingStores from 'myTraining/stores';


const stores = {
  shared: {
    ...sharedStores.shared,
    collegeService: new CollegeService(),
    reviewService: ReviewService.instance,
    commentService: CommentService.instance,
  },
  ...layoutStores,
  ...collegeStores,
  ...profileStores,
  ...surveyStores,
  ...assistantStores,
  ...boardStores,
  ...expertStores,
  ...personalCubeStores,
  ...courseStores,
  ...lectureCardStores,
  ...myTrainingStores,
};

export default stores;
