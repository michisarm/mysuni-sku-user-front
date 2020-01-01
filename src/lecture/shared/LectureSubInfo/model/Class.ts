import { CubeType } from 'shared';

interface Class {
  learningTime: number
  capacity?: number
  waitingCapacity?: number
  cubeType: CubeType
  participantCount: string | number
}

export default Class;
