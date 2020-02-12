import { CubeType } from 'shared/model';

interface Class {
  learningTime: number
  capacity?: number
  waitingCapacity?: number
  cubeType: CubeType
  passedStudentCount: number
}

export default Class;
