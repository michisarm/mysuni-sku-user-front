import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import LectureFile from '../../../viewModel/LectureOverview/LectureFile';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';
import LectureDescriptionView from './LectureDescriptionView';
import LectureFileView from './LectureFileView';
import LectureSubcategoryView from './LectureCubeSubcategoryView';
import LectureTagsView from './LectureTagsView';
import LectureCubeInfoView from './LectureCubeInfoView';
import LectureCommentContainer from '../../logic/LectureCommentContainer';
import LectureComment from '../../../viewModel/LectureComment/LectureComment';
import LectureClassroom from '../../../viewModel/LectureClassroom';
import LectureClassroomView from './LectureClassroomView';
import './LectureCubeContentView.css';
import LectureCubeTranscriptContainer from '../../logic/LectureCubeTranscriptContainer';
import TranscriptCountModel from '../../../model/TranscriptCountModel';
import LectureCubeSummary from '../../../viewModel/LectureOverview/LectureCubeSummary';
import { requestLectureCardInstructor } from '../../../service/useLectureInstructor/utility/requestLectureCardInstructor';
import { Action, Area } from 'tracker/model';
import { useLectureInstructor } from '../../../store/LectureOverviewStore';
import { LectureClassroomInstructorView } from './LectureClassroomInstructorView';
import { findCommunityProfile } from '../../../../../community/api/profileApi';
import CommunityProfileModal from '../../../../../community/ui/view/CommunityProfileModal';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { SkProfileService } from '../../../../../profile/stores';

interface Params {
  cardId: string;
}
interface LectureCubeContentViewProps {
  lectureDescription?: LectureDescription;
  lectureSubcategory?: LectureSubcategory;
  lectureTags?: LectureTags;
  lectureFile?: LectureFile;
  lectureComment?: LectureComment;
  lectureClassroom?: LectureClassroom;
  lectureTranscriptCount?: TranscriptCountModel;
  lectureSummary?: LectureCubeSummary;
}

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}

function hashLink(hash: string) {
  const element = document.getElementById(hash);
  if (element !== null) {
    element.scrollIntoView();
  }
}

const LectureCubeContentView: React.FC<LectureCubeContentViewProps> =
  function LectureCubeContentView({
    lectureDescription,
    lectureSubcategory,
    lectureTags,
    lectureFile,
    lectureComment,
    lectureClassroom,
    lectureTranscriptCount,
    lectureSummary,
  }) {
    const params = useParams<Params>();
    const [fixed, setFixed] = useState<boolean>(false);
    const lectureInstructor = useLectureInstructor();
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const [profileInfo, setProfileInfo] = useState<profileParams>();

    useEffect(() => {
      requestLectureCardInstructor(params.cardId);
    }, [params.cardId]);

    const [activatedTab, setActivatedTab] = useState<string>('overview');

    useEffect(() => {
      setActivatedTab('overview');
    }, [lectureSummary]);

    const overviewHashClick = useCallback(() => {
      hashLink('lms-overview');
      setActivatedTab('overview');
    }, []);
    const classroomHashClick = useCallback(() => {
      hashLink('lms-classroom');
      setActivatedTab('classroom');
    }, []);
    const commentHashClick = useCallback(() => {
      setActivatedTab('comment');
    }, []);
    const transcriptHashClick = useCallback(() => {
      setActivatedTab('transcript');
    }, []);

    // const trascriptScrollMove = () => {
    //   window.scrollTo(0, 800);
    // };

    // 대본 관련 Props 세팅
    const [transLangVal, setTransLangVal] = useState<string>(() => {
      if (SkProfileService.instance.skProfile.language === 'English') {
        return 'en';
      }
      if (SkProfileService.instance.skProfile.language === 'Chinese') {
        return 'cn';
      }
      return 'ko';
    });

    // const [ deliveryId, setDeliveryId ] = useState<string>('');

    // useEffect(() => {
    //   setDeliveryId(getlectureTranscriptCounts() ? getlectureTranscriptCounts);
    // }, [getlectureTranscriptCounts()]);

    //  스티키 적용 시 필요한 코드
    useEffect(() => {
      if (activatedTab === 'comment') {
        setTimeout(() => {
          const element = document.getElementById('lms-overview');
          if (element !== null) {
            element.scrollIntoView();
          }
        }, 0);
      }
    }, [activatedTab]);

    return (
      <>
        <div
          className={`lms-sticky-menu ${fixed ? 'lms-fixed' : ''}`}
          id="lms-overview"
        >
          <div className="lms-fixed-inner">
            <a
              onClick={overviewHashClick}
              className={activatedTab === 'overview' ? 'lms-act' : ''}
              data-area={Area.CUBE_TAB}
              data-action={Action.CLICK}
              data-action-name="CUBE TAB 클릭::Overview"
            >
              <PolyglotText
                defaultString="Overview"
                id="cube-ContentsTap-Overview"
              />
            </a>
            {lectureClassroom && (
              <a
                onClick={classroomHashClick}
                className={activatedTab === 'classroom' ? 'lms-act' : ''}
                data-area={Area.CUBE_TAB}
                data-action={Action.CLICK}
                data-action-name="CUBE TAB 클릭::차수정보"
              >
                <PolyglotText
                  defaultString="차수정보"
                  id="cube-ContentsTap-차수정보"
                />
              </a>
            )}
            {lectureTranscriptCount !== undefined &&
              lectureTranscriptCount.transcriptCount > 0 && (
                <a
                  onClick={transcriptHashClick}
                  className={activatedTab === 'transcript' ? 'lms-act' : ''}
                  data-area={Area.CUBE_TAB}
                  data-action={Action.CLICK}
                  data-action-name="CUBE TAB 클릭::Transcript"
                >
                  <PolyglotText
                    defaultString="Transcript"
                    id="cube-ContentsTap-Transcript"
                  />
                </a>
              )}
            <a
              onClick={commentHashClick}
              className={
                activatedTab === 'comment'
                  ? 'lms-comment lms-act'
                  : 'lms-comment'
              }
              data-area={Area.CUBE_TAB}
              data-action={Action.CLICK}
              data-action-name="CUBE TAB 클릭::Comments"
            >
              <i className="lms-comment-icon" />
              <PolyglotText
                defaultString="Comments"
                id="cube-ContentsTap-Comments"
              />
              <span className="count">
                {lectureComment !== undefined
                  ? `+${lectureComment.commentsCount}`
                  : ''}
              </span>
            </a>
          </div>
        </div>
        {(activatedTab === 'overview' || activatedTab === 'classroom') && (
          <>
            {lectureDescription && (
              <LectureDescriptionView
                htmlContent={lectureDescription.description}
              />
            )}
            <div className="badge-detail border-none">
              {lectureSubcategory && (
                <LectureSubcategoryView
                  lectureSubcategory={lectureSubcategory}
                />
              )}
              {lectureFile && <LectureFileView lectureFile={lectureFile} />}
              {lectureDescription && (
                <LectureCubeInfoView lectureDescription={lectureDescription} />
              )}
              {lectureTags && <LectureTagsView lectureTags={lectureTags} />}
              {lectureInstructor?.instructors &&
                lectureInstructor.instructors.length > 0 && (
                  <LectureClassroomInstructorView
                    lectureInstructor={lectureInstructor}
                  />
                )}
            </div>
            {lectureClassroom && (
              <LectureClassroomView lectureClassroom={lectureClassroom} />
            )}
          </>
        )}
        {activatedTab === 'comment' && <LectureCommentContainer />}
        {activatedTab === 'transcript' && (
          <LectureCubeTranscriptContainer
            transLangVal={transLangVal}
            setTransLangVal={setTransLangVal}
            lectureSummary={lectureSummary}
            // trascriptScrollMove={trascriptScrollMove}
          />
        )}
      </>
    );
  };

export default LectureCubeContentView;
