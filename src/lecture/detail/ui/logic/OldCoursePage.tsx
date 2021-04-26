import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { findMigCardIdMappingCache } from '../../api/cardApi';
import LectureParams, { toPath } from '../../viewModel/LectureParams';

interface Params {
  serviceId: string;
}

export default function OldCoursePage() {
  const { serviceId } = useParams<Params>();
  const history = useHistory();
  useEffect(() => {
    findMigCardIdMappingCache(serviceId).then(r => {
      if (r?.cardId === undefined) {
        history.replace('/');
      } else {
        const lectureParams: LectureParams = {
          cardId: r?.cardId,
          viewType: 'view',
          pathname: '',
        };
        history.replace(toPath(lectureParams));
      }
    });
  }, []);
  return null;
}
