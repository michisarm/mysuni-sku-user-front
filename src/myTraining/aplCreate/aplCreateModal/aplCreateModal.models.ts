export interface AplCreateModal {
  alertMessage: string;
  alertMessage2: string;
  alertWinOpen: boolean;
  alertWinOpen2: boolean;
  alertTitle: string;
  alertTitle2: string;
  alertType: string;
}

export function initAplCreateModal(): AplCreateModal {
  return {
    alertMessage: '',
    alertMessage2: '',
    alertWinOpen: false,
    alertWinOpen2: false,
    alertTitle: '',
    alertTitle2: '',
    alertType: '',
  };
}
