//
// import React from 'react';
// import LectureLearningModalView from "../../../lecture/category/ui/view/LectureOverviewViewV2";
// import {AnswerSheetModal, CubeReportModal} from "../../../assistant";
// import {AnswerSheetModal as SurveyAnswerSheetModal} from "../../../survey";
// import {LectureExam2} from "../../../lecture/shared/LectureExam";
// import {OverviewField} from "../../../personalcube/shared/OverviewField";
// import {Lecture2} from "../../../lecture/shared/Lecture/ui/logic/LectureContainer2";
// import {LectureServiceType, LectureViewModel} from "../../../lecture/model";
//
//
// const BadgeLectureContainer = () => {
//   //
//   return (
//     <div className="course-cont">
//       <>
//         <Lecture2.Group
//           type={Lecture2.GroupType.Course}
//           totalCourseCount={viewObject.totalCourseCount}
//         >
//           {lectureViews.map((lecture: LectureViewModel, lectureViewsIndex: number) => (
//             <Lecture2.CourseSection
//               key={`course-${lectureViewsIndex}`}
//               lecture={(
//                 <Lecture2.Course
//                   className="first"
//                   lectureView={lecture}
//                   lectureViewSize={(getSubLectureViews(lecture.id).length + 1)}
//                   lectureViewName={(lectureViewsIndex+1)+'. '+lecture.name}
//                   thumbnailImage={lecture.baseUrl || undefined}
//                   toggle={lecture.serviceType === LectureServiceType.Program || lecture.serviceType === LectureServiceType.Course}
//                   onViewDetail={() => this.onViewDetail(lecture)}
//                   collegeId={params.collegeId}
//                   lectureCardId={lectureCardId}
//                   learningState={viewObject.state}
//                   member={member}
//                   onRefreshLearningState={onRefreshLearningState}
//                   onDoLearn={this.onDoLearn}
//                 />
//               )}
//             >
//               {getSubLectureViews(lecture.id).map((subLecture, index) =>
//                 <Lecture2.Course
//                   key={`sub-lecture-${index}`}
//                   className="included"
//                   lectureView={subLecture}
//                   lectureViewName={(lectureViewsIndex+1)+'. '+(index+1)+'. '+subLecture.name}
//                   thumbnailImage={subLecture.baseUrl || undefined}
//                   onViewDetail={() => this.onViewDetail(subLecture)}
//                   collegeId={params.collegeId}
//                   lectureCardId={lectureCardId}
//                   member={member}
//                   onRefreshLearningState={onRefreshLearningState}
//                   onDoLearn={this.onDoLearn}
//                 />
//               )}
//             </Lecture2.CourseSection>
//           ))}
//         </Lecture2.Group>
//         {
//           openLearnModal && (
//             <LectureLearningModalView
//               ref={lectureLearningModal => this.lectureLearningModal = lectureLearningModal }
//               videoUrl={this.learningVideoUrl}
//               onClose={this.onLearningModalClose}
//             />
//           )
//         }
//       </>
//       {
//         viewObject && viewObject.examId && (
//           <AnswerSheetModal
//             examId={viewObject.examId}
//             ref={examModal => this.examModal = examModal}
//             onSaveCallback={onSaveCallback}
//           />
//         )
//       }
//
//       <CubeReportModal
//         downloadFileBoxId ={viewObject.reportFileBoxId}
//         ref={reportModal => this.reportModal = reportModal}
//         downloadReport = {this.onClickDownloadReport}
//         rollBookId={viewObject.rollBookId}
//       />
//
//       {
//         viewObject && viewObject.surveyId && (
//           <SurveyAnswerSheetModal
//             surveyId={viewObject.surveyId}
//             surveyCaseId={viewObject.surveyCaseId}
//             ref={surveyModal => this.surveyModal = surveyModal}
//             // onSaveCallback={this.testCallback}
//           />
//         )
//       }
//
//       {
//         viewObject && (
//           <LectureExam2
//             onReport={viewObject.reportFileBoxId ? this.onReport : undefined}
//             onReportNotReady={viewObject.reportFileBoxId ? this.onReportNotReady : undefined}
//             onTest={viewObject.examId ? this.onTest : undefined}
//             onTestNotReady={viewObject.examId ? this.onTestNotReady : undefined}
//             onSurvey={viewObject.surveyId ? this.onSurvey : undefined}
//             OnSurveyNotReady={viewObject.examId ? this.OnSurveyNotReady : undefined}
//             viewObject={viewObject}
//             passedState={viewObject.passedState}
//             type={viewObject.examType}
//             name={viewObject.examName}
//             sort="box"
//           />
//         )
//       }
//     </div>
//   );
// };
//
// export default BadgeLectureContainer;
