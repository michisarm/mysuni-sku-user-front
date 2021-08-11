import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function aplStateNamePolyglotText(s: string) {
  if (s === 'Created') {
    return getPolyglotText('생성test', 'apl-state-생성');
  } else if (s === 'OpenApproval') {
    return getPolyglotText('승인대기test', 'apl-state-승인대기');
  } else if (s === 'Opened') {
    return getPolyglotText('승인test', 'apl-state-승인');
  } else if (s === 'Rejected') {
    return getPolyglotText('반려test', 'apl-state-반려');
  } else {
    return '';
  }
}

export enum AplStateName {
  Created = '생성',
  OpenApproval = '승인대기',
  Opened = '승인',
  Rejected = '반려',
}
