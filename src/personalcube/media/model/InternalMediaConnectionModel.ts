import { decorate, observable } from 'mobx';

export class InternalMediaConnectionModel {
  panoptoSessionId: string = '';                                // panopto Session Id(* panopto 동영상 uniq id)
  viewUrl: string = '';
  thumbUrl: string = '';
  startTime: string = '';                                       // 업로드 시간

  constructor(internalMediaConnection?: InternalMediaConnectionModel) {
    if (internalMediaConnection) {
      Object.assign(this, internalMediaConnection);
    }
  }
}

decorate(InternalMediaConnectionModel, {
  panoptoSessionId: observable,
  viewUrl: observable,
  thumbUrl: observable,
  startTime: observable,
});

