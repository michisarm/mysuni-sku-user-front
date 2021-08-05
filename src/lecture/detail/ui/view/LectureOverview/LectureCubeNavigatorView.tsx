import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { SkProfileService } from '../../../../../profile/stores';
import { Cube } from '../../../../shared/ui/view/LectureElementsView2';
import {
  LectureStructure,
  LectureStructureCubeItem,
} from '../../../viewModel/LectureStructure';
import { Action, ActionType, Area } from 'tracker/model';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface LectureCubeNavigatorViewProps {
  lectureStructure: LectureStructure;
}

const LectureCubeNavigatorView: React.FC<LectureCubeNavigatorViewProps> = function LectureCubeNavigatorView({
  lectureStructure,
}) {
  const [visible, setVisible] = useState<boolean>(true);
  const close = useCallback(() => {
    setVisible(false);
  }, []);
  const cubes = lectureStructure.cubes;
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

  return (
    <>
      {visible && (
        <div className="course-info-banner" data-area={Area.CARD_MENU}>
          <div
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `안녕하세요.<span>{name}</span>님, 학습 중인 강의가 있습니다.`,
                'Course-Navigator-학습중',
                {
                  name: parsePolyglotString(
                    SkProfileService.instance.skProfile.name
                  ),
                }
              ),
            }}
          />

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
            <Link
              to={progressingCube.path}
              data-area={Area.CARD_MENU}
              data-action={Action.CLICK}
              data-action-type={ActionType.STUDY}
              data-action-name="학습이어하기 클릭"
            >
              <PolyglotText
                defaultString="학습이어하기"
                id="Course-Navigator-이어하기"
              />
            </Link>
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
