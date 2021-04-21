import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';
import LecturePrecourse from '../../../viewModel/LectureOverview/LecturePrecourse';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';

interface CourseViewProps {
  required: boolean;
  name: string;
  prerequisiteCardId: string;
}

interface LecturePrecourseViewProps {
  lecturePrecourse: LecturePrecourse;
}

const CourseView: React.FC<CourseViewProps> = function CourseView({
  required,
  name,
  prerequisiteCardId,
}) {
  const params: LectureParams = {
    cardId: prerequisiteCardId,
    viewType: 'view',
    pathname: '',
  };
  const to = toPath(params);
  return (
    <>
      <div className="course-box">
        <div className="bar">
          <div className="tit">
            <span className="ellipsis">
              {required && (
                <span className="course-span-box red-box">필수</span>
              )}
              {!required && (
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
        {lecturePrecourse.prerequisiteCards.map(
          ({ prerequisiteCardId, required, prerequisiteCardName }) => (
            <CourseView
              key={prerequisiteCardId}
              prerequisiteCardId={prerequisiteCardId}
              required={required}
              name={prerequisiteCardName}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LecturePrecourseView;
