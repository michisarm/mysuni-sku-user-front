import React from 'react';
import { Link } from 'react-router-dom';
import { LectureChpaterCubeList } from '../../../viewModel/LectureChpaterCubeList';

interface Props {
  courseCount: number;
  learningContents: LectureChpaterCubeList[];
}

// e-icon, v-icon, a-icon

function LectureCourseListView({ courseCount, learningContents }: Props) {
  return (
    <div className="course-info-essential">
      <div className="essential-top">
        <span>
          총 <strong>{courseCount}개</strong>의 강의가 구성되어 있습니다.
        </span>
      </div>
      {learningContents.map(course => (
        <div className="essential-wrap">
          <div className="essential-card">
            <Link to="/about" className="detail-title">
              {course.name}
            </Link>
            <div className="detail-subject-box">
              <span className="detail-subject e-icon">{course.type}</span>
              <span className="detail-subject time">{`${course.learningTime}m`}</span>
            </div>
            <p>{course.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LectureCourseListView;
