
import React, {useEffect, useRef, useState} from 'react';
import {inject} from 'mobx-react';
import {mobxHelper} from '@nara.platform/accent';
import {Icon} from 'semantic-ui-react';
import classNames from 'classnames';
import {TRSContainerWrapper} from '../view/BadgeLectureElementView';
import BadgeLectureState from '../../ui/model/BadgeLectureState';
import BadgeLectureStateName from '../../ui/model/BadgeLectureStateName';
import BadgeCubeData from '../model/BadgeCubeData';
import BadgeCourseData from '../model/BadgeCourseData';
import {CoursePlanContentsModel} from '../../../course/model';
import {PersonalCubeModel} from '../../../personalcube/personalcube/model';
import {BadgeDetailService, StudentService} from '../../../lecture/stores';
import CoursePlanService from '../../../course/present/logic/CoursePlanService';
import LectureService from '../../../lecture/shared/present/logic/LectureService';
import {CubeContentsModel} from '../../../personalcube/personalcube/model/CubeContentsModel';
import {LearningState, ProposalState} from '../../../shared/model';
import {StudentModel} from '../../../lecture/model';
import {State as SubState} from '../../../lecture/shared/LectureSubInfo';


enum StateDefault {
  Learning = 'Learning',
  Test = 'Test',
  Report = 'Report',
  Survey = 'Survey',
}

enum StateDefaultName {
  Learning = '학습하기',
  Test = '평가응시',
  Report = '과제제출',
  Survey = '설문참여',
}

interface Props {
  coursePlanService?: CoursePlanService;
  studentService?: StudentService;
  lectureService?: LectureService;

  badgeDetailService?: BadgeDetailService;
  badgeCourse?: BadgeCourseData,
  badgeCourseCube?: BadgeCubeData,
  badgeCube?: BadgeCubeData,
  parentType: string,
  subDepth?: boolean,
}

const TRSContainer: React.FC<Props> = (Props) => {
  //
  const { coursePlanService, studentService, lectureService, badgeDetailService,
    badgeCourse, badgeCourseCube, badgeCube, parentType, subDepth } = Props;

  const { getStudentForVideo, getLectureInfo } = studentService!;

  const [exam, setExam] = useState(false);
  const examTitle = useRef('');
  const examState = useRef('');
  const examStateDesc = useRef('');
  const examRetryCount = useRef(0);

  const [report, setReport] = useState(false);
  const reportFileId = useRef('');
  const reportTitle = useRef('');
  const reportState = useRef('');

  const [survey, setSurvey] = useState(false);
  const surveyTitle = useRef('');
  const surveyState = useRef(false);

  const inProgress = useRef('');
  const isContent = useRef(false);

  const viewObject: any = useRef({});

  /*
  const init = async () => {
    const { personalCubeService, rollBookService, studentService, lectureView, examinationService, examPaperService, surveyFormService } = this.props;

    if (lectureView && lectureView.cubeId) {
      personalCube = lectureView.personalCube;
      rollBooks = lectureView.rollBooks;

      // console.log('init lectureView : ', lectureView);
      // console.log('init personalCube : ', personalCube);
      // console.log('init rollBoo.ks : ', rollBooks[0]);

      if (rollBooks[0]) {
        // studentData = await StudentApi.instance.findStudentByRollBookId(rollBooks[0].id);

        if (personalCube?.contents.examId)
        {
          // const examination = await examinationService!.findExamination(personalCube?.contents.examId);
          // const examPaper = await examPaperService!.findExamPaper(examination.paperId);
          examinationService?.setExamination(lectureView.examination);
          const examPaper = examPaperService?.setExamPaper(lectureView.examPaper);
          if (examPaper) {
            state.examTitle = examPaper.title;
          }
        }

        if (personalCube?.contents.surveyCaseId) {
          // const answerSheetService =  await AnswerSheetApi.instance.findAnswerSheet(personalCube?.contents.surveyCaseId);
          // const surveyCase = await surveyFormService!.findSurveyForm(personalCube?.contents.surveyId);
          const answerSheetService =  lectureView.answerSheet === null ? new AnswerSheetModel() : lectureView.answerSheet;
          const surveyCase = lectureView.surveyForm  === null ? new SurveyFormModel() : lectureView.surveyForm;

          // console.log('surveyCase : ', surveyCase);

          const obj =  JSON.parse(JSON.stringify(surveyCase.titles));
          const title = JSON.parse(JSON.stringify(obj.langStringMap));

          const disabled = answerSheetService && answerSheetService.progress && answerSheetService.progress === AnswerProgress.Complete;
          state.surveyState = disabled;
          state.surveyTitle =  title.ko;
        }

        if (personalCube?.cubeIntro.id)
        {
          // const cubeIntro = await CubeIntroService.instance.findCubeIntro(personalCube?.cubeIntro.id);
          const cubeIntro = lectureView.cubeIntro;
          if (cubeIntro?.reportFileBox.fileBoxId) {
            state.reportFileId = cubeIntro?.reportFileBox.fileBoxId;
          }
        }

        viewObject = getViewObject();
        setExamState(studentData);
      }
    }
  }
  */

  useEffect(() => {
    if (parentType === 'COURSE') {
      if (subDepth) {
        setCourseCubeTRS(badgeCourseCube!);
      }
      else {
        setCourseTRS(badgeCourse!);
      }
    }
    else {  // CUBE
      setCubeTRS(badgeCube!);
    }
  },[]);

  const setCourseTRS = (course: BadgeCourseData) => {
    if (!coursePlanService || !coursePlanService.coursePlanContents) {
      return;
    }

    const contents: CoursePlanContentsModel = coursePlanService!.coursePlanContents;
    if (contents.testId && contents.testId.length > 0) {
      setExam(true);
      examTitle.current = contents.examTitle;
      examState.current = StateDefault.Test;
      setExamState(studentService!.student);
    }
    if (contents.fileBoxId && contents.fileBoxId.length > 0) {
      setReport(true);
      reportTitle.current = course.name;
      reportState.current = StateDefault.Report;
    }
    if (contents.surveyId && contents.surveyId.length > 0) {
      setSurvey(true);
      surveyTitle.current = contents.surveyTitle;
      //surveyState.current = StateDefault.Survey;
    }
  };

  const setCourseCubeTRS = (cube: BadgeCubeData) => {
    if (!cube || !cube.personalCube || !cube.personalCube.contents) {
      return;
    }

    const cubeContents: CubeContentsModel = cube.personalCube.contents;

    if (cubeContents.examId && cubeContents.examId.length > 0) {
      setExam(true);
      examTitle.current = cube.examPaper === null ? '' : cube.examPaper.title;
      examState.current = StateDefault.Test;
      setExamState(studentService!.student);
    }
    
    viewObject.current = getViewObject(cube);
    
    if (cubeContents.fileBoxId && cubeContents.fileBoxId.length > 0) {
      setReport(true);
      reportTitle.current = cube.personalCube.contents.examTitle;
      reportState.current = StateDefault.Report;
    }
    if (cubeContents.surveyId && cubeContents.surveyId.length > 0) {
      setSurvey(true);
      surveyTitle.current = cube.name;
      //surveyState.current = StateDefault.Survey;
    }
  };

  const setCubeTRS = (cube: BadgeCubeData) => {
    badgeDetailService!.findPersonalCube(cube.cubeId)
      .then((response: PersonalCubeModel) => {
        if (response) {
          if (response.contents.examId && response.contents.examId.length > 0) {
            setExam(true);
            examTitle.current = response.contents.examTitle;
            examState.current = StateDefault.Test;
            setExamState(studentService!.student);
          }
          if (response.contents.fileBoxId && response.contents.fileBoxId.length > 0) {
            setReport(true);
            reportTitle.current = response.contents.examTitle;
            reportState.current = StateDefault.Report;
          }
          if (response.contents.surveyId && response.contents.surveyId.length > 0) {
            setSurvey(true);
            surveyTitle.current = cube.name;
            //surveyState.current = StateDefault.Survey;
          }
        }
      });
  };

  // TRS 상태 및 이벤트 - onClick 이벤트 필요
  const setTRSState = (type: string, state: string) => {
    //
    const styleName = ( state === BadgeLectureState.Passed || state === BadgeLectureState.Missed ) ? 'completed' : 'black';

    return (
      <>
        {/*대기중 or 진행 중*/}
        { (state === null || state === BadgeLectureState.Progress) ? (
          <a href="#" className={classNames('btn-play', styleName)}>
            <span className="text">{StateDefaultName[type as StateDefault]}</span>
            <Icon className={`play-${styleName}24`} />
          </a>
        ) : (
          <span className={classNames('btn-play', (state === BadgeLectureState.Passed) ? 'completed' : '')}>
            <span className={classNames('text', (state === BadgeLectureState.Waiting) ? 'no-link' : '')}>{BadgeLectureStateName[state as BadgeLectureState]}</span>
            <Icon className={`play-${styleName}24-dim`}/>
          </span>
        )}
      </>
    );
  };

  const setExamState = (studentData: StudentModel) => {
    //
    if (studentData && studentData.learningState) {
      examState.current = studentData.learningState;
      examRetryCount.current = studentData.studentScore.numberOfTrials;
    }

    examState.current = studentData.learningState ? studentData.learningState : '';
    examRetryCount.current = studentData.studentScore.numberOfTrials;

    if (studentData.serviceType || studentData.serviceType === 'Lecture') {
      if (studentData.learningState === LearningState.Progress ||
        studentData.learningState === LearningState.HomeworkWaiting) {
        examStateDesc.current = 'Test';
      } else if (studentData.learningState === LearningState.Failed && studentData.studentScore.numberOfTrials < 3) {
        examStateDesc.current = '재응시';
      } else if (studentData.learningState === LearningState.Failed && studentData.studentScore.numberOfTrials > 2) {
        examStateDesc.current = '재응시';
      } else if (studentData.learningState === LearningState.Missed) {
        examStateDesc.current = '재응시';
      } else if (studentData.learningState === LearningState.Passed) {
        examStateDesc.current = '이수';
      } else if (studentData.learningState === LearningState.TestPassed) {
        examStateDesc.current = '결과대기';
      } else {
        examStateDesc.current = 'Test';
      }
    }
    else if (studentData.serviceType === 'Course') {
      if (
        studentData.phaseCount === studentData.completePhaseCount
        && (studentData.learningState === LearningState.Progress
        || studentData.learningState === LearningState.HomeworkWaiting)
      ) {
        examStateDesc.current = 'Test';
      } else if (
        studentData.phaseCount === studentData.completePhaseCount
        && (studentData.learningState === LearningState.Failed && studentData.studentScore.numberOfTrials < 3)
      ) {
        examStateDesc.current = '재응시';
      } else if (
        studentData.phaseCount === studentData.completePhaseCount
        && (studentData.learningState === LearningState.Failed && studentData.studentScore.numberOfTrials > 2)
      ) {
        examStateDesc.current = '재응시';
      } else if (studentData.learningState === LearningState.Missed) {
        examStateDesc.current = '재응시';
      } else if (studentData.learningState === LearningState.Passed) {
        examStateDesc.current = '이수';
      } else if (studentData.learningState === LearningState.TestPassed) {
        examStateDesc.current = '결과대기';
      } else {
        examStateDesc.current = 'Test';
      }
    }
  };

  const getViewObject = (cube: BadgeCubeData) => {
    //
    const personalCube: PersonalCubeModel | null = cube.personalCube;
    const studentData: StudentModel = studentService!.student;
    
    // this.state.isContent = false;

    let vo_state: string | undefined;
    let vo_examId: string = '';
    let vo_examTitle: string = '';
    let vo_surveyId: string = '';
    let vo_surveyTitle: string = '';
    let vo_surveyState: boolean = false;
    let vo_surveyCaseId: string = '';
    let vo_reportFileBoxId: string = '';

    vo_state = inProgress.current || undefined;
    vo_examId = personalCube?.contents.examId || '';
    vo_examTitle = examTitle.current || '';
    vo_surveyId = personalCube?.contents.surveyId || '';
    vo_surveyTitle = surveyTitle.current || '';
    vo_surveyState = surveyState.current || false;
    vo_surveyCaseId = personalCube?.contents.surveyCaseId || '';
    vo_reportFileBoxId = reportFileId.current || '';
    
    isContent.current = true;

    if (personalCube && studentData  && studentData.id) {
      if (studentData.proposalState === ProposalState.Approved) {
        if (
          studentData.learningState === LearningState.Waiting || studentData.learningState === LearningState.HomeworkWaiting
          || studentData.learningState === LearningState.TestWaiting
          || studentData.learningState === LearningState.TestPassed || studentData.learningState === LearningState.Failed
        ) {
          vo_state = SubState.InProgress;
        }
        if (studentData.learningState === LearningState.Progress) vo_state = SubState.InProgress;
        if (studentData.learningState === LearningState.Passed) vo_state = SubState.InProgress;
        if (studentData.learningState === LearningState.Missed) vo_state = SubState.InProgress;
        // if (studentData.learningState === LearningState.Passed) state = SubState.Completed;
        // if (studentData.learningState === LearningState.Missed) state = SubState.Missed;
      }

      if (!vo_examId && studentData.phaseCount !== studentData.completePhaseCount &&
        studentData.learningState === LearningState.Progress) {
        vo_state = SubState.InProgress;
      }
    }

    return {
      // Sub info
      vo_state,
      vo_examId,
      // Fields
      vo_examTitle,
      vo_surveyId,
      vo_surveyTitle,
      vo_surveyState,
      vo_surveyCaseId,
      vo_reportFileBoxId,
    };
  };

  return (
    <>
      {exam ?
        <TRSContainerWrapper parentType={parentType} subDepth={subDepth}>
          <div className="category">
            <Icon className={classNames(`icon-test24`)}/>
            <span>Test</span>
          </div>
          <div className="tit">
            <a href="#" className="ellipsis">{examTitle.current}</a>
          </div>
          <div className="right">
            {setTRSState('test', examState.current)}
          </div>
        </TRSContainerWrapper>
        :
        null
      }
      {report ?
        <TRSContainerWrapper parentType={parentType} subDepth={subDepth}>
          <div className="category">
            <Icon className={classNames(`icon-report24`)}/>
            <span>Report</span>
          </div>
          <div className="tit">
            <a href="#" className="ellipsis">{reportTitle.current}</a>
          </div>
          <div className="right">
            {setTRSState('report', reportState.current)}
          </div>
        </TRSContainerWrapper>
        :
        null
      }
      {survey ?
        <TRSContainerWrapper parentType={parentType} subDepth={subDepth}>
          <div className="category">
            <Icon className={classNames(`icon-survey24`)}/>
            <span>Survey</span>
          </div>
          <div className="tit">
            <a href="#" className="ellipsis">{surveyTitle.current}</a>
          </div>
          <div className="right">
            {setTRSState('survey', surveyState.current ? '' : '')}
          </div>
        </TRSContainerWrapper>
        :
        null
      }
    </>
  );
};

export default inject(mobxHelper.injectFrom(
  'course.coursePlanService',
  'lecture.studentService',
  'lecture.lectureService',
  'badgeDetail.badgeDetailService',
))(TRSContainer);
