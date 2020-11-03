export default interface CourseLecture {
  usid: string;
  coursePlanId: string;
  lectureCardUsids: string[];
  reviewId: string;
  commentId: string;
  studentCount: number;
  passedStudentCount: number;
  starCount: number;
  time: number;
  courseLectureUsids?: any;
}
