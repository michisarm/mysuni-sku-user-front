import React, { useEffect } from 'react';
import LectureTaskContainer from './LectureTaskContainer';
import {
  setLectureTaskDetail,
  setLectureTaskOffset,
  setLectureTaskTab,
  setLectureTaskViewType,
  setLectureTaskOrder,
} from '../../store/LectureTaskStore';
import { useParams } from 'react-router';

interface Params {
  cubeId: string;
}

function LectureCubeTaskPage() {
  const params = useParams<Params>();

  useEffect(() => {
    let offset = 0;
    const search = window.location.search.replace('?', '');
    if (search.length > 0) {
      const searches = search.split('&');
      searches.forEach((c) => {
        const [key, value] = c.split('=');
        if (key === 'page' && !isNaN(parseInt(value)) && parseInt(value) > 1) {
          offset = (parseInt(value) - 1) * 10;
        }
      });
    }

    setLectureTaskOrder('new');
    setLectureTaskViewType('list');
    setLectureTaskDetail();
    setLectureTaskTab('Posts');
    setLectureTaskOffset(offset);
  }, [params.cubeId]);

  return <LectureTaskContainer />;
}

export default LectureCubeTaskPage;
