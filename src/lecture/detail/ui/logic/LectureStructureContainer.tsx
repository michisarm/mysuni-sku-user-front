import React, { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  mergeActivated,
  useLectureStructure,
} from '../../service/useLectureStructure/useLectureStructure';
import { getCourseLectureStructure } from '../../service/useLectureStructure/utility/getCourseLectureStructure';
import { getCubeLectureStructure } from '../../service/useLectureStructure/utility/getCubeLectureStructure';
import { setLectureStructure } from '../../store/LectureStructureStore';
import LectureParams from '../../viewModel/LectureParams';
import LectureStructureView from '../view/LectureStructureView/LectureStructureView';

function LectureStructureContainer() {
  const params = useParams<LectureParams>();
  const { pathname } = useLocation();
  const getCubeItem = useCallback((params: LectureParams, pathname: string) => {
    getCubeLectureStructure(params).then(lectureStructure => {
      mergeActivated(lectureStructure, pathname);
      setLectureStructure(lectureStructure);
    });
  }, []);

  const getCourseItem = useCallback(
    (params: LectureParams, pathname: string) => {
      getCourseLectureStructure(params).then(lectureStructure => {
        mergeActivated(lectureStructure, pathname);
        setLectureStructure(lectureStructure);
      });
    },
    []
  );

  useEffect(() => {
    const { lectureType, contentId, lectureId, ...structParams } = params;
    if (params.cubeId !== undefined) {
      getCubeItem(structParams, pathname);
    } else {
      getCourseItem(structParams, pathname);
    }
  }, [params, pathname]);

  const [lectureStructure] = useLectureStructure();
  return (
    <>
      {lectureStructure && (
        <LectureStructureView lectureStructure={lectureStructure} />
      )}
    </>
  );
}

export default LectureStructureContainer;
