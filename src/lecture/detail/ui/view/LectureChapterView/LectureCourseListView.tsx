import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LectureChpaterCubeList } from '../../../viewModel/LectureChpaterCubeList';
import LectureParams, { toPath } from '../../../viewModel/LectureParams';
import { ChapterParams } from '../../../model/ChapterParams';
import CubeIconType from '../../../../shared/Lecture/model/CubeIconType';
import { Icon, Label } from 'semantic-ui-react';
import CubeTypeNameType from '../../../../../myTraining/model/CubeTypeNameType';
import CubeType from '../../../../model/CubeType';

interface Props {
  courseCount: number;
  learningContents: LectureChpaterCubeList[];
}

function LectureCourseListView({ courseCount, learningContents }: Props) {
  const { cardId } = useParams<ChapterParams>();

  const getCubeTypeName = (cubeTypeName: CubeType) => {
    if (cubeTypeName) {
      const parseCubeTypeName = cubeTypeName;

      return CubeTypeNameType[parseCubeTypeName];
    }
    return '';
  };

  return (
    <div className="course-info-essential">
      <div className="essential-top">
        <span>
          총 <strong>{courseCount}개</strong>의 강의가 구성되어 있습니다.
        </span>
      </div>
      {learningContents.map(cube => {
        const description = cube.description || '';
        const isDiscussion = cube.type === 'None';

        const viewType = isDiscussion ? 'discussion' : 'view';
        const cubeType = isDiscussion ? 'Discussion' : cube.type;
        const cubeIcon = isDiscussion ? 'None' : CubeIconType[cube.type];

        const params: LectureParams = {
          cardId,
          cubeId: cube.cubeId,
          contentId: cube.cubeId,
          cubeType: cube.type,
          viewType,
          pathname: '',
        };
        console.log(cube.name, params);

        return (
          <div className="essential-wrap" key={cube.cubeId}>
            <div className="essential-card">
              <Link to={toPath(params)} className="detail-title">
                {cube.name}
              </Link>
              <div className="detail-subject-box">
                <Label className="onlytext">
                  <Icon className={`icon ${cubeIcon}`} />
                  <span>{getCubeTypeName(cubeType)}</span>
                </Label>
                {cube.learningTime > 0 && (
                  <Label className="onlytext">
                    <Icon className="icon time2" />
                    <span>{`${cube.learningTime}m`}</span>
                  </Label>
                )}
              </div>
              <p
                className="text-area"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LectureCourseListView;
