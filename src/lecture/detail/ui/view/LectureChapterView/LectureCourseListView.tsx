import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LectureChpaterCubeList } from '../../../viewModel/LectureChpaterCubeList';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import { ChapterParams } from '../../../model/ChapterParams';

interface Props {
  courseCount: number;
  learningContents: LectureChpaterCubeList[];
}

// e-icon, v-icon, a-icon
//    return `/lecture/card/${cardId}/cube/${cubeId}/view/${cubeType}`;

function LectureCourseListView({ courseCount, learningContents }: Props) {
  const { cardId } = useParams<ChapterParams>();

  return (
    <div className="course-info-essential">
      <div className="essential-top">
        <span>
          총 <strong>{courseCount}개</strong>의 강의가 구성되어 있습니다.
        </span>
      </div>
      {learningContents.map(cube => {
        const params: LectureParams = {
          cardId,
          cubeId: cube.cubeId,
          cubeType: cube.type,
          viewType: 'view',
          pathname: '',
        };

        return (
          <div className="essential-wrap">
            <div className="essential-card">
              <Link to={toPath(params)} className="detail-title">
                {cube.name}
              </Link>
              <div className="detail-subject-box">
                <span className="detail-subject e-icon">{cube.type}</span>
                <span className="detail-subject time">{`${cube.learningTime}m`}</span>
              </div>
              <p>{cube.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LectureCourseListView;
