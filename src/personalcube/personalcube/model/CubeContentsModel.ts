
import { decorate, observable } from 'mobx';
import { IdName } from 'shared-model';
import CubeType from './CubeType';
import ContentsService from './ContentsService';


export class CubeContentsModel {

  type: CubeType = CubeType.None;
  contents: IdName = new IdName();
  lengthInMinute: number = 0;
  surveyId: string = '';

  examId: string = '';
  examTitle: string = '';
  examAuthorName: string = '';

  fileBoxId: string = '';

  service: ContentsService = new ContentsService();

  constructor(cubeContents?: CubeContentsModel) {
    if (cubeContents) {
      const contents = cubeContents.contents && new IdName(cubeContents.contents) || this.contents;
      Object.assign(this, { ...cubeContents, contents });
      this.type = cubeContents.type;
      this.service = new ContentsService(cubeContents.type);
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

