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
    onViewDetail: () => {},
  };

  constructor (props: Props)
  {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
  }


  render() {
    //
    const {
      lectureView, lectureViewName, onViewDetail,
    } = this.props;

    return (
      <>
        { lectureView && (
          <div className="course-box">
            <div className="bar">

              <div className="tit">
                <a href="#" className="ellipsis" onClick={onViewDetail}>
                  { lectureView.required === 0 ? (
                    <span className="blue">[선택] </span>
                  ) : (
                    <span className="red">[필수] </span>
                  )}

                  <span className="under">{lectureViewName}</span>
                </a>
              </div>

              <div className="right-area">
                <a className="ui icon right button btn-blue" onClick={onViewDetail}>
                  <span>바로가기</span>
                  <i className="arrow-g-16 icon" />
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}


interface FieldProps {
  children: React.ReactNode,
}

// const Field = ({ children }: FieldProps) => (
//   <li>
//     {children}
//   </li>
// );

export default PreCourseContainer;
