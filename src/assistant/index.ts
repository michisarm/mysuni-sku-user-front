import ExamPaperService  from './paper/present/logic/ExamPaperService';
import ExaminationService  from './exam/present/logic/ExaminationService';
import AnswerSheetService  from './exam/present/logic/AnswerSheetService';

export const assistantStores = {
  assistant: {
    examPaperService: ExamPaperService.instance,
    examinationService: ExaminationService.instance,
    answerSheetService: AnswerSheetService.instance,
  },
};


export {
  ExamPaperService,
  ExaminationService,
  AnswerSheetService,
};
