import SurveyRespondentCount from '../model/SurveyRespondentCount';
import { PatronKey } from '@nara.platform/accent';
import { LectureSurveyItemType } from '../viewModel/LectureSurvey';
import { LectureSurveySummaryItem } from '../viewModel/LectureSurveyAnswerSummary';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface SurveySummaries {
  answerSummaries: reviewAnswerNumberSummary[];
  id: string;
  lastUpdateTime: number;
  patronKey: PatronKey;
  respondentCount: SurveyRespondentCount;
  round: number;
  surveyCaseId: string;
  titles: FeedbackTitles;
}

export interface reviewAnswerNumberSummary {
  id: string;
  numberCountMap: Record<number, number>;
}

export interface SurveySatisfaction {
  AnswerSummaries: reviewAnswerNumberSummary;
  reversedValues: number[];
  totalCount: number;
  average: number;
  surveyCaseId: string;
  isDoneSurvey: boolean;
}

export interface FeedbackTitles {
  defaultLanguage: string;
  langStringMap: langStringMap;
}

// export interface SummaryItems {
//   answerItemType: LectureSurveyItemType;
// }

export interface langStringMap {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface SurveyFeedbackSummaries {
  reviewAnswerNumberSummary: reviewAnswerNumberSummary;
  reviewAnswers: reviewAnswers[];
}

export interface reviewAnswers {
  completeTime: number;
  denizenId: string;
  id: string;
  itemNumber: string;
  registeredTime: number;
  sentence: string;
  surveyCaseId: string;
  name?: PolyglotString;
  nickName?: string;
  profileImage?: string;
}
