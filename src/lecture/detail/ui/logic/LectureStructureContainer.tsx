import React, { useEffect, useState } from 'react';
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
  setIsLoadingState,
  useIsLoadingState,
} from 'lecture/detail/store/LectureStructureStore';
import LectureParams from '../../viewModel/LectureParams';
import LectureStructureView from '../view/LectureStructureView/LectureStructureView';
import { Segment } from 'semantic-ui-react';
import { Loadingpanel } from 'shared';

const getCubeItem = (
  params: LectureParams,
  pathname: string,
  init: boolean | false
) => {
  if (init) setIsLoadingState({ isLoading: true });
  return getCubeLectureStructure(params).then(lectureStructure => {
    if (lectureStructure !== undefined) {
      mergeActivated(lectureStructure, pathname);
      const activeStructureItem = getActiveStructureItemAll();
      setCurentLectureStructureItem(activeStructureItem);
    } else {
      setCurentLectureStructureItem();
    }
    setIsLoadingState({ isLoading: false });
  });
};
const getCourseItem = (
  params: LectureParams,
  pathname: string,
  init: boolean | false
) => {
  if (init) setIsLoadingState({ isLoading: true });
  return getCourseLectureStructure(params).then(lectureStructure => {
    mergeActivated(lectureStructure, pathname);
    const activeStructureItem = getActiveStructureItemAll();
    setCurentLectureStructureItem(activeStructureItem);
    setIsLoadingState({ isLoading: false });
  });
};

export function requestLectureStructure(
  params: LectureParams,
  pathname: string,
  init?: boolean | false
) {
  const { lectureType, contentId, lectureId, ...structParams } = params;
  if (params.cubeId !== undefined) {
    return getCubeItem(structParams, pathname, init!);
  } else if (params.coursePlanId !== undefined) {
    return getCourseItem(structParams, pathname, init!);
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
    requestLectureStructure(params, pathname, init);
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

  useEffect(() => {
    return setLectureStructure;
  }, [coursePlanId, cubeId]);

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
  const [init, setInit] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadingState = useIsLoadingState();
  useEffect(() => {
    setIsLoading(loadingState?.isLoading ? true : false);
    setInit(false);
  }, [loadingState?.isLoading]);

  return (
    <>
      {isLoading ? (
        <Segment
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            height: 550,
            boxShadow: '0 0 0 0',
            border: 0,
          }}
        >
          <Loadingpanel loading={isLoading} color="#ffffff" />
        </Segment>
      ) : (
        <>
          {lectureStructure && (
            <LectureStructureView lectureStructure={lectureStructure} />
          )}
        </>
      )}
    </>
  );
}

export default LectureStructureContainer;
