import { useEffect } from 'react';
import { AplService } from 'myTraining/stores';
import { CountType } from 'myTraining/model/AplRdoModel';

export function useRequestMyApprovalTabCount() {
  useEffect(() => {
    AplService.instance.findAllTabCount(CountType.approvalId);
    return () => AplService.instance.clearAplCount();
  }, []);
}
