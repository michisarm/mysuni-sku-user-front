import IdNameSequence from './IdNameSequence';

export default interface LearningCardSet {
  cards: IdNameSequence[];
  prerequisiteCards: IdNameSequence[];
}
