
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
// import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import { LectureSubInfo, OverviewField, DatePeriod } from 'shared';
import { PersonalCubeModel, PersonalCubeService } from 'personalcube/personalcube';
import { CubeIntroModel, CubeIntroService } from 'personalcube/cubeintro';
import { ClassroomModel, ClassroomService } from 'personalcube/classroom';
import { LectureCardService } from 'lecture';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';


interface Props {
  personalCubeService?: PersonalCubeService,
  cubeIntroService?: CubeIntroService,
  classroomService?: ClassroomService,
  lectureCardService?: LectureCardService,
}

interface State {
  categoryOpen: boolean,
}

@inject('personalCubeService', 'cubeIntroService', 'classroomService', 'lectureCardService')
@reactAutobind
@observer
class CategoryLecturesContainer extends Component<Props, State> {
  //
  state = {
    categoryOpen: false,
  };

  // constructor(props: Props) {
  //   super(props);
  //
  //   // reaction(
  //   //   () => props.c
  //   // );
  // }

  componentDidMount() {
    //
    // const { classroomService } = this.props;

    // classroomService.findClassroom()


    // lectureCardService!.findAllLectureCards(0, 20);

    // Todo: 조회 서비스 교체해야함.
    // personalCubeService!.findAllPersonalCubesByQuery();
    // personalCubeService!.findAllPersonalCubes(0, 20);
  }

  onClickEnrollment() {
    console.log('enrollment');
  }

  onClickBookmark() {
    console.log('bookmark');
  }

  onClickShare() {
    console.log('share');
  }

  onClickSurvey() {
    console.log('survey');
  }

  onToggleCategory() {
    //
    this.setState((state) => ({
      categoryOpen: !state.categoryOpen,
    }));
  }

  getClazz(cubeIntro: CubeIntroModel, classroom: ClassroomModel) {
    //
    return {
      learningTime: cubeIntro.learningTime,
      capacity: classroom.capacity,
      participantCount: '1,250',
    };
  }

  getOperator(cubeIntro: CubeIntroModel) {
    //
    return {
      ...cubeIntro.operation.operator,
      instructor: cubeIntro.description.instructor.name,
    };
  }

  getViewObject() {
    //
    const {
      personalCubeService, cubeIntroService, classroomService,
    } = this.props;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;
    const { classroom } = classroomService!;
    console.log('classroom', classroom);

    return {
      // Sub info
      difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: cubeIntro.learningTime,
      capacity: classroom.capacity,
      participantCount: '1,250',
      instructorName: cubeIntro.description.instructor.name,
      operatorName: cubeIntro.operation.operator.name,
      operatorCompany: cubeIntro.operation.operator.company,
      operatorEmail: cubeIntro.operation.operator.email,
      // Fields
      description: cubeIntro.description.description,

      applyingPeriod: classroom.enrolling.applyingPeriod,
      cancellablePeriod: classroom.enrolling.cancellablePeriod,
      cancellationPenalty: classroom.enrolling.cancellationPenalty,

      goal: cubeIntro.description.goal,
      applicants: cubeIntro.description.applicants,
      organizerName: cubeIntro.operation.organizer.name,

      location: cubeIntro.operation.location,
      completionTerms: cubeIntro.description.completionTerms,
      guide: cubeIntro.description.guide,

      tags: personalCube.tags,
    };
  }

  getPeriodDate(datePeriod: DatePeriod) {
    return `${datePeriod.startDate} ~ ${datePeriod.endDate}`;
  }

  renderSubCategories(personalCube: PersonalCubeModel) {
    //
    if (!personalCube.subCategories || personalCube.subCategories.length < 1) {
      return null;
    }

    const subCategoriesPerMain = personalCube.subCategories.reduce((prev: any, subCategory) => {
      //
      const subCategories: string[] = prev[subCategory.college.name] || [];

      subCategories.push(subCategory.channel.name);
      return {
        ...prev,
        [subCategory.college.name]: subCategories,
      };
    }, {});

    return Object.entries(subCategoriesPerMain).map(([categoryName, subCategories]: any[], index: number) => (
      <OverviewField.Item
        key={`sub-category-${index}`}
        title={categoryName}
        content={subCategories.join(' / ')}
      />
    ));
  }

  render() {
    //
    const {
      personalCubeService, cubeIntroService, classroomService,
    } = this.props;
    const { categoryOpen } = this.state;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;
    const { classroom } = classroomService!;
    const viewObject = this.getViewObject();
    console.log('Container.viewModel', viewObject);

    return (
      <LectureCardContentWrapperView>
        <LectureSubInfo
          required={false}  // Todo
          level={cubeIntro.difficultyLevel}
          clazz={this.getClazz(cubeIntro, classroom)}
          operator={this.getOperator(cubeIntro)}
          mainAction={{ type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickEnrollment }}
          onShare={this.onClickShare}
          onBookmark={this.onClickBookmark}
          onSurvey={this.onClickSurvey}
        />

        <OverviewField.Wrapper>
          <OverviewField.Description
            description={cubeIntro.description.description}
          />

          <OverviewField.List
            className={classNames('sub-category fn-parents', { open: categoryOpen })}
            header={(
              <OverviewField.Title
                icon="category"
                text="Sub Category"
              />
            )}
          >
            {this.renderSubCategories(personalCube)}
            <Button
              icon
              className={classNames('right btn-blue fn-more-toggle', { 'btn-more': !categoryOpen, 'btn-hide': categoryOpen })}
              onClick={this.onToggleCategory}
            >
              {categoryOpen ? 'hide' : 'more'} <Icon className={classNames({ more2: !categoryOpen, hide2: categoryOpen })} />
            </Button>
          </OverviewField.List>

          <OverviewField.List icon className="period-area">
            <OverviewField.Item
              titleIcon="period"
              title="Registration Period"
              content={this.getPeriodDate(viewObject.applyingPeriod)}
            />
            <OverviewField.Item
              titleIcon="cancellation"
              title="Cancellation Period"
              content={(
                <>
                  {this.getPeriodDate(viewObject.cancellablePeriod)}
                  <div className="info">
                    Cancellation penalty : {viewObject.cancellationPenalty}
                  </div>
                </>
              )}
            />
          </OverviewField.List>

          <OverviewField.List icon>
            <OverviewField.Item
              titleIcon="goal"
              title="Goal"
              content={viewObject.goal}
            />
            <OverviewField.Item
              titleIcon="target"
              title="Target"
              content={viewObject.applicants}
            />
            <OverviewField.Item
              titleIcon="host"
              title="Hots"
              content={viewObject.organizerName}
            />
          </OverviewField.List>

          <OverviewField.List className="info-box2">
            <OverviewField.Item
              title="Place"
              content={viewObject.location}
            />
            <OverviewField.Item
              title="Requirements"
              content={viewObject.completionTerms}
            />
            <OverviewField.Item
              title="Other Guides"
              contentHtml={viewObject.guide}
            />
          </OverviewField.List>

          <OverviewField.List className="tab-wrap" icon>
            <OverviewField.Item
              titleIcon="tag2"
              title="Tag"
              content={viewObject.tags}
            />
          </OverviewField.List>
        </OverviewField.Wrapper>
      </LectureCardContentWrapperView>
    );
  }
}

export default CategoryLecturesContainer;
