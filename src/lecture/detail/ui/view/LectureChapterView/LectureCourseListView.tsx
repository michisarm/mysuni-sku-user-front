import React from 'react';
import { Link } from 'react-router-dom';
import { LearningContent } from '../../../../model/LearningContent';

interface Props {
  courseCount?: number;
  learningContents?: LearningContent[];
}

function LectureCourseListView({ courseCount, learningContents }: Props) {
  return (
    <div className="course-info-essential">
      <div className="essential-top">
        <span>
          총 <strong>3개</strong>의 강의가 구성되어 있습니다.
        </span>
      </div>
      {/* {learningContents.map(course => (
        <div className="essential-wrap">
          <div className="essential-card">
            <Link to="/about" className="detail-title">
              [AI UX 기초 Essential] AI UX의 대두와 그 필요성
            </Link>
            <div className="detail-subject-box">
              <span className="detail-subject e-icon">e-Learning</span>
              <span className="detail-subject time">36m</span>
            </div>
            <p>
              사용자에게 명령이 아닌 도우미로써의 AI에 대한 이해를 할 수
              있습니다. AI는 가능성이며, UX는 안내자의 역할임을 파악하고, 데이터
              기반의 AI를 사용자가 원하는 경험으로 도출하는 것이 UX의 중요성을
              배웁니다.
            </p>
          </div>
        </div>
      ))} */}
      <div className="essential-wrap">
        <div className="essential-card">
          <Link to="/about" className="detail-title">
            [AI UX 기초 Essential] AI UX의 대두와 그 필요성
          </Link>
          <div className="detail-subject-box">
            <span className="detail-subject e-icon">e-Learning</span>
            <span className="detail-subject time">36m</span>
          </div>
          <p>
            사용자에게 명령이 아닌 도우미로써의 AI에 대한 이해를 할 수 있습니다.
            AI는 가능성이며, UX는 안내자의 역할임을 파악하고, 데이터 기반의 AI를
            사용자가 원하는 경험으로 도출하는 것이 UX의 중요성을 배웁니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LectureCourseListView;
