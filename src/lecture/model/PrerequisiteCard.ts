import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface PrerequisiteCard {
  prerequisiteCardId: string;
  prerequisiteCardName: PolyglotString;
  required: boolean;
}
