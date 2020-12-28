import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createViewLog } from '../../api/actionLogCollectorApi';
import { findCoursePlan } from '../../api/courseApi';
import LectureParams from '../../viewModel/LectureParams';

export function useCourseViewEvent() {
  const {
    collegeId,
    coursePlanId,
    serviceType,
    serviceId,
    contentId,
    lectureId,
    lectureType,
  } = useParams<LectureParams>();

  useEffect(() => {
    if (lectureType === 'cube') {
      return;
    }
    if (
      coursePlanId === undefined ||
      serviceType === undefined ||
      serviceId === undefined
    ) {
      return;
    }
    const path = window.location.href;
    const email = localStorage.getItem('nara.email') || '';
    const _serviceType =
      contentId === undefined && serviceType === 'Program'
        ? 'PROGRAM'
        : 'COURSE';
    const _coursePlanId = contentId || coursePlanId;
    const lectureCardId = lectureId || serviceId;

    findCoursePlan(_coursePlanId).then(coursePlan => {
      if (coursePlan !== undefined) {
        const { name } = coursePlan;
        createViewLog({
          college: collegeId,
          context: {
            logType: 'VIEW',
            menu: 'COURSE_VIEW',
            path,
            poc: 'web',
            email,
          },
          courseName: name,
          coursePlanId: _coursePlanId,
          cubeId: '',
          cubeName: '',
          lectureCardId,
          serviceType: _serviceType,
        });
      }
    });
  }, [
    collegeId,
    coursePlanId,
    serviceType,
    serviceId,
    contentId,
    lectureId,
    lectureType,
  ]);
}
