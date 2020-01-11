import { decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { NameValueList } from 'shared';
import { DifficultyLevel } from './DifficultyLevel';
import { DescriptionModel } from './DescriptionModel';
import { OperationModel } from './OperationModel';
import { ReportFileBoxModel } from './ReportFileBoxModel';
import { CubeIntroCdoModel } from './CubeIntroCdoModel';


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

  static  asNameValues(cubeIntro: CubeIntroModel): NameValueList {
    const asNameValues = {
      nameValues: [
        {
          name: 'learningTime',
          value: String(cubeIntro.learningTime),
        },
        {
          name: 'difficultyLevel',
          value: cubeIntro.difficultyLevel,
        },
        {
          name: 'description',
          value: JSON.stringify(cubeIntro.description),
        },
        {
          name: 'operation',
          value: JSON.stringify(cubeIntro.operation),
        },
        {
          name: 'feedbackId',
          value: cubeIntro.feedbackId,
        },
        {
          name: 'reportFileBox',
          value: JSON.stringify(cubeIntro.reportFileBox),
        },
      ],
    };

    return asNameValues;
  }

  static asCdo(cubeIntro: CubeIntroModel): CubeIntroCdoModel {
    //
    const operation = cubeIntro.operation && new OperationModel(cubeIntro.operation);
    return (
      {
        audienceKey: 'r2p8-r@nea-m5-c5',
        learningTime: cubeIntro.learningTime,
        difficultyLevel: cubeIntro.difficultyLevel,
        description: cubeIntro.description,
        operation,
        feedbackId: cubeIntro.feedbackId && cubeIntro.feedbackId,
        reportFileBox: cubeIntro.reportFileBox && cubeIntro.reportFileBox,
      }
    );
  }

  static isBlank(cubeIntro: CubeIntroModel) : string {
    if (!cubeIntro.description.goal) return '교육목표';
    if (!cubeIntro.description.applicants) return '교육대상';
    if (!cubeIntro.description.description) return '교육내용';
    if (!cubeIntro.learningTime) return '교육시간';
    if (!cubeIntro.difficultyLevel) return '난이도';
    // 주관사(출처) 확인
    return 'success';
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

