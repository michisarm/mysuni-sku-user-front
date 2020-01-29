import SurveyCaseService  from './event/present/logic/SurveyCaseService';
import SurveyFormService  from './form/present/logic/SurveyFormService';
import AnswerSheetService  from './answer/present/logic/AnswerSheetService';
import AnswerSheetModalContainer  from './ui/logic/AnswerSheetModalContainer';

export const surveyStores = {
  survey: {
    surveyCaseService: SurveyCaseService.instance,
    surveyFormService: SurveyFormService.instance,
    answerSheetService: AnswerSheetService.instance,
  },
};


export {
  SurveyCaseService,
  SurveyFormService,
  AnswerSheetService,
  AnswerSheetModalContainer,
};
