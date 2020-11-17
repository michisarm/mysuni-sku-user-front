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

const getCubeItem = (params: LectureParams, pathname: string) => {
  getCubeLectureStructure(params).then(lectureStructure => {
    mergeActivated(lectureStructure, pathname);
  });
};
const getCourseItem = (params: LectureParams, pathname: string) => {
  getCourseLectureStructure(params).then(lectureStructure => {
    mergeActivated(lectureStructure, pathname);
  });
};

export function requestLectureStructure(
  params: LectureParams,
  pathname: string
) {
  const { lectureType, contentId, lectureId, ...structParams } = params;
  if (params.cubeId !== undefined) {
    getCubeItem(structParams, pathname);
  } else {
    getCourseItem(structParams, pathname);
  }
}

function LectureStructureContainer() {
  const params = useParams<LectureParams>();
  const { pathname } = useLocation();

  useEffect(() => {
    requestLectureStructure(params, pathname);
  }, [params, pathname]);

    useEffect(() => {
    const options = {};
    const lmsContent = document.getElementById('lms-content');
    const observer = new IntersectionObserver(intersectionCallback, options);
    function intersectionCallback(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lmsContent?.classList.remove('lms-lnb-fixed');
        } else {
          lmsContent?.classList.add('lms-lnb-fixed');
        }
      });
    }
    const lmsHeader = document.getElementById('lms-header');
    if (lmsHeader !== null) {
      observer.observe(lmsHeader);
    }
    return () => observer.disconnect();
  }, []);

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
