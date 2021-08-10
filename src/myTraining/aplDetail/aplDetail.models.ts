import React from 'react';

export interface AplDetailForm {
  allowHour: string;
  allowMinute: string;
  allowHourRef: React.RefObject<HTMLInputElement>;
  allowMinuteRef: React.RefObject<HTMLInputElement>;
}

export interface AplDetailModal {
  openListModal: boolean;
  openRejectModal: boolean;
  openApprovalModal: boolean;
  openAlertModal: boolean;
}

export function initAplDetailForm(): AplDetailForm {
  return {
    allowHour: '',
    allowMinute: '',
    allowHourRef: React.createRef(),
    allowMinuteRef: React.createRef(),
  };
}

export function initAplDetailModal(): AplDetailModal {
  return {
    openListModal: false,
    openRejectModal: false,
    openApprovalModal: false,
    openAlertModal: false,
  };
}
