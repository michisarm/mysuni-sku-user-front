import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LectureChpaterCubeList } from '../../../viewModel/LectureChpaterCubeList';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import { ChapterParams } from '../../../model/ChapterParams';
import CubeIconType from '../../../../shared/Lecture/model/CubeIconType';
import { Icon, Label } from 'semantic-ui-react';

interface Props {
  courseCount: number;
  learningContents: LectureChpaterCubeList[];
}

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
          <div className="essential-wrap" key={cube.cubeId}>
            <div className="essential-card">
              <Link to={toPath(params)} className="detail-title">
                {cube.name}
              </Link>
              <div className="detail-subject-box">
                <Label className="onlytext">
                  <Icon className={`icon ${CubeIconType[cube.type]}`} />
                  <span>{cube.type}</span>
                </Label>
                <Label className="onlytext">
                  <Icon className="icon time2" />
                  <span>{`${cube.learningTime}m`}</span>
                </Label>
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
