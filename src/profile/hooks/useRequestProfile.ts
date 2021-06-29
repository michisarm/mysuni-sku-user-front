import { useEffect } from 'react';
import { isExternalInstructor } from '../../shared/helper/findUserRole';
import { requestProfile } from '../service/requestProfile';

export function useRequestProfile() {
  useEffect(() => {
    const isExternal = isExternalInstructor();
    if (isExternal === true) {
      return;
    }
    requestProfile();
  }, []);
}
