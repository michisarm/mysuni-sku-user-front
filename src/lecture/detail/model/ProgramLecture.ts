export default interface ProgramLecture {
  usid: string;
  coursePlanId: string;
  courseLectureUsids: string[];
  lectureCardUsids: string[];
  reviewId: string;
  commentId: string;
  studentCount: number;
  passedStudentCount: number;
  starCount: number;
  time: number;
}
