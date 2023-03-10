import { IdName } from "@nara.platform/accent";

export default interface LectureCard {
  usid: string;
  reviewId: string;
  commentId: string;
  studentCount: number;
  passedStudentCount: number;
  starCount: number;
  time: number;
  learningCard: IdName;
}
