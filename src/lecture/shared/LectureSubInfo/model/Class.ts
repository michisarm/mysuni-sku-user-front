import { CubeType } from 'shared/model';

interface Class {
  learningTime: number
  capacity?: number
  waitingCapacity?: number
  cubeType: CubeType
  passedStudentCount: number
  studentCount: number
}

export default Class;
