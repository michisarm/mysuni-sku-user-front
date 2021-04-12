import { Member } from './Member';

export interface Classroom {
  capacity: number;
  capacityClosed: boolean;
  cubeId: string;
  enrolling: {
    applyingPeriod: {
      endDate: string;
      startDate: string;
      valid: boolean;
      zoneId: string;
    };
    cancellablePeriod: {
      endDate: string;
      startDate: string;
      valid: boolean;
      zoneId: string;
    };
    cancellationPenalty: string;
    enrollingAvailable: boolean;
    learningPeriod: {
      endDate: string;
      startDate: string;
      valid: boolean;
      zoneId: string;
    };
  };
  freeOfCharge: {
    approvalProcess: boolean;
    chargeAmount: number;
    freeOfCharge: boolean;
  };
  id: string;
  operation: {
    location: string;
    operator: {
      keyString: string;
    };
    siteUrl: string;
  };
  patronKey: {
    keyString: string;
  };
  round: number;
  waitingCapacity: number;
}
