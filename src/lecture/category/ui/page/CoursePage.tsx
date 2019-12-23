import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ContentLayout, ContentMenu, Type, mobxHelper } from 'shared';
import { CollegeService } from 'college';
import { CoursePlanService } from 'course';
import { CubeType } from 'personalcube/personalcube';

import { ProgramLectureService, CourseLectureService, LectureService, LectureServiceType } from '../../../shared';
import LectureCardHeaderView from '../view/LectureCardHeaderView';
import LectureCardContainer from '../logic/LectureCardContainer';
import LectureOverviewView from '../view/LectureOverviewView';
import LectureCommentsContainer from '../logic/LectureCommentsContainer';
import CourseContainer from '../logic/CourseContainer';


interface Props extends RouteComponentProps<{ collegeId: string, lectureCardId: string, coursePlanId: string, serviceId: string, serviceType: LectureServiceType }> {
  collegeService: CollegeService,
  coursePlanService: CoursePlanService,
  courseLectureService: CourseLectureService,
  programLectureService: ProgramLectureService,
  lectureService: LectureService,
}

interface State {
  type: Type
}

@inject(mobxHelper.injectFrom(
  'collegeService',
  'course.coursePlanService',
  'lecture.courseLectureService',
  'lecture.programLectureService',
  'lecture.lectureService',
))
@reactAutobind
@observer
class LectureCardPage extends Component<Props, State> {
  //
  state= {
    type: Type.List,
  };

  componentDidMount() {
    //
    this.init();
    this.findCourseLecture();
  }

  async init() {
    const {
      match, collegeService, coursePlanService,
    } = this.props;
    const { params } = match;

    collegeService.findCollege(params.collegeId);
    const coursePlan = await coursePlanService.findCoursePlan(params.coursePlanId);
    coursePlanService.findCoursePlanContents(coursePlan.contentsId);


    // const lectureCard = await lectureCardService.findLectureCard(params.lectureCardId);
    // const learningCard = await learningCardService.findLearningCard(lectureCard!.learningCard.id);
    // const personalCube = await personalCubeService.findPersonalCube(learningCard.personalCube.id);

    // if (personalCube) {
    //   cubeIntroService.findCubeIntro(personalCube.cubeIntro.id);
    // }
  }

  async findCourseLecture() {
    //
    const { match, programLectureService, courseLectureService, lectureService } = this.props;

    // lectureService.findLectureViews()
    if (match.params.serviceType === LectureServiceType.Program) {
      const programLecture = await programLectureService.findProgramLecture(match.params.serviceId);
      // lectureService.findLectureViews(programLecture.lectureCards, []);
    }
    else {
      const courseLecture = await courseLectureService.findCourseLecture(match.params.serviceId);
      lectureService.findLectureViews(courseLecture.lectureCards);
    }
  }


  getViewObject() {
    //
    const {
      coursePlanService,
    } = this.props;
    const { coursePlan, coursePlanContents } = coursePlanService!;
    // const { cubeIntro } = cubeIntroService!;

    console.log(coursePlan);
    return {
      // Sub info
      required: false,  // Todo
      // difficultyLevel: cubeIntro.difficultyLevel,
      learningTime: 0,
      participantCount: '1,250',  // Todo

      // instructorName: cubeIntro.description.instructor.name,
      operatorName: coursePlan.courseOperator.name,
      operatorCompany: coursePlan.courseOperator.company,
      operatorEmail: coursePlan.courseOperator.email,

      // Fields
      subCategories: coursePlan.subCategories,
      description: coursePlanContents.description,

      tags: coursePlan.courseOpen.tags,
      surveyId: coursePlanContents.surveyId,
      fileBoxId: coursePlanContents.fileBoxId,
      reportFileBoxId: coursePlan.reportFileBox.fileBoxId,
      stamp: coursePlan.stamp.stampReady && coursePlan.stamp.stampCount || 0,

      //etc
      category: coursePlan.category,
      cubeType: CubeType.None,
      name: coursePlan.name,
      time: coursePlan.time,

      classroom: undefined,
    };
  }

  getTypeViewObject(): any {
    //
    const {
      coursePlanService,
    } = this.props;
    const { coursePlan, coursePlanContents } = coursePlanService!;

    return {
      learningPeriod: coursePlanContents.learningPeriod,
      fileBoxId: '',
    };
  }

  getMenus() {
    //
    const menus: typeof ContentMenu.Menu[] = [
      { name: 'List', type: Type.List },
      { name: 'Overview', type: Type.Overview },
      { name: 'Comments', type: Type.Comments },
    ];

    return menus;
  }

  renderChildren(viewObject: any, typeViewObject: any) {
    //
    const { type } = this.state;
    const { coursePlan } = this.props.coursePlanService;

    switch (type) {
      case Type.List:
        return (
          <CourseContainer />
        );
      case Type.Overview:
        return (
          <LectureOverviewView
            viewObject={viewObject}
            typeViewObject={typeViewObject}
          />
        );
      case Type.Comments:
        return (
          <LectureCommentsContainer
            // reviewFeedbackId={lectureCard.reviewFeedbackId}
            // commentFeedbackId={lectureCard.commentFeedbackId}
            reviewFeedbackId=""
            commentFeedbackId=""
          />
        );
      default:
        return null;
    }
  }

  render() {
    //
    const { collegeService } = this.props;
    const { college } = collegeService;
    const viewObject = this.getViewObject();
    const typeViewObject = this.getTypeViewObject();

    return (
      <ContentLayout
        className="channel"
        breadcrumb={[
          { text: `${college.name} College`, path: `../../${college.collegeId}/channels` },
          { text: `${college.name} Course` },
        ]}
      >
        <LectureCardHeaderView
          viewObject={viewObject}
          typeViewObject={{}}
          rating={1}
          maxRating={5}
        />
        <ContentMenu
          menus={this.getMenus()}
          type={this.state.type}
          onSelectMenu={(type) => this.setState({ type })}
        />
        <LectureCardContainer
          cubeType={CubeType.None}
          viewObject={viewObject}
          typeViewObject={typeViewObject}
        >
          { this.renderChildren(viewObject, typeViewObject) }
        </LectureCardContainer>
      </ContentLayout>
    );
  }
}

export default withRouter(LectureCardPage);
