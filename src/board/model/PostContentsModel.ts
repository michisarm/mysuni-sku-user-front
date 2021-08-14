import { decorate, observable } from 'mobx';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

class PostContentsModel {
  //
  contents: PolyglotString | null = null;
  depotId: string = '';

  constructor(postContents?: PostContentsModel) {
    if (postContents) {
      Object.assign(this, { ...postContents });
    }
  }
}

decorate(PostContentsModel, {
  contents: observable,
  depotId: observable,
});

export default PostContentsModel;
