import IdNameSequence from './IdNameSequence';

export default interface ProgramSet {
  cards: IdNameSequence[];
  courses: IdNameSequence[];
  prerequisitePrograms: IdNameSequence[];
}
