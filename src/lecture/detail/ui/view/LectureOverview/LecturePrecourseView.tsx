import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';
import LecturePrecourse from '../../../viewModel/LectureOverview/LecturePrecourse';

interface CourseViewProps {
  isRequired: boolean;
  name: string;
  coursePlanId: string;
  serviceType: string;
  serviceId: string;
  path: string;
}

interface LecturePrecourseViewProps {
  lecturePrecourse: LecturePrecourse;
}

const CourseView: React.FC<CourseViewProps> = function CourseView({
  isRequired,
  name,
  coursePlanId,
  serviceType,
  serviceId,
  path,
}) {
  const to = `${path}/course-plan/${coursePlanId}/${serviceType}/${serviceId}`;
  return (
    <>
      <div className="course-box">
        <div className="bar">
          <div className="tit">
            <span className="ellipsis">
              {isRequired && (
                <span className="course-span-box red-box">필수</span>
              )}
              {!isRequired && (
                <span className="course-span-box gray-box">선택</span>
              )}

              <span className="under">{name}</span>
            </span>
          </div>
          <div className="right-area">
            <Link to={to} className="right btn-blue">
              <span>바로가기</span>
              <Icon className="arrow-g-16" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const LecturePrecourseView: React.FC<LecturePrecourseViewProps> = function LecturePrecourseView({
  lecturePrecourse,
}) {
  return (
    <div className="ov-paragraph course-area">
      <div className="section-head">
        <div className="title-style">
          <Label className="onlytext bold size24">
            <Icon className="before" />
            <span>선수과정</span>
          </Label>
        </div>
      </div>
      <div className="course-cont pre-course">
        {lecturePrecourse.courses.map((course, key) => (
          <CourseView key={key} path={lecturePrecourse.path} {...course} />
        ))}
      </div>
    </div>
  );
};

export default LecturePrecourseView;
