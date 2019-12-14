import { decorate, observable } from 'mobx';
import { IdName } from '../../shared/model/IdName';

export class CubeContentsModel {
  type: string = '';
  contents: IdName = new IdName();
  surveyId: string = '';
  examId: string = '';
  examTitle: string = '';
  examAuthorName: string = '';
  lengthInMinute: number = 0;
  fileBoxId: string = '';

  constructor(cubeContents?: CubeContentsModel) {
    if (cubeContents) {
      const contents = cubeContents.contents && new IdName(cubeContents.contents) || this.contents;
      Object.assign(this, { ...cubeContents, contents });
      this.type = cubeContents.type && cubeContents.type || '';
    }
  }
}

decorate(CubeContentsModel, {
  type: observable,
  contents: observable,
  surveyId: observable,
  examId: observable,
  examTitle: observable,
  examAuthorName: observable,
  lengthInMinute: observable,
  fileBoxId: observable,
});

