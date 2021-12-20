import Student from './Student';

export interface MyCardRelatedStudentsRom {
  cardStudent: Student | null;
  cubeStudents: Student[] | null;
  prerequisiteCardStudents: Student[] | null;
  complete: boolean;
}
