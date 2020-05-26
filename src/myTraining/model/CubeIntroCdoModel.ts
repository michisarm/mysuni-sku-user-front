import { DifficultyLevel } from './DifficultyLevel';
import { DescriptionModel } from './DescriptionModel';
import { OperationModel } from './OperationModel';
import { ReportFileBoxModel } from './ReportFileBoxModel';

export class CubeIntroCdoModel {
  //
  audienceKey: string = 'r2p8-r@nea-m5-c5';
  learningTime: number = 0;
  difficultyLevel: DifficultyLevel = DifficultyLevel.Basic;
  description: DescriptionModel = new DescriptionModel();
  operation: OperationModel = new OperationModel();
  feedbackId: string = '';
  reportFileBox: ReportFileBoxModel = new ReportFileBoxModel();
}
