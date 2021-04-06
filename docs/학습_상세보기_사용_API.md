ActionLogCollect

URL Prefix: /api/action-log-collector

- (createStudyLog) POST: /events/study
- (createViewLog) POST: /events/view

Assistant

URL Prefix: /api/assistant/v1

- (findAnswerSheet) GET: /answersheets
- (registerAnswerSheet) POST: /answersheets
- (modifyAnswerSheet) PUT: /answersheets

Badge

URL Prefix: /api/badge

- (findByLectureUsid) GET: /badges/lecture-badges

Course

URL Prefix: /api/course

- (findCoursePlan) GET: /coursePlans
- (findCoursePlanContents) GET: /coursePlanContents

Exam

URL Prefix: /lp/adm/exam

- (findExamination) GET: /examinations/{serviceId}/findExamination
- (findExamPaperForm) GET: /exampaper/{paperId}/findExamPaperForm

Feedback

URL Prefix: /api/feedback

- (countByFeedbackId) GET: /comments/count
- (findReviewSummary) GET: /reviews/summary
- (findTaskCommentCount) POST: /comments/count
- (getCommentFeedbackId) GET: /feedback/{commentFeedbackId}/comment

Lecture

URL Prefix: /api/lecture

- (findCoursePlanContents) GET: /coursePlan
- (findLectureCard) GET: /lectureCards
- (studentInfoView) POST: /students/flow/studentInfoView
- (markComplete) PUT: /students/flow/markComplete
- (findStudent) GET: /students
- (findIsJsonStudentByCube) GET: /students/flow/isJsonByCube
- (registerStudent) POST: /students/flow
- (joinCommunity) POST: /students/flow/joinCommunity
- (deleteStudentByRollBookId) DELETE: /students/flow/byRollBookId
- (modifyStudent) PUT: /students/flow/courseworkProcess
- (modifyStudentForExam) PUT: /students/flow/examProcess
- (progressByCardId) POST: /students/flow/confirm/progressByCardId
- (setCubeStudentExamId) GET: /students/flow/setCubeStudentExamId
- (setCourseStudentExamId) GET: /students/flow/setCourseStudentExamId
- (findMenuArrange) POST: /lectures/flow/arranges/menus

Personal Cube

URL Prefix: /api/personalCube

- (findPersonalCube) GET: /personalcubes
- (findCubeIntro) GET: /cubeintros
- (findAllTranscript) GET: /transcripts
- (findMedia) GET: /medias
- (findOfficeWeb) GET: /officewebs
- (findTaskbyBoardId) GET: /posts/byBoardId
- (findTaskbyBoardIdAndPatronKey) GET: /posts/byBoardIdAndPatronKey
- (findTaskChild) POST: /replies/byPostIdIn
- (getTaskDetail) GET: /posts/flow/detail
- (getTaskDetailBody) GET: /posts
- (createTaskPost) POST: /posts/flow

WatchLogCollector

URL Prefix: /api/watch-log-collector

- (registerWatchLog) POST: /watchLog
- (findWatchLogList) GET: /watchLog
- (findSumViewSeconds) GET: /watchLog/sumViewSeconds
- (multiVideoOverlap) GET: /videoOverlap

MyTraining

URL Prefix: /api/mytraining

- (addInMyLecture) POST: /mytraining/inmylecture
- (removeInMyLecture) DELETE: /mytraining/inmylecture
- (findInMyLecture) GET: /mytraining/inmylecture/myLecture

Profile

URL Prefix: /api/profile

- (findSkProfileByAudienceId) GET: /profiles/byAudienceId

Survey

URL Prefix: /api/survey

- (findSurveyForm) GET: /surveyForms
- (findAnswerSheetBySurveyCaseId) GET: /answerSheets/bySurveyCaseId
- (openAnswerSheet) POST: /response/open/{surveyCaseId}/rounds/{round}
- (saveAnswerSheet) PUT: /response/save/{surveyCaseId}/rounds/{round}
- (submitAnswerSheet) PUT: /response/complete/{surveyCaseId}/rounds/{round}
