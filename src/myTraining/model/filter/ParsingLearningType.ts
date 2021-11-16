import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';

export enum ParsingLearningType {
  Required = 'Required',
  Learning = 'Learning',
  Bookmark = 'Bookmark',
  LearningCompleted = 'LearningCompleted',
  // stampList용,
  None = '',
}

export function getParsingLearningType(
  type: MyLearningContentType | MyPageContentType
) {
  //
  switch (type) {
    case MyLearningContentType.InProgress:
      return ParsingLearningType.Learning;
    case MyLearningContentType.InMyList:
      return ParsingLearningType.Bookmark;
    case MyLearningContentType.Required:
      return ParsingLearningType.Required;
    case MyLearningContentType.Completed:
      return ParsingLearningType.LearningCompleted;
    case MyPageContentType.EarnedStampList:
    default:
      return ParsingLearningType.None;
  }
}
