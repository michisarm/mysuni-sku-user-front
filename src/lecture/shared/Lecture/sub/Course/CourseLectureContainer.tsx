
import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import classNames from 'classnames';
import moment from 'moment';
import { Icon, Button } from 'semantic-ui-react';
import { LectureSubInfo, LectureViewModel } from 'lecture/index';
import Action from '../../model/Action';
import { CubeIconType } from '../../model';
import { CourseSectionContext } from '../CourseSection';
import {
  Title, SubField, Buttons, Thumbnail,
} from '../../../ui/view/LectureElementsView';
import MediaService from '../../../../../personalcube/media/present/logic/MediaService';
import StudentService from '../../../present/logic/StudentService';
import RollBookService from '../../../present/logic/RollBookService';
import BoardService from '../../../../../personalcube/board/present/logic/BoardService';
import PersonalCubeService from '../../../../../personalcube/personalcube/present/logic/PersonalCubeService';
import { EmployeeModel } from '../../../../../profile';
import StudentModel from '../../../model/StudentModel';
import { PersonalCubeModel } from '../../../../../personalcube/personalcube';
import RollBookModel from '../../../model/RollBookModel';
import StudentJoinRdoModel from '../../../model/StudentJoinRdoModel';
import StudentCdoModel from '../../../model/StudentCdoModel';
import ProposalState from '../../../../../shared/model/ProposalState';
import { MediaModel, MediaType } from '../../../../../personalcube/media';
import CubeType from '../../../../../personalcube/personalcube/model/CubeType';
import ContentsServiceType from '../../../../../personalcube/personalcube/model/ContentsServiceType';
import { State as SubState } from '../../../LectureSubInfo';
import LearningState from '../../../../../shared/model/LearningState';

interface Props {
  rollBookService?: RollBookService,
  boardService: BoardService,
  personalCubeService?: PersonalCubeService,
  studentService?: StudentService,
  mediaService?: MediaService,
  collegeId?: string,
  lectureView: LectureViewModel,
  className: string,
  thumbnailImage?: string,
  action?: Action,
  toggle?: boolean,
  open?: boolean,
  onAction?: () => void,
  onViewDetail?: (e: any) => void,
  onToggle?: () => void,

  student?: StudentModel,
  lectureCardId?: string,
  member? : EmployeeModel
}

@inject(mobxHelper.injectFrom(
  'lecture.rollBookService',
  'personalCube.boardService',
  'personalCube.personalCubeService',
  'lecture.studentService',
  'personalCube.mediaService'
))
@reactAutobind
@observer
class CourseLectureContainer extends Component<Props> {
  //
  static defaultProps = {
    className: '',
    thumbnailImage: null,
    action: null,
    toggle: false,
    open: false,
    onAction: () => {},
    onViewDetail: () => {},
    onToggle: () => {},

    rollBookService: RollBookService,
    boardService: BoardService,
    personalCubeService: PersonalCubeService,
    studentService: StudentService,
    mediaService: MediaService,
  };

  static contextType = CourseSectionContext;

  personalCube: PersonalCubeModel | null = {} as PersonalCubeModel;
  rollBooks: RollBookModel[] = [];

  componentDidMount()
  {
    //
    this.init();
  }

  async init()
  {
    const { personalCubeService, rollBookService, studentService, lectureView } = this.props;

    this.personalCube = await personalCubeService!.findPersonalCube(lectureView.cubeId);
    this.rollBooks = await rollBookService!.findAllLecturesByLectureCardId(lectureView.serviceId);

    await studentService!.findIsJsonStudent(lectureView.serviceId);
    this.findStudent();

    console.log('CourseLectureContainer init() rollBooks=', this.rollBooks);
  }

  onToggle() {
    //
    const { open, setOpen } = this.context;

    setOpen(!open);
  }

  compare(join1: StudentJoinRdoModel, join2: StudentJoinRdoModel) {
    if (join1.updateTime < join2.updateTime) return 1;
    return -1;
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

  findStudent() {
    const {
      studentService,
    } = this.props;
    const { studentJoins }: StudentService = studentService!;

    if (studentJoins && studentJoins.length) {
      const studentJoin = this.getStudentJoin();
      if (studentJoin) studentService!.findStudentByRollBookId(studentJoin.rollBookId);
    }
  }

  registerStudentForVideo(studentCdo: StudentCdoModel)
  {
    //lectureCardId
    const { studentService, lectureView } = this.props;
    console.log('CourseLectureContainer registerStudentForVideo studentService=' + studentService);
    console.log('CourseLectureContainer registerStudentForVideo lectureCardId=' + lectureView.serviceId);

    return studentService!.registerStudent(studentCdo)
      .then(() => {
        studentService!.findStudent(studentCdo.rollBookId);
        studentService!.findIsJsonStudent(lectureView.serviceId);
        studentService!.findStudentCount(studentCdo.rollBookId);
      });
  }

  onRegisterStudentForVideo(proposalState?: ProposalState)
  {
    const studentCdo = this.getStudentCdo();
    const { student } = this.props.studentService!;
    console.log('CourseLectureContainer onRegisterStudentForVideo studentCdo=', studentCdo);
    console.log('CourseLectureContainer onRegisterStudentForVideo student=', student);
    if ((!student || !student.id) || (student.proposalState !== ProposalState.Canceled && student.proposalState !== ProposalState.Rejected))
    {
      this.registerStudentForVideo({ ...studentCdo, proposalState: proposalState || studentCdo.proposalState });
    }
    else if (student.proposalState === ProposalState.Canceled || student.proposalState === ProposalState.Rejected) {
      this.registerStudentForVideo({ ...studentCdo, proposalState: student.proposalState });
    }
  }

  onLearningStartForVideo(url : string)
  {
    console.log('CourseLectureContainer onLearningStartForVideo url=' + url);
    if (url && url.startsWith('http')) {
      this.onRegisterStudentForVideo(ProposalState.Approved);
      window.open(url, '_blank');
    } else
    {
      reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
      console.warn('[UserFront] Url is empty.');
    }
  }

  onClickPlayForVideo(url : string)
  {
    console.log('CourseLectureContainer onClickPlayForVideo url=' + url);
    if (url && url.startsWith('http'))
    {
      this.onRegisterStudentForVideo(ProposalState.Approved);
      window.open(url, '_blank');
    } else
    {
      reactAlert({ title: '알림', message: '잘못 된 URL 정보입니다.' });
      console.warn('[UserFront] Url is empty.');
    }
  }

  getMediaUrl(media: MediaModel) : string
  {
    let url : string = '';
    // const { personalCube } = this.props.personalCubeService!;

    switch (media.mediaType) {
      case MediaType.ContentsProviderMedia:
        url = media.mediaContents.contentsProvider.url;
        break;
      case MediaType.LinkMedia:
        url = media.mediaContents.linkMediaUrl;
        break;
      case MediaType.InternalMedia:
      case MediaType.InternalMediaUpload:
        url = media.mediaContents.internalMedias.length ? media.mediaContents.internalMedias[0].viewUrl : '';

        if (this.personalCube!.contents.type === CubeType.Video && url)
        {
          url += '&offerviewer=false&showtitle=false&showbrand=false';
        } else if (this.personalCube!.contents.type === CubeType.Audio && url)
        {
          url += '&offerviewer=false&interactivity=none&showtitle=false&showbrand=false';
        }
        break;
    }

    return url;
  }

  getStudentCdo(): StudentCdoModel {
    const {
      member,
    } = this.props;

    console.log('CourseLectureContainer getStudentCdo=' + this.rollBooks[0].id);
    return new StudentCdoModel({
      rollBookId: this.rollBooks.length ? this.rollBooks[0].id : '',
      name: member!.name,
      email: member!.email,
      company: member!.company,
      department: member!.department,
      proposalState: ProposalState.Submitted,
      programLectureUsid: '',
      courseLectureUsid: '',
      leaderEmails: [],
      url: '',
      enClosed: false,
      //enClosed: boardService!.board!.boardConfig!.enClosed,
    });
  }

  async getMainActionForVideo()
  {
    //collegeId
    const { mediaService } = this.props;
    // const { personalCube } = personalCubeService!;

    const { service, contents } = this.personalCube!.contents;
    console.log('CourseLectureContainer getMainActionForVideo service=', service + ', contents=', contents);

    //Video, Audio
    if (service.type  === ContentsServiceType.Media)
    {
      const media = await mediaService!.findMedia(contents.id);

      //통계처리
      // if (media.mediaType === MediaType.InternalMedia) {
      //   const studentCdo = {
      //     ...this.getStudentCdo(),
      //     proposalState: ProposalState.Approved,
      //   };
      //
      //   lectureService.confirmUsageStatisticsByCardId(studentCdo)
      //     .then((confirmed) => {
      //       if (confirmed) {
      //         history.replace('/empty');
      //         setTimeout(() => history.replace(routePaths.lectureCardOverview(collegeId, lectureView.cubeId, lectureView.serviceId)));
      //       }
      //     });
      // }

      const url = this.getMediaUrl(media);

      //외부 영상, CP사 영상
      if (media.mediaType === MediaType.LinkMedia || media.mediaType === MediaType.ContentsProviderMedia)
      {
        return { type: LectureSubInfo.ActionType.LearningStart, onAction: this.onLearningStartForVideo(url) };
      } else {
        return { type: LectureSubInfo.ActionType.Play, onAction: this.onClickPlayForVideo(url) };
      }
    }
    // else if (service.type === ContentsServiceType.Community)
    // {
    //   await boardService!.findBoard(contents.id);
    // }

    return null;
  }

  getLearningState() : SubState | undefined
  {
    //
    const {
      studentService,
    } = this.props;
    // const { personalCube } = personalCubeService!;
    const { student }: StudentService = studentService!;
    const studentJoin = this.getStudentJoin();

    let state: SubState | undefined;

    if (studentJoin)
    {
      if (student.proposalState === ProposalState.Submitted) state = SubState.WaitingForApproval;
      if (student.proposalState === ProposalState.Approved)
      {
        if (!student.learningState) state = SubState.Enrolled;
        if (student.learningState === LearningState.Progress || student.learningState === LearningState.Waiting
          || student.learningState === LearningState.Failed)
        {
          if (student.learningState === LearningState.Waiting)
          {
            state = SubState.Waiting;
          } else state = SubState.InProgress;
        }
        if (student.learningState === LearningState.Passed) state = SubState.Completed;
        if (student.learningState === LearningState.Missed) state = SubState.Missed;
        if (this.personalCube!.contents.type === CubeType.Community) state = SubState.Joined;
      }
      if (student.proposalState === ProposalState.Rejected) state = SubState.Rejected;
    }

    return state;
  }

  render() {
    //
    // const {
    //   className, lectureView, thumbnailImage, action, toggle,
    //   onAction, onViewDetail, onToggle,
    // } = this.props;
    const {
      className, lectureView, thumbnailImage, toggle,
      onViewDetail,
    } = this.props;
    const { open } = this.context;

    const ss = '';//this.getLearningState();

    let cls : string;
    if (ss)
    {
      cls = (ss === SubState.InProgress) ? 'fix bg' : '';
    } else
    {
      cls = 'fix line';
    }

    return (
      <div className={`card-box ${className}`}>

        <Thumbnail image={thumbnailImage} />

        <Title title={lectureView.name} category={lectureView.category}>
          <div className="deatil">
            { lectureView.cubeTypeName && (
              <Field>
                <SubField bold icon={CubeIconType[lectureView.cubeType] || CubeIconType[lectureView.serviceType]} text={lectureView.cubeTypeName} />
                <span className="channel">{lectureView.category.channel.name}</span>
              </Field>
            )}
            <Field>
              <SubField icon="date" text={`등록일 : ${moment(lectureView.creationDate).format('YYYY.MM.DD')}`}>
                {lectureView.learningPeriod && (
                  <span className="ml17">
                    학습기간 :
                    {lectureView.learningPeriod && lectureView.learningPeriod.startDate}
                     ~ {lectureView.learningPeriod && lectureView.learningPeriod.endDate}
                  </span>
                )}
              </SubField>
            </Field>
          </div>
        </Title>

        <Buttons>
          <Button className="fix line" onClick={onViewDetail}>상세보기</Button>
          {
            lectureView.cubeType === CubeType.Video ? <Button className={`${cls}`} onClick={this.getMainActionForVideo}>학습하기</Button> : null
          }
        </Buttons>

        { toggle && (
          <Button
            icon
            className={classNames({
              'img-icon': true,
              'fn-more-toggle': true,
              'card-open': !open,
              'card-close': open,
            })}
            onClick={this.onToggle}
          >
            <Icon className={classNames({ 'arrow-down': !open, 'arrow-up': open  })} />
          </Button>
        )}
      </div>
    );
  }
}


interface FieldProps {
  children: React.ReactNode,
}

const Field = ({ children }: FieldProps) => (
  <div className="item">
    {children}
  </div>
);

export default CourseLectureContainer;
