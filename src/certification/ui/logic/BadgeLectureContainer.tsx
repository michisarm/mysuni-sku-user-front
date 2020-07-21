
import React from 'react';


const BadgeLectureContainer = () => {
  //
  return (
    <div className="course-cont">

      {/*<Lecture2.Group*/}
        {/*type={Lecture2.GroupType.Course}*/}
        {/*totalCourseCount={viewObject.totalCourseCount}*/}
      {/*>*/}
        {/*{lectureViews.map((lecture: LectureViewModel, lectureViewsIndex: number) => (*/}
          {/*<Lecture2.CourseSection*/}
            {/*key={`course-${lectureViewsIndex}`}*/}
            {/*lecture={(*/}
              {/*<Lecture2.Course*/}
                {/*className="first"*/}
                {/*lectureView={lecture}*/}
                {/*lectureViewSize={(getSubLectureViews(lecture.id).length + 1)}*/}
                {/*lectureViewName={(lectureViewsIndex+1)+'. '+lecture.name}*/}
                {/*thumbnailImage={lecture.baseUrl || undefined}*/}
                {/*toggle={lecture.serviceType === LectureServiceType.Program || lecture.serviceType === LectureServiceType.Course}*/}
                {/*onViewDetail={() => this.onViewDetail(lecture)}*/}
                {/*collegeId={params.collegeId}*/}
                {/*lectureCardId={lectureCardId}*/}
                {/*learningState={viewObject.state}*/}
                {/*member={member}*/}
                {/*onRefreshLearningState={onRefreshLearningState}*/}
                {/*onDoLearn={this.onDoLearn}*/}
              {/*/>*/}
            {/*)}*/}
          {/*>*/}
            {/*{getSubLectureViews(lecture.id).map((subLecture, index) =>*/}
              {/*<Lecture2.Course*/}
                {/*key={`sub-lecture-${index}`}*/}
                {/*className="included"*/}
                {/*lectureView={subLecture}*/}
                {/*lectureViewName={(lectureViewsIndex+1)+'. '+(index+1)+'. '+subLecture.name}*/}
                {/*thumbnailImage={subLecture.baseUrl || undefined}*/}
                {/*onViewDetail={() => this.onViewDetail(subLecture)}*/}
                {/*collegeId={params.collegeId}*/}
                {/*lectureCardId={lectureCardId}*/}
                {/*member={member}*/}
                {/*onRefreshLearningState={onRefreshLearningState}*/}
                {/*onDoLearn={this.onDoLearn}*/}
              {/*/>*/}
            {/*)}*/}
          {/*</Lecture2.CourseSection>*/}
        {/*))}*/}
      {/*</Lecture2.Group>*/}

    </div>
  );
};

export default BadgeLectureContainer;
