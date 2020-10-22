import { ExamQuestionModel } from "assistant/paper/model/ExamQuestionModel";

export default interface ExamPaperForm {
  title: string;
  questions: ExamQuestionModel[];
}
