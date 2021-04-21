import { PrerequisiteCard } from '../../../model/PrerequisiteCard';

export default interface LecturePrecourse {
  prerequisiteCards: PrerequisiteCard[];
}

export function getEmptyLecturePrecourse(): LecturePrecourse {
  return {
    prerequisiteCards: [],
  };
}
