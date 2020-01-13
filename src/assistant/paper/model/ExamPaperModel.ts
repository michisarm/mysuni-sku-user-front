import { computed, decorate, observable } from 'mobx';
import { ExamQuestionModel } from './ExamQuestionModel';
import { QuestionType } from './QuestionType';

export class ExamPaperModel {
  //
  id: string = '';
  title: string = '';
  year: string = '';
  authorId: string = '';
  authorName: string = '';
  finalCopy: boolean = false;
  questionSequence: number = 0;
  registDate: string = '';
  questions: ExamQuestionModel[] = [];

  constructor(paper?: ExamPaperModel) {
    if (paper) {
      const questions = paper.questions && paper.questions.length
        && paper.questions.map(question => new ExamQuestionModel(question)) || this.questions;
      Object.assign(this, { ...paper, questions });
    }
  }

  @computed
  get score(): { objective: number, subjective: number, total: number  } {
    //
    let objective = 0;
    let subjective = 0;
    let total = 0;

    if (this.questions && this.questions.length) {
      this.questions.map(question => {
        if (question.questionType === QuestionType.MultiChoice || question.questionType === QuestionType.SingleChoice) {
          objective += question.allocatedPoint;
        }
        else {
          subjective += question.allocatedPoint;
        }
        total += question.allocatedPoint;
      });
    }

    return {
      objective,
      subjective,
      total,
    };
  }
}

decorate(ExamPaperModel, {
  id: observable,
  title: observable,
  year: observable,
  authorId: observable,
  authorName: observable,
  finalCopy: observable,
  questions: observable,
  questionSequence: observable,
  registDate: observable,
});
