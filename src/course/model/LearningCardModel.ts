import { computed, decorate, observable } from 'mobx';
import { IdName, NameValueList, CategoryModel, CubeType } from 'shared/model';

export class LearningCardModel {
  //
  audienceKey: string = '';
  learningCardId: string = '';
  personalCube: IdName = new IdName();
  markComplete: boolean = false;

  category: CategoryModel = new CategoryModel();
  cubeType: CubeType = CubeType.ClassRoomLecture;
  creator: IdName = new IdName();
  feedbackId: string = '';

  time: number = 0;

  constructor(learningCard?: LearningCardModel) {
    //
    if (learningCard) {
      const personalCube = learningCard.personalCube && new IdName(learningCard.personalCube) || this.personalCube;
      const category = learningCard.category && new CategoryModel(learningCard.category) || this.category;
      const creator = learningCard.creator && new IdName(learningCard.creator) || this.creator;

      Object.assign(this, { ...learningCard, personalCube, category, creator });
    }
  }

  @computed
  get getChannelName() {
    return this.category && this.category.channel && this.category.channel.name;
  }

  @computed
  get getStringTime() {
    return new Date(this.time).toLocaleDateString();
  }

  static asNameValues(learningCard: LearningCardModel) : NameValueList {
    //
    return {
      nameValues: [
        {
          name: 'markComplete',
          value: String(learningCard.markComplete),
        },
        {
          name: 'category',
          value: JSON.stringify(learningCard.category),
        },
        {
          name: 'cubeType',
          value: learningCard.cubeType,
        },
      ],
    };
  }
}

decorate(LearningCardModel, {
  audienceKey: observable,
  learningCardId: observable,
  personalCube: observable,
  markComplete: observable,

  category: observable,
  cubeType: observable,
  creator: observable,
  feedbackId: observable,
  time: observable,
});
