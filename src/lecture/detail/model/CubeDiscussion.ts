import DiscussionCubeCompletionCondition from './DiscussionCubeCompletionCondition';

export interface CubeDiscussion {
  automaticCompletion: boolean;
  completionCondition: DiscussionCubeCompletionCondition;
  relatedUrlList: RelatedUrlList[];
}

type RelatedUrlList = {
  title: string;
  url: string;
}