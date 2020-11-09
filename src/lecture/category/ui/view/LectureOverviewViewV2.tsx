/* eslint-disable */
import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import depot from '@nara.drama/depot';
import { storageHelper } from 'shared';
import { Button, Icon } from 'semantic-ui-react';
import { AnswerSheetModal, CubeReportModal } from 'assistant';
import { AnswerSheetModal as SurveyAnswerSheetModal } from 'survey';

import { DatePeriod, LearningState } from 'shared/model';
import { CubeType } from 'personalcube/personalcube/model';
import { OverviewField } from 'personalcube';
import classNames from 'classnames';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import StudentApi from '../../../shared/present/apiclient/StudentApi';
import { LectureExam2 } from '../../../shared/LectureExam';

import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import {
  CourseLectureService,
  LectureService,
  ProgramLectureService,
} from '../../../stores';
import { CoursePlanService } from '../../../../course/stores';
import {
  LectureServiceType,
  LectureViewModel,
  StudentCdoModel,
} from '../../../model';
import { Lecture2 } from '../../../shared';
import LectureLearningModalView from './LectureLearningModalView';
import routePaths from '../../../routePaths';

import ProposalState from '../../../../shared/model/ProposalState';
import StudentService from '../../../shared/present/logic/StudentService';
import StudentInfoModel from '../../../model/StudentInfoModel';
import SurveyCaseModel from '../../../../survey/event/model/SurveyCaseModel';

interface Props extends RouteComponentProps<RouteParams> {
  viewObject: any;
  typeViewObject: any;
  onSaveCallback: () => void;
  onSurveyCallback: () => void;
  skProfileService?: SkProfileService;
  lectureService?: LectureService;
  programLectureService?: ProgramLectureService;
  courseLectureService: CourseLectureService;
  coursePlanService?: CoursePlanService;
  studentService: StudentService;
  lectureCardId: string;
  onRefreshLearningState?: () => void;
  onPageInit: () => void;
  onPageRefresh?: () => void;
  isPreCoursePassed: boolean;
  studentInfo: StudentInfoModel | null;
}

interface RouteParams {
  cineroomId: string;
  collegeId: string;
  coursePlanId: string;
  serviceType: LectureServiceType;
  serviceId: string;
}

interface State {
  multiple: boolean;
  categoryOpen: boolean;
  openLearnModal: boolean;
  pgmTestReady: boolean;
}

@inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'lecture.lectureService',
    'lecture.programLectureService',
    'lecture.courseLectureService',
    'course.coursePlanService'
  )
)
@reactAutobind
@observer
class LectureOverviewViewV2 extends Component<Props, State> {
  //
  static defaultProps = {
    onRefreshLearningState: () => {},
  };

  lectureLearningModal: any = null;
  learningVideoUrl: string = '';
  learnStudentCdo: StudentCdoModel | null = null;
  lectureView: LectureViewModel = new LectureViewModel();

  state = {
    multiple: false,
    categoryOpen: false,
    openLearnModal: false,
    pgmTestReady: false,
  };

  panelRef = React.createRef<any>();
  itemRefs: any[] = [];

  examModal: any = null;
  surveyModal: any = null;
  reportModal: any = null;
  applyReferenceModel: any = null;

  componentDidMount() {
    //
    this.setMultiple();
    this.chkPgmTest();
    this.findSkProfile();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (
      prevProps.viewObject !== this.props.viewObject &&
      prevProps.viewObject.subCategories !== this.props.viewObject.subCategories
    ) {
      this.setMultiple();
    }

    if (
      prevProps.match.params.coursePlanId !==
      this.props.match.params.coursePlanId
    ) {
      this.findCoursePlan();
    }

    if (prevProps.studentInfo !== this.props.studentInfo) {
      this.chkPgmTest();
    }
  }

  // Program 일 경우 하위 교육 모두 Passed 일때 Test 가능하게 20201030 by gon
  chkPgmTest() {
    // cube    : 교육최소단위                      cube-Test
    // course  : cube 묶음                        cube-Test, course-Test
    // program : cube or course in course 형태    cube-Test, course-Test, course-Test
    // cube, course, program 모두 Test 까지 끝나야 학습완료임
    // program 일때 cube in program, cube in course   학습완료 만 체크해서 Test 가능하게 되어 있었음.
    //              course in program   학습완료 체크하는 로직 추가
    // api:own -> store:student 로 바꿔서 리턴함
    // student:{}
    // lecture:{lectures:[student:{}]}
    // course:{courses:[student:{}]}
    const { studentInfo } = this.props;
    if (studentInfo !== null) {
      const { student, lecture, course } = studentInfo!;
      let notPassCnt = 0;
      if (student!.serviceType === 'Program') {
        // cube complete check
        lecture &&
          lecture.lectures.map(lecture => {
            if (lecture.learningState !== 'Passed') notPassCnt++;
          });
        // course complete check
        course &&
          course.courses.map(course => {
            if (course.student.learningState !== 'Passed') notPassCnt++;
          });
      }
      if (notPassCnt > 0) {
        this.setState({ pgmTestReady: false });
      } else {
        this.setState({ pgmTestReady: true });
      }
    }
  }

  async findSkProfile() {
    const { skProfileService } = this.props;
    await skProfileService!.findSkProfile();
  }
  //
  // async findStudentInfo() {
  //   const { studentService, coursePlanService } = this.props;
  //   const { courseIdsSet } = coursePlanService!;
  //   const { setStudentInfo } = studentService;
  //
  //   if ( courseIdsSet.serviceId !== null && courseIdsSet.serviceId !== '' ) {
  //     await setStudentInfo(courseIdsSet.serviceId, courseIdsSet.lectureCardIds, courseIdsSet.courseLectureIds);
  //   }
  // }

  async findCoursePlan() {
    //
    const { match, coursePlanService } = this.props;

    const coursePlan = await coursePlanService!.findCoursePlan(
      match.params.coursePlanId
    );

    if (coursePlan) {
      coursePlanService!.findCoursePlanContents(coursePlan.contentsId);
    }

    // 렌더시 화면 최상으로 이동
    window.scrollTo(0, 0);
  }

  setItemsRef(element: any, index: number) {
    this.itemRefs[index] = element;
  }

  setMultiple() {
    //
    const { offsetHeight: panelHeight } = this.panelRef.current.getPanelRef();

    if (this.itemRefs) {
      const categoriesHeight = this.itemRefs
        .map(itemRef => itemRef.getPanelRef().offsetHeight)
        .reduce((prev, current) => prev + current, 0);

      if (categoriesHeight > panelHeight) {
        this.setState({ multiple: true });
      }
    }
  }

  onToggleCategory() {
    //
    this.setState(state => ({
      categoryOpen: !state.categoryOpen,
    }));
  }

  getPeriodDate(datePeriod: DatePeriod) {
    if (!datePeriod) return '';
    return `${datePeriod.startDate} ~ ${datePeriod.endDate}`;
  }

  onApplyReference() {
    this.applyReferenceModel.onOpenModal();
  }

  onReport() {
    this.reportModal.onOpenModal();
  }

  onTest() {
    const { isPreCoursePassed } = this.props;
    if (isPreCoursePassed) {
      this.examModal.onOpenModal();
    } else {
      reactAlert({
        title: '선수과정안내',
        message:
          '본 시험은 선수 Course 과정을 이수하신 후에 응시가 가능합니다.',
      });
    }
  }

  // truefree 2020-04-03
  // Test 응시 못하는 조건일 땐 Alert 띄워 달라길래....
  onReportNotReady() {
    reactAlert({
      title: 'Report 안내',
      message: '학습 시작 후 Report 참여 가능합니다.',
    });
  }

  onAlreadyPassed() {
    reactAlert({ title: 'Test 안내', message: '이미 통과한 시험입니다.' });
  }

  onTestWaiting() {
    reactAlert({
      title: 'Test 안내',
      message: '시험 결과를 기다리고 있습니다.',
    });
  }

  onTestNotReady() {
    const { viewObject } = this.props;

    if (viewObject.cubeType === 'Course' || viewObject.cubeType === 'Program') {
      reactAlert({
        title: 'Test 안내',
        message: '과정 이수 완료 후 Test 응시 가능합니다.',
      });
    } else {
      reactAlert({
        title: 'Test 안내',
        message: '학습 시작 후 Test 참여 가능합니다.',
      });
    }
  }

  OnSurveyNotReady() {
    reactAlert({
      title: 'Survey 안내',
      message: '학습 시작 후 Survey 참여 가능합니다.',
    });
  }

  onSurvey() {
    this.surveyModal.onOpenModal();
  }

  onClickDownloadReport(fileBoxId: string) {
    //
    depot.downloadDepot(fileBoxId);
  }

  testCallback() {
    const { viewObject } = this.props;
    // const { id: studentId } = student!;

    if (viewObject) {
      StudentApi.instance
        .modifyStudentForExam(viewObject.studentId, viewObject.examId)
        .then(() => {
          // if (this.init()) this.init();
        });
    }
  }

  onPreCourseViewDetail(lecture: LectureViewModel) {
    const { coursePlanId, serviceId, serviceType } = lecture;
    const { match, history } = this.props;
    const { params } = match;

    // history.push 로 하면 가끔 에러남...
    // history.push(routePaths.preCourseOverview(params.cineroomId, params.collegeId, coursePlanId, serviceType, serviceId, {
    //   postCourseLectureId: params.serviceId,
    // }));

    window.location.href = `/suni-main/lecture/cineroom/${params.cineroomId}/college/${params.collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}?postCourseLectureId=${serviceId}`;
  }

  onViewDetail(lecture: LectureViewModel) {
    //
    const { cubeId, coursePlanId, serviceId, serviceType } = lecture;
    const { match, history, location } = this.props;
    const { params } = match;
    const { search } = location;

    // console.log('lecture : ', lecture);

    // Program -> Course
    if (serviceType === LectureServiceType.Course) {
      if (params.cineroomId) {
        history.push(
          routePaths.courseOverview(
            params.cineroomId,
            params.collegeId,
            coursePlanId,
            serviceType,
            serviceId,
            {
              programLectureId: params.serviceId,
            }
          )
        );
      } else {
        history.push(
          routePaths.courseOverviewPrev(
            params.collegeId,
            coursePlanId,
            serviceType,
            serviceId,
            {
              programLectureId: params.serviceId,
            }
          )
        );
      }
    } else if (serviceType === LectureServiceType.Card) {
      // Program -> Card
      if (params.serviceType === LectureServiceType.Program) {
        if (params.cineroomId) {
          history.push(
            routePaths.lectureCardOverview(
              params.cineroomId,
              params.collegeId,
              cubeId,
              serviceId,
              {
                programLectureId: params.serviceId,
              }
            )
          );
        } else {
          history.push(
            routePaths.lectureCardOverviewPrev(
              params.collegeId,
              cubeId,
              serviceId,
              {
                programLectureId: params.serviceId,
              }
            )
          );
        }
      }
      // Course -> Card
      else {
        const queryParam = queryString.parse(search);

        if (params.cineroomId) {
          history.push(
            routePaths.lectureCardOverview(
              params.cineroomId,
              params.collegeId,
              cubeId,
              serviceId,
              {
                programLectureId: queryParam.programLectureId as string,
                courseLectureId: params.serviceId,
              }
            )
          );
        } else {
          history.push(
            routePaths.lectureCardOverviewPrev(
              params.collegeId,
              cubeId,
              serviceId,
              {
                programLectureId: queryParam.programLectureId as string,
                courseLectureId: params.serviceId,
              }
            )
          );
        }
      }
    }
  }

  // 학습하기 - 학습 모달창 팝업
  onDoLearn(
    videoUrl: string,
    studentCdo: StudentCdoModel,
    lectureView?: LectureViewModel
  ): void {
    // 동영상 close click 시 lectureCardId 가 같다면
    // 20200717 video 멀티 시청불가~! = return true
    if (storageHelper.checkMultiVideo(lectureView?.serviceId)) {
      reactAlert({
        title: '알림',
        message:
          '현재 다른 과정을 학습하고 있습니다.<br>가급적 기존 학습을 완료한 후 학습해 주시기 바랍니다.',
        onClose: () => this.playVideo(videoUrl, studentCdo, lectureView),
      });
    } else {
      this.playVideo(videoUrl, studentCdo, lectureView);
    }
  }

  playVideo(
    videoUrl: string,
    studentCdo: StudentCdoModel,
    lectureView?: LectureViewModel
  ) {
    if (lectureView) this.lectureView = lectureView;
    this.learningVideoUrl = videoUrl;
    studentCdo.proposalState = ProposalState.Approved;
    this.learnStudentCdo = studentCdo;
    this.setState({
      openLearnModal: true,
    });
  }

  // 학습 모달창 닫기 - 학습통계정보 저장
  onLearningModalClose() {
    const { lectureService, onPageRefresh } = this.props;

    // 동영상 close click 시 lectureCardId 가 같다면
    // 20200717 video 멀티 시청불가~! 해제
    storageHelper.deleteMultiVideo(this.lectureView.serviceId);

    if (this.learnStudentCdo) {
      const studentCdo = {
        ...this.learnStudentCdo,
        proposalState: ProposalState.Approved,
      };
      lectureService
        ?.confirmUsageStatisticsByCardId(studentCdo)
        .then(confirmed => {
          if (onPageRefresh) {
            onPageRefresh();
          }
        });
    }

    this.learningVideoUrl = '';
    this.learnStudentCdo = null;
    this.setState({
      openLearnModal: false,
    });
  }

  handleLectureInitRequest() {
    const { onPageInit } = this.props;
    if (onPageInit) onPageInit();
  }

  getTestViewObject(lectureView: LectureViewModel) {
    //
    let state: string | undefined;
    let examId: string = '';
    let examTitle: string = '';
    let surveyId: string = '';
    let surveyTitle: string = '';
    let surveyState: boolean = false;
    let surveyCaseId: string = '';
    let reportFileBoxId: string = '';

    state = lectureView.learningState || undefined;
    examId = lectureView.examPaper.id || '';
    examTitle = lectureView.examPaper.title || '';
    surveyId = lectureView.surveyCase.id || '';
    surveyTitle = 'TEST' || '';
    surveyState = false;
    surveyCaseId = lectureView.surveyCase.id || '';
    reportFileBoxId = '' || '';

    if (lectureView.personalCube) {
      if (lectureView.learningState === null) {
        state = LearningState.Waiting;
      } else if (lectureView.learningState === LearningState.Passed) {
        state = LearningState.Progress;
      } else {
        state = LearningState.Progress;
      }

      // if (!examId && this.studentData.phaseCount !== this.studentData.completePhaseCount &&
      //   this.studentData.learningState === LearningState.Progress) {
      //   state = SubState.InProgress;
      // }
    }
    // console.log('getViewObject>>>> : ', this.state.isContent);
    return {
      // Sub info
      state,
      examId,
      // Fields
      examTitle,
      surveyId,
      surveyTitle,
      surveyState,
      surveyCaseId,
      reportFileBoxId,
    };
  }

  renderSubCategories() {
    //
    const { viewObject } = this.props;

    if (!viewObject.subCategories || viewObject.subCategories.length < 1) {
      return null;
    }

    const subCategoriesPerMain = viewObject.subCategories.reduce(
      (prev: any, subCategory: any) => {
        //
        const subCategories: string[] = prev[subCategory.college.name] || [];

        subCategories.push(subCategory.channel.name);
        return {
          ...prev,
          [subCategory.college.name]: subCategories,
        };
      },
      {}
    );

    return Object.entries(
      subCategoriesPerMain
    ).map(([categoryName, subCategories]: any[], index: number) => (
      <OverviewField.Item
        key={`sub-category-${index}`}
        ref={element => this.setItemsRef(element, index)}
        title={categoryName}
        content={subCategories.join(' / ')}
      />
    ));
  }

  render() {
    //
    const {
      viewObject,
      typeViewObject,
      onSaveCallback,
      onSurveyCallback,
      onPageInit,
      skProfileService,
      lectureService,
      lectureCardId,
      match,
      onRefreshLearningState,
      courseLectureService,
      isPreCoursePassed,
      studentInfo,
      history,
    } = this.props;

    const { location } = history;
    const { params } = match;
    const { skProfile } = skProfileService!;
    const { member } = skProfile;
    const { lectureViews, getSubLectureViews } = lectureService!;
    const { preLectureViews, courseLecture } = courseLectureService;

    if (!viewObject.category) {
      return null;
    }

    const { multiple, categoryOpen, openLearnModal, pgmTestReady } = this.state;
    const cubeType = viewObject.cubeType;

    const isPreCourse = courseLectureService.getPreLectureViews.length > 0;
    const hasNotPostCourse = !location.search.match('postCourseLectureId');

    // console.log('LectureOverviewViewV2 viewObject : ', viewObject);
    // console.log('LectureOverviewViewV2 : ', params.serviceType);

    return (
      <OverviewField.Wrapper>
        {viewObject.description !== undefined &&
          viewObject.description !== null &&
          viewObject.description !== '' && (
            <OverviewField.Description description={viewObject.description} />
          )}
        <>
          <div className="ov-paragraph course-area">
            <div className="course-cont">
              {/*선수코스*/}
              {isPreCourse && hasNotPostCourse && (
                <Lecture2.Group type={Lecture2.GroupType.PreCourse}>
                  {preLectureViews.map((preLectureView: LectureViewModel) => (
                    <Lecture2.PreCourse
                      lectureView={preLectureView}
                      lectureViewName={preLectureView.name}
                      onViewDetail={() =>
                        this.onPreCourseViewDetail(preLectureView)
                      }
                    />
                  ))}
                </Lecture2.Group>
              )}

              {/* Course 콘텐츠 */}
              <Lecture2.Group
                type={Lecture2.GroupType.Course}
                totalCourseCount={viewObject.totalCourseCount}
              >
                {lectureViews.map(
                  (lecture: LectureViewModel, lectureViewsIndex: number) => (
                    <Lecture2.CourseSection
                      key={`course-${lectureViewsIndex}`}
                      lecture={
                        <Lecture2.Course
                          className="first"
                          lectureView={lecture}
                          lectureViewSize={
                            getSubLectureViews(lecture.id).length
                          }
                          lectureViewName={
                            lectureViewsIndex + 1 + '. ' + lecture.name
                          }
                          thumbnailImage={lecture.baseUrl || undefined}
                          toggle={
                            lecture.serviceType ===
                              LectureServiceType.Program ||
                            lecture.serviceType === LectureServiceType.Course
                          }
                          onViewDetail={() => this.onViewDetail(lecture)}
                          collegeId={params.collegeId}
                          lectureCardId={lectureCardId}
                          learningState={viewObject.state}
                          member={member}
                          onRefreshLearningState={onRefreshLearningState}
                          onDoLearn={this.onDoLearn}
                          isPreCoursePassed={isPreCoursePassed}
                          studentInfo={studentInfo}
                          onLectureInitRequest={this.handleLectureInitRequest}
                        />
                      }
                    >
                      {getSubLectureViews(lecture.id).map(
                        (subLecture, index) => (
                          <>
                            <Lecture2.Course
                              key={`sub-lecture-${index}`}
                              className="included"
                              lectureView={subLecture}
                              lectureViewName={
                                lectureViewsIndex +
                                1 +
                                '. ' +
                                (index + 1) +
                                '. ' +
                                subLecture.name
                              }
                              thumbnailImage={subLecture.baseUrl || undefined}
                              onViewDetail={() => this.onViewDetail(subLecture)}
                              collegeId={params.collegeId}
                              lectureCardId={lectureCardId}
                              member={member}
                              onRefreshLearningState={onRefreshLearningState}
                              onDoLearn={this.onDoLearn}
                              isPreCoursePassed={isPreCoursePassed}
                              studentInfo={studentInfo}
                              onLectureInitRequest={
                                this.handleLectureInitRequest
                              }
                            />

                            <Lecture2.TRS
                              key={`sub-lecture-trs-${index}`}
                              className="included"
                              lectureView={subLecture}
                              lectureViewName={
                                lectureViewsIndex +
                                1 +
                                '. ' +
                                (index + 1) +
                                '. ' +
                                subLecture.name
                              }
                              thumbnailImage={subLecture.baseUrl || undefined}
                              onViewDetail={() => this.onViewDetail(subLecture)}
                              collegeId={params.collegeId}
                              lectureCardId={lectureCardId}
                              member={member}
                              onRefreshLearningState={onRefreshLearningState}
                              onDoLearn={this.onDoLearn}
                              isPreCoursePassed={isPreCoursePassed}
                              studentInfo={studentInfo}
                              onLectureInitRequest={
                                this.handleLectureInitRequest
                              }
                            />
                          </>
                        )
                      )}
                      {/*{console.log('================ : ', lectureViewsIndex)}*/}
                      <Lecture2.TRS
                        key={`course-trs-${lectureViewsIndex}`}
                        className="course-trs"
                        lectureView={lecture}
                        lectureViewSize={getSubLectureViews(lecture.id).length}
                        lectureViewName={
                          lectureViewsIndex + 1 + '. ' + lecture.name
                        }
                        thumbnailImage={lecture.baseUrl || undefined}
                        toggle={
                          lecture.serviceType === LectureServiceType.Program ||
                          lecture.serviceType === LectureServiceType.Course
                        }
                        onViewDetail={() => this.onViewDetail(lecture)}
                        collegeId={params.collegeId}
                        lectureCardId={lectureCardId}
                        learningState={viewObject.state}
                        member={member}
                        onRefreshLearningState={onRefreshLearningState}
                        onDoLearn={this.onDoLearn}
                        isPreCoursePassed={isPreCoursePassed}
                        studentInfo={studentInfo}
                        onLectureInitRequest={this.handleLectureInitRequest}
                      />
                      {/*{console.log('================ : ', lecture.name)}*/}
                    </Lecture2.CourseSection>
                  )
                )}
              </Lecture2.Group>

              {/* 시험 리포트 설문 */}
              {viewObject && (
                <>
                  <LectureExam2
                    onReport={
                      viewObject.reportFileBoxId ? this.onReport : undefined
                    }
                    onReportNotReady={
                      viewObject.reportFileBoxId
                        ? this.onReportNotReady
                        : undefined
                    }
                    onTest={viewObject.examId ? this.onTest : undefined}
                    onTestNotReady={
                      viewObject.examId ? this.onTestNotReady : undefined
                    }
                    onAlreadyPassed={
                      viewObject.examId ? this.onAlreadyPassed : undefined
                    }
                    onTestWaiting={
                      viewObject.examId ? this.onTestWaiting : undefined
                    }
                    onSurvey={viewObject.surveyId ? this.onSurvey : undefined}
                    OnSurveyNotReady={
                      viewObject.surveyId ? this.OnSurveyNotReady : undefined
                    }
                    viewObject={viewObject}
                    passedState={viewObject.passedState}
                    type={!pgmTestReady ? '1' : viewObject.examType}
                    name={viewObject.examName}
                    sort="box"
                  />
                  {/* type={!pgmTestReady ? '1' : viewObject.examType} */}
                  {/* Program 일 경우 하위 교육 모두 Passed 일때 Test 가능하게 20201030 by gon */}
                  {/* Program 일 경우 아래 Course, Cube 가 전부 Passed 가 아닐 경우 TestNotReady */}

                  {/*<Lecture2.TRS*/}
                  {/*  // key={`course-trs-${lectureViewsIndex}`}*/}
                  {/*  className="course-trs"*/}
                  {/*  lectureView={lecture}*/}
                  {/*  // lectureViewSize={(getSubLectureViews(lecture.id).length)}*/}
                  {/*  // lectureViewName={(lectureViewsIndex + 1) + '. ' + lecture.name}*/}
                  {/*  // thumbnailImage={lecture.baseUrl || undefined}*/}
                  {/*  // toggle={lecture.serviceType === LectureServiceType.Program || lecture.serviceType === LectureServiceType.Course}*/}
                  {/*  // onViewDetail={() => this.onViewDetail(lecture)}*/}
                  {/*  collegeId={params.collegeId}*/}
                  {/*  lectureCardId={lectureCardId}*/}
                  {/*  learningState={viewObject.state}*/}
                  {/*  member={member}*/}
                  {/*  onRefreshLearningState={onRefreshLearningState}*/}
                  {/*  onDoLearn={this.onDoLearn}*/}
                  {/*  isPreCoursePassed={isPreCoursePassed}*/}
                  {/*  studentInfo={studentInfo}*/}
                  {/*  onLectureInitRequest={this.handleLectureInitRequest}*/}
                  {/*/>*/}
                </>
              )}
            </div>
          </div>

          {openLearnModal && (
            <LectureLearningModalView
              ref={lectureLearningModal =>
                (this.lectureLearningModal = lectureLearningModal)
              }
              videoUrl={this.learningVideoUrl}
              onClose={this.onLearningModalClose}
            />
          )}
        </>
        {viewObject && viewObject.examId && (
          <AnswerSheetModal
            examId={viewObject.examId}
            ref={examModal => (this.examModal = examModal)}
            onSaveCallback={onSaveCallback}
            onInitCallback={onPageInit}
          />
        )}

        <CubeReportModal
          downloadFileBoxId={viewObject.reportFileBoxId}
          ref={reportModal => (this.reportModal = reportModal)}
          downloadReport={this.onClickDownloadReport}
          rollBookId={viewObject.rollBookId}
        />

        {viewObject && viewObject.surveyId && (
          <SurveyAnswerSheetModal
            surveyId={viewObject.surveyId}
            surveyCaseId={viewObject.surveyCaseId}
            ref={surveyModal => (this.surveyModal = surveyModal)}
            onSaveCallback={onSurveyCallback}
            // onSaveCallback={this.testCallback}
            serviceId={params.serviceId}
            serviceType={params.serviceType}
          />
        )}

        <OverviewField.List
          ref={this.panelRef}
          className={classNames('sub-category fn-parents', {
            open: categoryOpen,
          })}
          header={<OverviewField.Title icon="category" text="서브채널" />}
        >
          {this.renderSubCategories()}
          {multiple && (
            <Button
              icon
              className={classNames('right btn-blue fn-more-toggle', {
                'btn-more': !categoryOpen,
                'btn-hide': categoryOpen,
              })}
              onClick={this.onToggleCategory}
            >
              {categoryOpen ? 'hide' : 'more'}{' '}
              <Icon
                className={classNames({
                  more2: !categoryOpen,
                  hide2: categoryOpen,
                })}
              />
            </Button>
          )}
        </OverviewField.List>

        {/* 첨부파일 UI 변경 by gon */}
        {viewObject && (
          <>
            {viewObject.fileBoxId && viewObject.fileBoxId.length > 0 && (
              <OverviewField.FileDownload fileBoxIds={[viewObject.fileBoxId]} />
            )}
          </>
        )}

        {cubeType === CubeType.ClassRoomLecture &&
          typeViewObject.applyingPeriod && (
            <OverviewField.List icon className="period-area">
              <OverviewField.Item
                titleIcon="period"
                title="수강신청기간"
                content={this.getPeriodDate(typeViewObject.applyingPeriod)}
              />
              <OverviewField.Item
                titleIcon="cancellation"
                title="취소가능기간"
                content={
                  <>
                    {this.getPeriodDate(typeViewObject.cancellablePeriod)}
                    {typeViewObject.cancellationPenalty && (
                      <div className="info">
                        No Show Penalty : {typeViewObject.cancellationPenalty}
                      </div>
                    )}
                  </>
                }
              />
            </OverviewField.List>
          )}

        {((typeViewObject.classrooms ||
          viewObject.goal ||
          viewObject.applicants ||
          viewObject.organizerName) && (
          <OverviewField.List
            icon
            header={
              typeViewObject.classrooms ? (
                <OverviewField.Table
                  titleIcon="series"
                  titleText="차수정보"
                  classrooms={typeViewObject.classrooms}
                />
              ) : null
            }
          >
            {(viewObject.goal && (
              <OverviewField.Item
                titleIcon="goal"
                title="학습목표"
                content={viewObject.goal}
              />
            )) ||
              null}
            {(viewObject.applicants && (
              <OverviewField.Item
                titleIcon="target"
                title="대상"
                content={viewObject.applicants}
              />
            )) ||
              null}
            {viewObject.organizerName && (
              <OverviewField.Item
                titleIcon="host"
                title="교육기관 출처"
                content={viewObject.organizerName}
              />
            )}
          </OverviewField.List>
        )) ||
          null}
        {((typeViewObject.location ||
          viewObject.completionTerms ||
          viewObject.guide) && (
          <OverviewField.List className="info-box2">
            {cubeType === CubeType.ClassRoomLecture && (
              <OverviewField.Item
                title="장소"
                content={typeViewObject.location}
              />
            )}
            <OverviewField.Item
              title="이수조건"
              content={viewObject.completionTerms}
            />
            <OverviewField.Item
              title="기타안내"
              className="quill-des"
              contentHtml={viewObject.guide}
            />
          </OverviewField.List>
        )) ||
          null}
        <OverviewField.List className="tab-wrap" icon>
          <OverviewField.Item
            titleIcon="tag2"
            title="태그"
            content={viewObject.tags.map(
              (tag: string, index: number) =>
                tag && (
                  <span key={`tag-${index}`} className="ui label tag">
                    {tag}
                  </span>
                )
            )}
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    );
  }
}

export default withRouter(LectureOverviewViewV2);
