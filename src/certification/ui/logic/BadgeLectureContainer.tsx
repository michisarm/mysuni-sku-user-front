import React, {useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { mobxHelper } from '@nara.platform/accent';

import LectureLearningModalView from '../../../lecture/category/ui/view/LectureOverviewViewV2';
import { AnswerSheetModal, CubeReportModal } from '../../../assistant';
import { AnswerSheetModal as SurveyAnswerSheetModal } from '../../../survey';
import { LectureExam2 } from '../../../lecture/shared/LectureExam';
import { LectureServiceType, LectureViewModel } from '../../../lecture/model';
import SkProfileService from '../../../profile/present/logic/SkProfileService';
import {
  CourseLectureService,
  LectureService,
  ProgramLectureService,
} from '../../../lecture/stores';
import { CoursePlanService } from '../../../course/stores';
import { Lecture2 } from '../../../lecture/shared/Lecture';

import BadgeDetailService from '../../present/logic/BadgeDetailService';
import BadgeCompData from '../model/BadgeCompData';
import BadgeCompModel from '../model/BadgeCompModel';

interface Props extends RouteComponentProps<{ badgeId: string }> {
  //
  badgeDetailService?: BadgeDetailService;

  badgeId: string;

  // viewObject: any,
  // typeViewObject: any,
  // onSaveCallback:() => void,
  // skProfileService?: SkProfileService,
  // lectureService?: LectureService,
  // programLectureService?: ProgramLectureService,
  // courseLectureService:  CourseLectureService,
  // coursePlanService?: CoursePlanService,
  // lectureCardId : string,
  // onRefreshLearningState?: () => void,
  // onPageRefresh?:() => void,
}

const BadgeLectureContainer: React.FC<Props> = (Props) => {
  //
  const { badgeDetailService, badgeId, } = Props;

  const [badgeCompList, setBadgeCompList] = useState<BadgeCompData[]>([]);

  // const { viewObject, typeViewObject, onSaveCallback, skProfileService, lectureService, lectureCardId,
  //   match, onRefreshLearningState, courseLectureService, } = Props;

  // const { params } = match;
  // const { skProfile } = skProfileService!;
  // const { member } = skProfile;
  // const { lectureViews, getSubLectureViews } = lectureService!;
  // const { preLectureViews } = courseLectureService;

  useEffect(() => {
    // 배지 구성 학습 리스트 조회하기
    getBadgeCompLectures(badgeId);
  }, []);

  // 뱃지 구성 학습 리스트 조회하기
  const getBadgeCompLectures = (badgeId: string) => {
    let compList: BadgeCompData[] = [];
    badgeDetailService!.findBadgeCompList(badgeId).then((response: BadgeCompModel[]) => {
      if (response.length > 0) {
        response.map((data: BadgeCompModel) => {
          const compData = new BadgeCompData();
          // 공통
          compData.id = data.id;
          compData.patronKeyString = data.patronKey.keyString;
          compData.name = data.name;
          // 코스정보
          if (data.serviceType === 'COURSE') {
            // 코스정보 생성
            compData.coursePlanId = data.coursePlanId;
            compData.cubeCount = data.lectureCardUsids.length;
            data.lectureCardUsids.map((id: string) => {
              compData.lectureCardIds = compData.lectureCardIds.concat(id);
            });
          }
          // (학습)카드정보
          else {
            compData.cubeId = data.cubeId;
            compData.learningCardId = data.learningCardId;
            compData.cubeType = data.cubeType;
            compData.learningTime = data.learningTime; // 학습시간(분)
            compData.sumViewSeconds = data.sumViewSeconds; // 진행율(%)
            compData.learningState = data.learningState;
          }
          compList = compList.concat(compData);
        });
      }
      setBadgeCompList(compList);
    });
  };

  return (
    <div className="course-cont">
      {badgeCompList.length > 0 ? (
        <div>학습정보 표시</div>
      ) : (
        <div>학습정보가 존재하지 않습니다.</div>
      )}
    </div>
    /*
        <div>
          <>
            <Lecture2.Group
              type={Lecture2.GroupType.Course}
              totalCourseCount={viewObject.totalCourseCount}
            >
              {lectureViews.map((lecture: LectureViewModel, lectureViewsIndex: number) => (
                <Lecture2.CourseSection
                  key={`course-${lectureViewsIndex}`}
                  lecture={(
                    <Lecture2.Course
                      className="first"
                      lectureView={lecture}
                      lectureViewSize={(getSubLectureViews(lecture.id).length + 1)}
                      lectureViewName={(lectureViewsIndex+1)+'. '+lecture.name}
                      thumbnailImage={lecture.baseUrl || undefined}
                      toggle={lecture.serviceType === LectureServiceType.Program || lecture.serviceType === LectureServiceType.Course}
                      onViewDetail={() => onViewDetail(lecture)}
                      collegeId={params.collegeId}
                      lectureCardId={lectureCardId}
                      learningState={viewObject.state}
                      member={member}
                      onRefreshLearningState={onRefreshLearningState}
                      onDoLearn={onDoLearn}
                    />
                  )}
                >
                  {getSubLectureViews(lecture.id).map((subLecture, index) =>
                    <Lecture2.Course
                      key={`sub-lecture-${index}`}
                      className="included"
                      lectureView={subLecture}
                      lectureViewName={(lectureViewsIndex+1)+'. '+(index+1)+'. '+subLecture.name}
                      thumbnailImage={subLecture.baseUrl || undefined}
                      onViewDetail={() => onViewDetail(subLecture)}
                      collegeId={params.collegeId}
                      lectureCardId={lectureCardId}
                      member={member}
                      onRefreshLearningState={onRefreshLearningState}
                      onDoLearn={onDoLearn}
                    />
                  )}
                </Lecture2.CourseSection>
              ))}
            </Lecture2.Group>
            {
              openLearnModal && (
                <LectureLearningModalView
                  ref={lectureLearningModal => lectureLearningModal = lectureLearningModal }
                  videoUrl={learningVideoUrl}
                  onClose={onLearningModalClose}
                />
              )
            }
          </>
          {
            viewObject && viewObject.examId && (
              <AnswerSheetModal
                examId={viewObject.examId}
                ref={examModal => examModal = examModal}
                onSaveCallback={onSaveCallback}
              />
            )
          }
          <CubeReportModal
            downloadFileBoxId ={viewObject.reportFileBoxId}
            ref={reportModal => reportModal = reportModal}
            downloadReport = {onClickDownloadReport}
            rollBookId={viewObject.rollBookId}
          />
          {
            viewObject && viewObject.surveyId && (
              <SurveyAnswerSheetModal
                surveyId={viewObject.surveyId}
                surveyCaseId={viewObject.surveyCaseId}
                ref={surveyModal => surveyModal = surveyModal}
                // onSaveCallback={testCallback}
              />
            )
          }
          {
            viewObject && (
              <LectureExam2
                onReport={viewObject.reportFileBoxId ? onReport : undefined}
                onReportNotReady={viewObject.reportFileBoxId ? onReportNotReady : undefined}
                onTest={viewObject.examId ? onTest : undefined}
                onTestNotReady={viewObject.examId ? onTestNotReady : undefined}
                onSurvey={viewObject.surveyId ? onSurvey : undefined}
                OnSurveyNotReady={viewObject.examId ? OnSurveyNotReady : undefined}
                viewObject={viewObject}
                passedState={viewObject.passedState}
                type={viewObject.examType}
                name={viewObject.examName}
                sort="box"
              />
            )
          }
        </div>
        :
        <div>학습정보가 존재하지 않습니다.</div>
      }
    </div>
    */
  );
};

export default inject(mobxHelper.injectFrom('badgeDetail.badgeDetailService'))(
  withRouter(observer(BadgeLectureContainer))
);
