import React, {Component} from 'react';
import {mobxHelper, reactAlert, reactAutobind} from '@nara.platform/accent';
import {inject, observer} from 'mobx-react';

import depot from '@nara.drama/depot';
import {Button, Icon, Segment} from 'semantic-ui-react';
import {AnswerSheetModal, CubeReportModal} from 'assistant';
import {AnswerSheetModal as SurveyAnswerSheetModal} from 'survey';

import {DatePeriod} from 'shared/model';
import {CubeType} from 'personalcube/personalcube/model';
import {OverviewField} from 'personalcube';
import classNames from 'classnames';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import queryString from 'query-string';
import StudentApi from '../../../shared/present/apiclient/StudentApi';
import LectureExam from '../../../shared/LectureExam';

import SkProfileService from '../../../../profile/present/logic/SkProfileService';
import {CourseLectureService, LectureService, ProgramLectureService} from '../../../stores';
import {CoursePlanService} from '../../../../course/stores';
import {LectureServiceType, LectureViewModel, StudentCdoModel} from '../../../model';
import {Lecture} from '../../../shared';
import LectureLearningModalView from './LectureLearningModalView';
import routePaths from '../../../routePaths';

import ProposalState from '../../../../shared/model/ProposalState';

interface Props extends RouteComponentProps<RouteParams> {
  viewObject: any,
  typeViewObject: any,
  onSaveCallback:() => void,
  skProfileService?: SkProfileService,
  lectureService?: LectureService,
  programLectureService?: ProgramLectureService,
  courseLectureService?:  CourseLectureService,
  coursePlanService?: CoursePlanService,
  lectureCardId : string,
  onRefreshLearningState?: () => void,
  onPageRefresh?:() => void,
}

interface RouteParams {
  cineroomId: string,
  collegeId: string,
  coursePlanId: string,
  serviceType: LectureServiceType,
  serviceId: string
}

interface State {
  multiple: boolean,
  categoryOpen: boolean,
  openLearnModal: boolean,
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'lecture.lectureService',
  'lecture.programLectureService',
  'lecture.courseLectureService',
  'course.coursePlanService',
))
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

  state = {
    multiple: false,
    categoryOpen: false,
    openLearnModal: false,
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

    this.findSkProfile();
  }

  componentDidUpdate(prevProps: Props) {
    //
    if (prevProps.viewObject !== this.props.viewObject && prevProps.viewObject.subCategories !== this.props.viewObject.subCategories) {
      this.setMultiple();
    }

    if (prevProps.match.params.coursePlanId !== this.props.match.params.coursePlanId) {
      this.findCoursePlan();
    }
  }

  async findSkProfile()
  {
    const { skProfileService } = this.props;
    await skProfileService!.findSkProfile();
  }

  async findCoursePlan() {
    //
    const { match, coursePlanService } = this.props;

    const coursePlan = await coursePlanService!.findCoursePlan(match.params.coursePlanId);

    if (coursePlan) {
      coursePlanService!.findCoursePlanContents(coursePlan.contentsId);
    }
  }

  setItemsRef(element: any, index: number) {
    this.itemRefs[index] = element;
  }

  setMultiple() {
    //
    const { offsetHeight: panelHeight } = this.panelRef.current.getPanelRef();

    const categoriesHeight = this.itemRefs
      .map((itemRef) => itemRef.getPanelRef().offsetHeight)
      .reduce((prev, current) => prev + current, 0);

    if (categoriesHeight > panelHeight) {
      this.setState({ multiple: true });
    }
  }

  onToggleCategory() {
    //
    this.setState((state) => ({
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
    this.examModal.onOpenModal();
  }

  // truefree 2020-04-03
  // Test 응시 못하는 조건일 땐 Alert 띄워 달라길래....
  onReportNotReady() {
    reactAlert({ title: 'Report 안내', message: '학습 시작 후 Report 참여 가능합니다.' });
  }

  onTestNotReady() {
    reactAlert({ title: 'Test 안내', message: '학습 시작 후 Test 참여 가능합니다.' });
  }

  OnSurveyNotReady() {
    reactAlert({ title: 'Survey 안내', message: '학습 시작 후 Survey 참여 가능합니다.' });
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
      StudentApi.instance.modifyStudentForExam(viewObject.studentId, viewObject.examId)
        .then(() => {
          // if (this.init()) this.init();
        });
    }
  }

  onViewDetail(lecture: LectureViewModel) {
    //
    const { cubeId, coursePlanId, serviceId, serviceType } = lecture;
    const { match, history, location } = this.props;
    const { params } = match;
    const { search } = location;

    // Program -> Course
    if (serviceType === LectureServiceType.Course) {
      if (params.cineroomId) {
        history.push(routePaths.courseOverview(params.cineroomId, params.collegeId, coursePlanId, serviceType, serviceId, {
          programLectureId: params.serviceId,
        }));
      }
      else {
        history.push(routePaths.courseOverviewPrev(params.collegeId, coursePlanId, serviceType, serviceId, {
          programLectureId: params.serviceId,
        }));
      }
    }
    else if (serviceType === LectureServiceType.Card) {
      // Program -> Card
      if (params.serviceType === LectureServiceType.Program) {

        if (params.cineroomId) {
          history.push(routePaths.lectureCardOverview(params.cineroomId, params.collegeId, cubeId, serviceId, {
            programLectureId: params.serviceId,
          }));
        }
        else {
          history.push(routePaths.lectureCardOverviewPrev(params.collegeId, cubeId, serviceId, {
            programLectureId: params.serviceId,
          }));
        }
      }
      // Course -> Card
      else {
        const queryParam = queryString.parse(search);

        if (params.cineroomId) {
          history.push(routePaths.lectureCardOverview(params.cineroomId, params.collegeId, cubeId, serviceId, {
            programLectureId: queryParam.programLectureId as string,
            courseLectureId: params.serviceId,
          }));
        }
        else {
          history.push(routePaths.lectureCardOverviewPrev(params.collegeId, cubeId, serviceId, {
            programLectureId: queryParam.programLectureId as string,
            courseLectureId: params.serviceId,
          }));
        }
      }
    }
  }

  // 학습하기 - 학습 모달창 팝업
  onDoLearn(videoUrl: string, studentCdo: StudentCdoModel):void {
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
    if (this.learnStudentCdo) {
      const studentCdo = {
        ...this.learnStudentCdo,
        proposalState: ProposalState.Approved,
      };
      lectureService?.confirmUsageStatisticsByCardId(studentCdo)
        .then((confirmed) => {
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

  renderSubCategories() {
    //
    const { viewObject } = this.props;

    if (!viewObject.subCategories || viewObject.subCategories.length < 1) {
      return null;
    }

    const subCategoriesPerMain = viewObject.subCategories.reduce((prev: any, subCategory: any) => {
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
        ref={(element) => this.setItemsRef(element, index)}
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
      skProfileService,
      lectureService,
      lectureCardId,
      match,
      onRefreshLearningState,
    } = this.props;

    const { params } = match;
    const { skProfile } = skProfileService!;
    const { member } = skProfile;
    const { lectureViews, getSubLectureViews } = lectureService!;

    if (!viewObject.category) {
      return null;
    }

    const { multiple, categoryOpen, openLearnModal } = this.state;
    const cubeType = viewObject.cubeType;

    // console.log('LectureOverview : ', JSON.stringify(viewObject));

    return (
      <OverviewField.Wrapper>
        <OverviewField.Description
          description={viewObject.description}
        />
        <>
          <Lecture.Group
            type={Lecture.GroupType.Course}
            totalCourseCount={viewObject.totalCourseCount}
          >
            <div className="course-box fn-parents open">
              {lectureViews.map((lecture: LectureViewModel, lectureViewsIndex: number) => (
                <Lecture.CourseSection
                  key={`course-${lectureViewsIndex}`}
                  lecture={(
                    <Lecture.Course
                      className="first"
                      lectureView={lecture}
                      lectureViewSize={(getSubLectureViews(lecture.id).length + 1)}
                      lectureViewName={(lectureViewsIndex+1)+'. '+lecture.name}
                      thumbnailImage={lecture.baseUrl || undefined}
                      toggle={lecture.serviceType === LectureServiceType.Program || lecture.serviceType === LectureServiceType.Course}
                      onViewDetail={() => this.onViewDetail(lecture)}
                      collegeId={params.collegeId}
                      lectureCardId={lectureCardId}
                      member={member}
                      onRefreshLearningState={onRefreshLearningState}
                      onDoLearn={this.onDoLearn}
                    />
                  )}
                >
                  {getSubLectureViews(lecture.id).map((subLecture, index) =>
                    <Lecture.Course
                      key={`sub-lecture-${index}`}
                      className="included"
                      lectureView={subLecture}
                      lectureViewName={(lectureViewsIndex+1)+'. '+(index+1)+'. '+subLecture.name}
                      thumbnailImage={subLecture.baseUrl || undefined}
                      onViewDetail={() => this.onViewDetail(subLecture)}
                      collegeId={params.collegeId}
                      lectureCardId={lectureCardId}
                      member={member}
                      onRefreshLearningState={onRefreshLearningState}
                      onDoLearn={this.onDoLearn}
                    />
                  )}
                </Lecture.CourseSection>
              ))}
            </div>
          </Lecture.Group>
          {
            openLearnModal && (
              <LectureLearningModalView
                ref={lectureLearningModal => this.lectureLearningModal = lectureLearningModal }
                videoUrl={this.learningVideoUrl}
                onClose={this.onLearningModalClose}
              />
            )
          }
        </>
        {
          viewObject && viewObject.examId && (
            <AnswerSheetModal
              examId={viewObject.examId}
              ref={examModal => this.examModal = examModal}
              onSaveCallback={onSaveCallback}
            />
          )
        }

        <CubeReportModal
          downloadFileBoxId ={viewObject.reportFileBoxId}
          ref={reportModal => this.reportModal = reportModal}
          downloadReport = {this.onClickDownloadReport}
          rollBookId={viewObject.rollBookId}
        />

        {
          viewObject && viewObject.surveyId && (
            <SurveyAnswerSheetModal
              surveyId={viewObject.surveyId}
              surveyCaseId={viewObject.surveyCaseId}
              ref={surveyModal => this.surveyModal = surveyModal}
              // onSaveCallback={this.testCallback}
            />
          )
        }

        {
          viewObject && (
            <LectureExam
              onReport={viewObject.reportFileBoxId ? this.onReport : undefined}
              onReportNotReady={viewObject.reportFileBoxId ? this.onReportNotReady : undefined}
              onTest={viewObject.examId ? this.onTest : undefined}
              onTestNotReady={viewObject.examId ? this.onTestNotReady : undefined}
              onSurvey={viewObject.surveyId ? this.onSurvey : undefined}
              OnSurveyNotReady={viewObject.examId ? this.OnSurveyNotReady : undefined}
              viewObject={viewObject}
              passedState={viewObject.passedState}
              type={viewObject.examType}
              name={viewObject.examName}
            />
          )
        }

        <OverviewField.FileDownload
          fileBoxIds={[ viewObject.fileBoxId ]}
        />

        <OverviewField.List
          ref={this.panelRef}
          className={classNames('sub-category fn-parents', { open: categoryOpen })}
          header={(
            <OverviewField.Title
              icon="category"
              text="서브채널"
            />
          )}
        >
          {this.renderSubCategories()}
          { multiple && (
            <Button
              icon
              className={classNames('right btn-blue fn-more-toggle', { 'btn-more': !categoryOpen, 'btn-hide': categoryOpen })}
              onClick={this.onToggleCategory}
            >
              {categoryOpen ? 'hide' : 'more'} <Icon className={classNames({ more2: !categoryOpen, hide2: categoryOpen })} />
            </Button>
          )}
        </OverviewField.List>

        { cubeType === CubeType.ClassRoomLecture && typeViewObject.applyingPeriod && (
          <OverviewField.List icon className="period-area">
            <OverviewField.Item
              titleIcon="period"
              title="수강신청기간"
              content={this.getPeriodDate(typeViewObject.applyingPeriod)}
            />
            <OverviewField.Item
              titleIcon="cancellation"
              title="취소가능기간"
              content={(
                <>
                  {this.getPeriodDate(typeViewObject.cancellablePeriod)}
                  { typeViewObject.cancellationPenalty && (
                    <div className="info">
                      No Show Penalty : {typeViewObject.cancellationPenalty}
                    </div>
                  )}
                </>
              )}
            />
          </OverviewField.List>
        )}

        {
          (typeViewObject.classrooms || viewObject.goal || viewObject.applicants
            || viewObject.organizerName) && (
            <OverviewField.List
              icon
              header={ typeViewObject.classrooms ? (
                <OverviewField.Table
                  titleIcon="series"
                  titleText="차수정보"
                  classrooms={typeViewObject.classrooms}
                />
              ) : null }
            >
              {
                viewObject.goal && (
                  <OverviewField.Item
                    titleIcon="goal"
                    title="학습목표"
                    content={viewObject.goal}
                  />
                ) || null
              }
              {
                viewObject.applicants && (
                  <OverviewField.Item
                    titleIcon="target"
                    title="대상"
                    content={viewObject.applicants}
                  />
                ) || null
              }
              {
                viewObject.organizerName && (
                  <OverviewField.Item
                    titleIcon="host"
                    title="교육기관 출처"
                    content={viewObject.organizerName}
                  />
                )
              }
            </OverviewField.List>
          ) || null
        }
        {
          (typeViewObject.location || viewObject.completionTerms || viewObject.guide)
          && (
            <OverviewField.List className="info-box2">
              { cubeType === CubeType.ClassRoomLecture && (
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
          ) || null
        }
        <OverviewField.List className="tab-wrap" icon>
          <OverviewField.Item
            titleIcon="tag2"
            title="태그"
            content={viewObject.tags.map((tag: string, index: number) => (
              tag && <span key={`tag-${index}`} className="ui label tag">{tag}</span>
            ))}
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    );
  }
}

export default withRouter(LectureOverviewViewV2);
