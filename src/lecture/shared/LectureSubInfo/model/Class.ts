import { CubeType } from 'shared';

interface Class {
  learningTime: number
  capacity?: number
  waitingCapacity?: number
  cubeType: CubeType
  passedStudentCount: number
}

export default Class;
