export default class LikeRdo {
  //
  count: number = 0;
  feedbackId: string = '';

  constructor(rdo?: LikeRdo) {
    if (rdo) {
      Object.assign(this, { ...rdo });
    }
  }
}
