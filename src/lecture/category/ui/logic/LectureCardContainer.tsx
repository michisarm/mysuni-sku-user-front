import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
// import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';

import classNames from 'classnames';
import { Button, Icon } from 'semantic-ui-react';
import { mobxHelper, DatePeriod, LectureSubInfo, OverviewField } from 'shared';
import { CubeType, PersonalCubeService } from 'personalcube/personalcube';
import { CubeIntroModel, CubeIntroService } from 'personalcube/cubeintro';
import { ClassroomService } from 'personalcube/classroom';
import { LectureCardService } from 'lecture';
import LectureCardContentWrapperView from '../view/LectureCardContentWrapperView';
import ContentsServiceType from '../../../../personalcube/personalcube/model/ContentsServiceType';


interface Props {
  personalCubeService?: PersonalCubeService,
  cubeIntroService?: CubeIntroService,
  classroomService?: ClassroomService,
  lectureCardService?: LectureCardService,
}

interface State {
  categoryOpen: boolean,
}

@inject(mobxHelper.injectFrom('personalCube.personalCubeService', 'personalCube.cubeIntroService', 'personalCube.classroomService', 'personalCube.lectureCardService'))
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
      personalCubeService, cubeIntroService,
    } = this.props;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;

    return {
      // Sub info
      required: false,  // Todo
      difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: cubeIntro.learningTime,
      participantCount: '1,250',  // Todo

      instructorName: cubeIntro.description.instructor.name,
      operatorName: cubeIntro.operation.operator.name,
      operatorCompany: cubeIntro.operation.operator.company,
      operatorEmail: cubeIntro.operation.operator.email,

      // Fields
      description: cubeIntro.description.description,

      goal: cubeIntro.description.goal,
      applicants: cubeIntro.description.applicants,
      organizerName: cubeIntro.operation.organizer.name,

      completionTerms: cubeIntro.description.completionTerms,
      guide: cubeIntro.description.guide,

      tags: personalCube.tags,

      classroom: undefined,
    };
  }

  getTypeViewObject(): any {
    //
    const {
      personalCubeService, cubeIntroService, classroomService,
    } = this.props;
    const { personalCube } = personalCubeService!;
    const { cubeIntro } = cubeIntroService!;
    const { classroom } = classroomService!;
    console.log('personalCube', personalCube);
    console.log('cubeIntro', cubeIntro);
    console.log('classroom', classroom);

    const contentsService = personalCube.contents.service;
    let cubeTypeViewObject = {};

    switch (contentsService.type) {
      case ContentsServiceType.Classroom:
        cubeTypeViewObject = this.getClassroomViewObject();
        break;
      case ContentsServiceType.Media:
        cubeTypeViewObject = this.getMediaViewObject();
        break;
      case ContentsServiceType.OfficeWeb:
        cubeTypeViewObject = this.getOfficeWebViewObject();
        break;
      case ContentsServiceType.Community:
        cubeTypeViewObject = this.getCommunityViewObject();
        break;
    }

    return cubeTypeViewObject;
  }

  getClassroomViewObject() {
    //
    const { classroom } = this.props.classroomService!;
    console.log('ClassroomViewObject');

    return {
      capacity: classroom.capacity,
      applyingPeriod: classroom.enrolling.applyingPeriod,
      cancellablePeriod: classroom.enrolling.cancellablePeriod,
      cancellationPenalty: classroom.enrolling.cancellationPenalty,
      location: classroom.operation.location,
    };
  }

  getMediaViewObject() {
    //
    return {};
  }

  getOfficeWebViewObject() {
    return {};
  }

  getCommunityViewObject() {
    return {};
  }

  getPeriodDate(datePeriod: DatePeriod) {
    return `${datePeriod.startDate} ~ ${datePeriod.endDate}`;
  }

  renderSubCategories() {
    //
    const { personalCube } = this.props.personalCubeService!;

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
      personalCubeService,
    } = this.props;
    const { categoryOpen } = this.state;
    const { personalCube } = personalCubeService!;
    const cubeType = personalCube.contents.type;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();
    console.log('Container.viewModel', viewObject);
    console.log('Container.typeViewModel', typeViewObject);

    return (
      <LectureCardContentWrapperView>
        <LectureSubInfo
          required={viewObject.required}
          level={viewObject.difficultyLevel}
          clazz={{
            learningTime: viewObject.learningTime,
            capacity: typeViewObject ? typeViewObject.capacity : 0,
            participantCount: viewObject.participantCount,
          }}
          operator={{
            instructor: viewObject.instructorName,
            name: viewObject.operatorName,
            company: viewObject.operatorCompany,
            email: viewObject.operatorEmail,
          }}
          mainAction={{ type: LectureSubInfo.ActionType.Enrollment, onAction: this.onClickEnrollment }}
          onShare={this.onClickShare}
          onBookmark={this.onClickBookmark}
          onSurvey={this.onClickSurvey}
        />

        <OverviewField.Wrapper>
          <OverviewField.Description
            description={viewObject.description}
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
            {this.renderSubCategories()}
            <Button
              icon
              className={classNames('right btn-blue fn-more-toggle', { 'btn-more': !categoryOpen, 'btn-hide': categoryOpen })}
              onClick={this.onToggleCategory}
            >
              {categoryOpen ? 'hide' : 'more'} <Icon className={classNames({ more2: !categoryOpen, hide2: categoryOpen })} />
            </Button>
          </OverviewField.List>

          { cubeType === CubeType.ClassRoomLecture && (
            <OverviewField.List icon className="period-area">
              <OverviewField.Item
                titleIcon="period"
                title="Registration Period"
                content={this.getPeriodDate(typeViewObject.applyingPeriod)}
              />
              <OverviewField.Item
                titleIcon="cancellation"
                title="Cancellation Period"
                content={(
                  <>
                    {this.getPeriodDate(typeViewObject.cancellablePeriod)}
                    { typeViewObject.cancellationPenalty && (
                      <div className="info">
                        Cancellation penalty : {typeViewObject.cancellationPenalty}
                      </div>
                    )}
                  </>
                )}
              />
            </OverviewField.List>
          )}

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
            { cubeType === CubeType.ClassRoomLecture && (
              <OverviewField.Item
                title="Place"
                content={typeViewObject.location}
              />
            )}
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
