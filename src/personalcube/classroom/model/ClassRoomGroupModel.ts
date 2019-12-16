import { decorate, observable } from 'mobx';
import { IdName } from 'shared';
import { DramaEntity, PatronKey } from '@nara.platform/accent';

export class ClassRoomGroupModel implements DramaEntity {
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  classrooms: IdName[] = [];
  totalRound: number = 0;
  time: number = 0;

  constructor(group?: ClassRoomGroupModel) {
    if (group) {
      const classrooms = group.classrooms && group.classrooms.length
        && group.classrooms.map(classRoom => new IdName(classRoom)) || this.classrooms;
      Object.assign(this, { ...group, classrooms });
    }
  }
}

decorate(ClassRoomGroupModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,
  classrooms: observable,
  totalRound: observable,
  time: observable,
});
