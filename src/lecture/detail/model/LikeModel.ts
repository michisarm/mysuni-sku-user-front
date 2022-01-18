export default class LikeModel {
  //
  denizenId: string = '';
  feedbackId: string = '';
  id: string = '';
  time: number = 0;

  constructor(like?: LikeModel) {
    if (like) {
      Object.assign(this, { ...like });
    }
  }
}
