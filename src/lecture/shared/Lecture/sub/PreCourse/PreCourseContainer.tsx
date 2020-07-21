import React, {Component} from 'react';
import {mobxHelper, reactAlert, reactAutobind} from '@nara.platform/accent';
import {inject, observer} from 'mobx-react';

import depot from '@nara.drama/depot';

import classNames from 'classnames';
import {Button, Icon} from 'semantic-ui-react';

import {LearningState, ProposalState} from 'shared/model';
import {EmployeeModel} from 'profile/model';
import {ContentsServiceType, CubeType, PersonalCubeModel} from 'personalcube/personalcube/model';
import {MediaModel, MediaType} from 'personalcube/media/model';
import {PersonalCubeService} from 'personalcube/personalcube/stores';
import {MediaService} from 'personalcube/media/stores';
import {BoardService} from 'personalcube/community/stores';
import {ExaminationService, ExamPaperService} from 'assistant/stores';
import {SurveyCaseService, SurveyFormService} from 'survey/stores';

import {LectureViewModel, RollBookModel, StudentCdoModel, StudentJoinRdoModel, StudentModel} from '../../../../model';
import LectureSubInfo, {State as SubState} from '../../../LectureSubInfo';

import StudentService from '../../../present/logic/StudentService';
import RollBookService from '../../../present/logic/RollBookService';

import Action from '../../model/Action';
import {CourseSectionContext} from '../CourseSection';
import {AnswerProgress} from '../../../../../survey/answer/model/AnswerProgress';
import LectureExam from '../../../LectureExam/ui/logic/LectureExamContainer2';
import {AnswerSheetModal, CubeReportModal} from '../../../../../assistant';
import {AnswerSheetModal as SurveyAnswerSheetModal} from '../../../../../survey';
import StudentApi from '../../../present/apiclient/StudentApi';
import AnswerSheetApi from '../../../../../survey/answer/present/apiclient/AnswerSheetApi';
import {CubeIntroService} from '../../../../../personalcube/cubeintro/stores';
import {dateTimeHelper} from '../../../../../shared';

interface Props {
  rollBookService?: RollBookService,
  personalCubeService?: PersonalCubeService,
  studentService?: StudentService,
  collegeId?: string,
  lectureView: LectureViewModel,
  lectureViewName?: string,
  className?: string,
  action?: Action,
  onViewDetail?: (e: any) => void,
  onRefreshLearningState?: () => void,
  student?: StudentModel,
  lectureCardId?: string,

  learningState?: string
}

interface State
{
  classNameForLearningState: string,
}

@inject(mobxHelper.injectFrom(
  'lecture.rollBookService',
  'personalCube.boardService',
  'personalCube.personalCubeService',
  'lecture.studentService',
))
@reactAutobind
@observer
class PreCourseContainer extends Component<Props, State> {
  //

  static contextType = CourseSectionContext;

  static defaultProps = {
    thumbnailImage: null,
    action: null,
    toggle: false,
    onAction: () => {},
    onViewDetail: () => {},
    onToggle: () => {},
    onRefreshLearningState: () => {},
    className: '',
    rollBookService: RollBookService,
    boardService: BoardService,
    personalCubeService: PersonalCubeService,
    studentService: StudentService,
    mediaService: MediaService,
  };

  viewObject: any = null;
  studentData: any = StudentModel;

  personalCube: PersonalCubeModel | null = {} as PersonalCubeModel;
  studentForVideoObj: StudentModel | null = {} as StudentModel;
  rollBooks: RollBookModel[] = [];

  state =
    {
      classNameForLearningState: 'fix line' || 'fix bg',
    };

  constructor(props: Props)
  {
    //
    super(props);
    this.init();
  }

  componentDidMount()
  {

    const { lectureView } = this.props;
    const { setOpen } = this.context;

    console.log('lectureView : ', lectureView);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
  }

  async init()
  {
    const { personalCubeService, rollBookService, studentService, lectureView } = this.props;
    const { getStudentForVideo } = studentService!;

    if (lectureView && lectureView.cubeId) {
      this.personalCube = await personalCubeService!.findPersonalCube(lectureView.cubeId);
      this.rollBooks = await rollBookService!.findAllLecturesByLectureCardId(lectureView.serviceId);

      // console.log('init lectureView : ', lectureView);
      // console.log('init personalCube : ', this.personalCube);ß
      // console.log('init rollBoo.ks : ', this.rollBooks[0]);

      if (this.rollBooks[0]) {
        this.studentData = await StudentApi.instance.findStudentByRollBookId(this.rollBooks[0].id);
      }

      getStudentForVideo(lectureView.serviceId).then((studentForVideo) =>
      {
        this.studentForVideoObj = studentForVideo;
      });
    }

    // this.studentForVideoObj = await getStudentForVideo(lectureView.serviceId);
    // this.classNameForLearningState = this.setClassNameForLearningState(this.studentForVideoObj);
  }

  getStudentJoin() {
    const {
      studentService,
    } = this.props;
    const { studentJoins }: StudentService = studentService!;

    if (studentJoins && studentJoins.length) {
      studentJoins.sort(this.compare);
      const studentJoin = studentJoins[0];
      return studentJoin;
    }
    return null;
  }

  compare(join1: StudentJoinRdoModel, join2: StudentJoinRdoModel) {
    if (join1.updateTime < join2.updateTime) return 1;
    return -1;
  }




  render() {
    //
    const { classNameForLearningState } = this.state;
    const {
      className, lectureView, lectureViewName, learningState
    } = this.props;
    const { open } = this.context;

    // let openState = this.context.open;

    // if( learningState === SubState.InProgress ) {
    //   openState = true;
    //   setOpen(openState);
    // }

    const hourMinuteFormat = dateTimeHelper.timeToHourMinuteFormat(this.props.lectureView.learningTime);

    return (
      <>
        {className !== 'first' && (
          <div className="detail">
            <ul className="step1">
              { lectureView.cubeTypeName && (
                <li>
                  <div className="tit">
                    <span className="ellipsis">{lectureViewName}</span>
                  </div>
                  <div className="right">
                    <span>{lectureView.cubeTypeName}</span>
                    <span>{hourMinuteFormat}</span>
                    {/*TODO: 미디어 타입이 아닌 경우 학습상태*/}
                  </div>
                </li>
              )}

            </ul>
          </div>
        )}
      </>
    );
  }
}


interface FieldProps {
  children: React.ReactNode,
}

const Field = ({ children }: FieldProps) => (
  <li>
    {children}
  </li>
);

export default PreCourseContainer;
