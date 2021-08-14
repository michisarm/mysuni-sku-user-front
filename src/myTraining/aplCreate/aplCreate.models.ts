export interface AplCreateFocus {
  objStr: string;
  focusControlName: string;
  focusYn: string;
}

export function initAplCreateFocus(): AplCreateFocus {
  return {
    objStr: '',
    focusControlName: '',
    focusYn: '',
  };
}
