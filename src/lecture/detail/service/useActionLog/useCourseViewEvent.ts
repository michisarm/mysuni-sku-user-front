import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createViewLog } from '../../api/actionLogCollectorApi';
import { cacheableFindCoursePlan } from '../../api/courseApi';
import LectureParams from '../../viewModel/LectureParams';

export function useCourseViewEvent() {
  const { cardId, cubeId } = useParams<LectureParams>();

  useEffect(() => {
    if (cubeId !== undefined) {
      return;
    }
    if (cardId === undefined) {
      return;
    }
    const path = window.location.href;
    const email = localStorage.getItem('nara.email') || '';
    // jz - API Change
    // cacheableFindCoursePlan(cardId).then(coursePlan => {
    //   if (coursePlan !== undefined) {
    //     const { name } = coursePlan;
    //     createViewLog({
    //       // 오류 오류
    //       college: 'collegeId',
    //       context: {
    //         logType: 'VIEW',
    //         menu: 'COURSE_VIEW',
    //         path,
    //         poc: 'web',
    //         email,
    //       },
    //       courseName: name,
    //       coursePlanId: cardId,
    //       cubeId: '',
    //       cubeName: '',
    //       lectureCardId: cardId,
    //       serviceType: 'COURSE',
    //     });
    //   }
    // });
  }, [cardId, cubeId]);
}
