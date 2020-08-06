
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
