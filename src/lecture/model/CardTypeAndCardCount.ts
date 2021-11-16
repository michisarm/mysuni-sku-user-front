import FilterCountViewModel from 'myTraining/model/FilterCountViewModel';
import CardType from '../shared/model/CardType';

export interface CardTypeAndCardCount {
  cardType: CardType;
  count: number;
}

export function getTotalFilterCountView(
  cardTypeCardCounts: CardTypeAndCardCount[]
): FilterCountViewModel {
  const totalFilterCountView = new FilterCountViewModel();

  cardTypeCardCounts.forEach((cardCount) => {
    totalFilterCountView.totalCount += cardCount.count;

    switch (cardCount.cardType) {
      case 'Course':
        totalFilterCountView.course = cardCount.count;
        break;
      case 'Video':
        totalFilterCountView.video = cardCount.count;
        break;
      case 'Audio':
        totalFilterCountView.audio = cardCount.count;
        break;
      case 'ELearning':
        totalFilterCountView.elearning = cardCount.count;
        break;
      case 'ClassRoomLecture':
        totalFilterCountView.classroomLecture = cardCount.count;
        break;
      case 'Community':
        totalFilterCountView.community = cardCount.count;
        break;
      case 'Task':
        totalFilterCountView.task = cardCount.count;
        break;
      case 'WebPage':
        totalFilterCountView.webPage = cardCount.count;
        break;
      case 'Documents':
        totalFilterCountView.documents = cardCount.count;
        break;
      case 'Experiential':
        totalFilterCountView.experiential = cardCount.count;
        break;
      case 'Cohort':
        totalFilterCountView.cohort = cardCount.count;
        break;
      case 'Discussion':
        totalFilterCountView.discussion = cardCount.count;
        break;
    }
  });

  return totalFilterCountView;
}
