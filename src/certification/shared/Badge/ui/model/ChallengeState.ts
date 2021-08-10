import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

export function challengeStateText(s: string) {
  if (s === ChallengeState.WaitForChallenge) {
    return getPolyglotText('도전하기', 'Certification-View-도전');
  } else if (s === ChallengeState.Challenging) {
    return getPolyglotText('도전취소', 'Certification-View-도전취소');
  } else if (s === ChallengeState.ReadyForRequest) {
    return getPolyglotText('발급요청', 'Certification-View-발급요청');
  } else if (s === ChallengeState.Requested) {
    return getPolyglotText('발급요청 취소', 'Certification-View-발급취소');
  } else if (s === ChallengeState.Issued) {
    return getPolyglotText('획득완료', 'Certification-View-획득완료');
  }
}

enum ChallengeState {
  WaitForChallenge = 'WaitForChallenge',
  Challenging = 'Challenging',
  ReadyForRequest = 'ReadyForRequest',
  Requested = 'Requested',
  Issued = 'Issued',
  Challenged = 'Challenged',
  Canceled = 'Canceled',
}

export default ChallengeState;
