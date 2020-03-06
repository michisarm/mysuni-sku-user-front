
import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import classNames from 'classnames';
import moment from 'moment';
import { Icon, Button } from 'semantic-ui-react';

import { ProposalState, LearningState } from 'shared/model';
import { EmployeeModel } from 'profile/model';
import { PersonalCubeModel, CubeType, ContentsServiceType } from 'personalcube/personalcube/model';
import { MediaModel, MediaType } from 'personalcube/media/model';
import { PersonalCubeService } from 'personalcube/personalcube/stores';
import { MediaService } from 'personalcube/media/stores';
import { BoardService } from 'personalcube/community/stores';

import { LectureViewModel, StudentModel, RollBookModel, StudentCdoModel } from '../../../../model';
import LectureSubInfo, { State as SubState } from '../../../LectureSubInfo';

import StudentService from '../../../present/logic/StudentService';
import RollBookService from '../../../present/logic/RollBookService';
import {
  Title, SubField, Buttons, Thumbnail,
} from '../../../ui/view/LectureElementsView';

import Action from '../../model/Action';
import { CubeIconType } from '../../model';
import { CourseSectionContext } from '../CourseSection';


interface Props {
  rollBookService?: RollBookService,
  boardService: BoardService,
  personalCubeService?: PersonalCubeService,
  studentService?: StudentService,
  mediaService?: MediaService,
  collegeId?: string,
  lectureView: LectureViewModel,
  className?: string,
  thumbnailImage?: string,
  action?: Action,
  toggle?: boolean,
  open?: boolean,
  onAction?: () => void,
  onViewDetail?: (e: any) => void,
  onToggle?: () => void,
  onRefreshLearningState?: () => void,
  student?: StudentModel,
  lectureCardId?: string,
  member? : EmployeeModel
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
  'personalCube.mediaService'
))
@reactAutobind
@observer
class CourseLectureContainer extends Component<Props, State> {
  //

  static contextType = CourseSectionContext;

  static defaultProps = {
    thumbnailImage: null,
    action: null,
    toggle: false,
    open: false,
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


  personalCube: PersonalCubeModel | null = {} as PersonalCubeModel;
  classNameForLearningState: string  = '';
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

  // componentDidMount()
  // {
  //   //
  //
  // }

  async init()
  {
    const { personalCubeService, rollBookService, studentService, lectureView } = this.props;
    const { getStudentForVideo } = studentService!;

    this.personalCube = await personalCubeService!.findPersonalCube(lectureView.cubeId);
    this.rollBooks = await rollBookService!.findAllLecturesByLectureCardId(lectureView.serviceId);

    getStudentForVideo(lectureView.serviceId).then((studentForVideo) =>
    {
      this.studentForVideoObj = studentForVideo;
      const classNameForLearningStateTemp = this.setClassNameForLearningState(this.studentForVideoObj);
      this.setState({ classNameForLearningState: classNameForLearningStateTemp });
    });

    // this.studentForVideoObj = await getStudentForVideo(lectureView.serviceId);
    // this.classNameForLearningState = this.setClassNameForLearningState(this.studentForVideoObj);
  }

  setClassNameForLearningState(studentForVideo: StudentModel)
  {
    let classNameForLearningState: string = 'fix line' || 'fix bg';

    const { lectureView } = this.props;

    if (studentForVideo)
    {
      let state: SubState = SubState.Waiting;

      if (studentForVideo && studentForVideo.id) {
        if (studentForVideo.proposalState === ProposalState.Approved) {
          if (
            studentForVideo.learningState === LearningState.Waiting || studentForVideo.learningState === LearningState.HomeworkWaiting
            || studentForVideo.learningState === LearningState.TestWaiting
            || studentForVideo.learningState === LearningState.TestPassed || studentForVideo.learningState === LearningState.Failed
          ) {
            state = SubState.Waiting;
          }
          if (studentForVideo.learningState === LearningState.Progress) state = SubState.InProgress;
          if (studentForVideo.learningState === LearningState.Passed) state = SubState.Completed;
          if (studentForVideo.learningState === LearningState.Missed) state = SubState.Missed;
        }
      }

      classNameForLearningState = (state === SubState.InProgress) ? 'fix bg' : 'fix line';

      console.log('CourseLectureContainer setClassNameForLearningState() lectureView.name=', lectureView.name, ', rollBooks=', this.rollBooks, ', studentForVideo=', studentForVideo, ', classNameForLearningState=', classNameForLearningState);
      // this.classNameForLearningState = classNameForLearningState;
    }

    return classNameForLearningState;
  }

  onToggle() {
    //
    const { open, setOpen } = this.context;

    setOpen(!open);
  }

  registerStudentForVideo(studentCdo: StudentCdoModel)
  {
    //
    const { studentService, lectureView, onRefreshLearningState } = this.props;
    const { getStudentForVideo } = studentService!;
    console.log('CourseLectureContainer registerStudentForVideo lectureView.name=', lectureView.name, ', lectureCardId=' + lectureView.serviceId, ', studentCdo=', studentCdo);

    //학습하기 시 출석부에 학생등록 처리 후 Lecture Card의 학습상태를 갱신함.
    return studentService!.registerStudent(studentCdo).then(() =>
    {
      getStudentForVideo(lectureView.serviceId).then((studentForVideo) =>
      {
        this.studentForVideoObj = studentForVideo;
        const classNameForLearningStateTemp = this.setClassNameForLearningState(this.studentForVideoObj);

        //Course 전체 학습상태 갱신
        onRefreshLearningState!();

        //학습하기한 Lecture Card의 학습하기 버튼 상태 갱신(CSS 변경)
        this.setState({ classNameForLearningState: classNameForLearningStateTemp });
      });

      // studentService!.findStudentForVideo(studentCdo.rollBookId);
      // studentService!.findIsJsonStudentForVideo(lectureView.serviceId);
      // studentService!.findStudentCount(studentCdo.rollBookId);
    });
  }

  async onRegisterStudentForVideo(proposalState?: ProposalState)
  {
    const studentCdo = this.getStudentCdo();

    console.log('CourseLectureContainer onRegisterStudentForVideo studentCdo=', studentCdo);
    console.log('CourseLectureContainer onRegisterStudentForVideo this.studentForVideoObj=', this.studentForVideoObj);

    if ((!this.studentForVideoObj || !this.studentForVideoObj.id) || (this.studentForVideoObj.proposalState !== ProposalState.Canceled
      && this.studentForVideoObj.proposalState !== ProposalState.Rejected))
    {
      this.registerStudentForVideo({ ...studentCdo, proposalState: proposalState || studentCdo.proposalState });
    }
    else if (this.studentForVideoObj.proposalState === ProposalState.Canceled || this.studentForVideoObj.proposalState === ProposalState.Rejected) {
      this.registerStudentForVideo({ ...studentCdo, proposalState: this.studentForVideoObj.proposalState });
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
        // console.log('CourseLectureContainer getMediaUrl media.mediaContents.linkMediaUrl=' + url);
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

      console.log('this.getMediaUrl media=', media);
      const url = this.getMediaUrl(media);

      console.log('this.getMediaUrl url=', url);
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

  render() {
    //
    // const {
    //   className, lectureView, thumbnailImage, action, toggle,
    //   onAction, onViewDetail, onToggle,
    // } = this.props;
    const { classNameForLearningState } = this.state;
    const {
      className, lectureView, thumbnailImage, toggle,
      onViewDetail,
    } = this.props;
    const { open } = this.context;

    //Lecture Card가 Video인 경우만 학습하기 버튼이 보이고, 진행상태인 경우 버튼 css적용(fix bg)
    const className1 = lectureView.cubeType === CubeType.Video ? classNameForLearningState : 'fix line';

    console.log('CourseLectureContainer render() lectureView.name=', lectureView.name, ',lectureView.cubeType=', lectureView.cubeType, ', classNameForLearningState=' + classNameForLearningState, ', className1=', className1);

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
            lectureView.cubeType === CubeType.Video ?
              <Button className={className1} onClick={this.getMainActionForVideo}>학습하기</Button> : null
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
