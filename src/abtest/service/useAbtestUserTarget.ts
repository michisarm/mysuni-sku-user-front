import { useEffect } from 'react';
import { AbtestService } from 'abtest/stores';

export function useAbtestUserTarget(): void {
  useEffect(() => {
    AbtestService.instance.getAbtestUserTargets();
  }, []);
}
