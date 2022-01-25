import { PolyglotString } from './../../../shared/viewmodel/PolyglotString';
import { LearningState } from './../../model/LearningState';

export default interface PlaylistCardWithProgressRdo {
  cardId: string;
  cardName: PolyglotString;
  completePhaseCount: number;
  cubeCount: number;
  learningState: LearningState;
  learningTime: number;
  phaseCount: number;
  thumbnailImagePath: string;
}
