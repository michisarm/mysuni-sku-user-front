import { decorate, observable } from 'mobx';
import { IdName } from '../../shared/model/IdName';

export class ProgramSetModel {
  //
  cards: IdName[] = [];
  courses: IdName[] = [];
  prerequisitePrograms: IdName[] = [];

  constructor(programSet?: ProgramSetModel) {
    if (programSet) {
      Object.assign(this, { ...programSet });
    }
  }
}

decorate(ProgramSetModel, {
  cards: observable,
  courses: observable,
  prerequisitePrograms: observable,
});
