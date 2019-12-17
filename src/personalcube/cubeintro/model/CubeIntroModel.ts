import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { DifficultyLevel } from './DifficultyLevel';
import { DescriptionModel } from './DescriptionModel';
import { OperationModel } from './OperationModel';
import { ReportFileBoxModel } from './ReportFileBoxModel';

export class CubeIntroModel implements DramaEntity {

  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  learningTime: number = 0;
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  description: DescriptionModel = new DescriptionModel();
  operation: OperationModel = new OperationModel();
  feedbackId: string = '';
  reportFileBox: ReportFileBoxModel = new ReportFileBoxModel();        // 과제여부 및 filebox

  constructor(intro?: CubeIntroModel) {
    if (intro) {
      const description = intro.description && new DescriptionModel(intro.description) || this.description;
      const operation = intro.operation && new OperationModel(intro.operation) || this.operation;
      const reportFileBox = intro.reportFileBox && new ReportFileBoxModel(intro.reportFileBox) || this.reportFileBox;
      Object.assign(this, { ...intro, description, operation, reportFileBox });
    }
  }
}

decorate(CubeIntroModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,
  learningTime: observable,
  description: observable,
  difficultyLevel: observable,
  operation: observable,
  feedbackId: observable,
  reportFileBox: observable,
});

