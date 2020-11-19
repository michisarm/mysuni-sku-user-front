import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { SkProfileService } from '../../../../../profile/stores';
import { Cube } from '../../../../shared/ui/view/LectureElementsView2';
import {
  LectureStructure,
  LectureStructureCourseItem,
  LectureStructureCubeItem,
} from '../../../viewModel/LectureStructure';

interface LectureCubeNavigatorViewProps {
  lectureStructure: LectureStructure;
}

function findActiveCourseCubes(
  lectureStructure: LectureStructure
): LectureStructureCubeItem[] | void {
  if (lectureStructure.course?.activated === true) {
    return lectureStructure.cubes;
  }
  return lectureStructure.courses.find(c => c.activated === true)?.cubes;
}

const LectureCubeNavigatorView: React.FC<LectureCubeNavigatorViewProps> = function LectureCubeNavigatorView({
  lectureStructure,
}) {
  const [visible, setVisible] = useState<boolean>(true);
  const close = useCallback(() => {
    setVisible(false);
  }, []);
  const cubes = findActiveCourseCubes(lectureStructure);
  if (cubes === undefined) {
    return null;
  }
  let progressingCube: LectureStructureCubeItem | undefined;
  for (let i = 0; i < cubes.length; i++) {
    const cube = cubes[i];
    if (cube.state === 'Progress') {
      progressingCube = cube;
      break;
    }
  }
  if (progressingCube === undefined) {
    return null;
  }
  const {
    skProfile: {
      member: { name },
    },
  } = SkProfileService.instance;
  return (
    <>
      {visible && (
        <div className="course-info-banner">
          안녕하세요.<span>{name}</span>님, 학습 중인 강의가 있습니다.
          <h3>{progressingCube.name}</h3>
          <span
            className="ui button fix bg following"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <Link to={progressingCube.path}>학습이어하기</Link>
          </span>
          <a onClick={close}>
            <i aria-hidden="true" className="icon banner-close" />
          </a>
        </div>
      )}
    </>
  );
};

export default LectureCubeNavigatorView;
