import { ExamQuestionModel } from "assistant/paper/model/ExamQuestionModel";

export default interface ExamPaperForm {
  questions: ExamQuestionModel[];
  title: string;
}
