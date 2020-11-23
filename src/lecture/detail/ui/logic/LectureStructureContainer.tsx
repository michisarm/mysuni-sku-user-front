import React, { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  getActiveStructureItemAll,
  mergeActivated,
  useLectureStructure,
} from '../../service/useLectureStructure/useLectureStructure';
import { getCourseLectureStructure } from '../../service/useLectureStructure/utility/getCourseLectureStructure';
import { getCubeLectureStructure } from '../../service/useLectureStructure/utility/getCubeLectureStructure';
import {
  setCurentLectureStructureItem,
  setLectureStructure,
} from '../../store/LectureStructureStore';
import LectureParams from '../../viewModel/LectureParams';
import LectureStructureView from '../view/LectureStructureView/LectureStructureView';

const getCubeItem = (params: LectureParams, pathname: string) => {
  getCubeLectureStructure(params).then(lectureStructure => {
    if (lectureStructure !== undefined) {
      mergeActivated(lectureStructure, pathname);
      const activeStructureItem = getActiveStructureItemAll();
      setCurentLectureStructureItem(activeStructureItem);
    } else {
      setCurentLectureStructureItem();
    }
  });
};
const getCourseItem = (params: LectureParams, pathname: string) => {
  getCourseLectureStructure(params).then(lectureStructure => {
    mergeActivated(lectureStructure, pathname);
    const activeStructureItem = getActiveStructureItemAll();
    setCurentLectureStructureItem(activeStructureItem);
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
  const {
    cineroomId,
    collegeId,
    cubeId,
    lectureCardId,
    coursePlanId,
    serviceType,
    serviceId,
    lectureType,
    contentId,
    lectureId,
  } = useParams<LectureParams>();
  const { pathname } = useLocation();

  useEffect(() => {
    const params: LectureParams = {
      cineroomId,
      collegeId,
      cubeId,
      lectureCardId,
      coursePlanId,
      serviceType,
      serviceId,
      lectureType,
      contentId,
      lectureId,
    };
    requestLectureStructure(params, pathname);
    return () => {
      setLectureStructure();
    };
  }, [
    cineroomId,
    collegeId,
    cubeId,
    lectureCardId,
    coursePlanId,
    serviceType,
    serviceId,
    lectureType,
    contentId,
    lectureId,
    pathname,
  ]);

  //   useEffect(() => {
  //   const options = {};
  //   const lmsContent = document.getElementById('lms-content');
  //   const observer = new IntersectionObserver(intersectionCallback, options);
  //   function intersectionCallback(entries: IntersectionObserverEntry[]) {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         lmsContent?.classList.remove('lms-lnb-fixed');
  //       } else {
  //         lmsContent?.classList.add('lms-lnb-fixed');
  //       }
  //     });
  //   }
  //   const lmsHeader = document.getElementById('lms-header');
  //   if (lmsHeader !== null) {
  //     observer.observe(lmsHeader);
  //   }
  //   return () => observer.disconnect();
  // }, []);

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
