import { decorate, observable } from 'mobx';
export class UserCreatedCube {
  //
  cubeId: string = '';
  passedStudentCount: number = 0;
  studentCount: number = 0;
  starCount: number = 0;
  usedInCard: boolean = false;

  constructor(cubeRelatedCount?: UserCreatedCube) {
    if (cubeRelatedCount) {
      Object.assign(this, { ...cubeRelatedCount });
    }
  }
}

decorate(UserCreatedCube, {
  passedStudentCount: observable,
  studentCount: observable,
  starCount: observable,
  usedInCard: observable,
  cubeId: observable,
});
