import React, { useCallback } from 'react';
import LectureState from '../../viewModel/LectureState';

interface LectureStateViewProps {
  lectureState: LectureState;
}

interface LectureStateViewInnerState {
  canAction: boolean;
  actionText: string;
  action?: () => void;
  stateText: string;
  subStateVisible: boolean;
  subStateText: string;
}

function parseProps({
  lectureState,
}: {
  lectureState: LectureState;
}): LectureStateViewInnerState | void {
  let canAction: boolean = true;
  if (
    (lectureState.type === 'WebPage' ||
      lectureState.type === 'ClassRoomLecture') &&
    lectureState.proposalState !== 'Approved'
  ) {
    canAction = false;
  }

  // let actionText = '학습하기';
}

const LectureStateView: React.FC<LectureStateViewProps> = function LectureStateView(
  lectureState
) {
  const returnA = useCallback(() => 'a', []);

  return (
    <>
      <button
        className="ui button free bg p18"
        onClick={() => console.log(returnA())}
      >
        학습하기
      </button>
      <button className="ui button free line p18">학습중</button>
    </>
  );
};

export default LectureStateView;

/**
 *   
 * getMainAction() {
    const { cubeType, typeViewObject, studentJoins, viewObject } = this.props;
    const applyingPeriod = typeViewObject!.applyingPeriod;
    const today = new Date();

    switch (cubeType) {
      case CubeType.ClassRoomLecture:
      case CubeType.ELearning:
        if (typeViewObject.siteUrl) {
          return {
            type: LectureSubInfo.ActionType.LearningStart,
            onAction: () => {
              if (
                !studentJoins ||
                !studentJoins.length ||
                !studentJoins.filter(
                  join =>
                    join.proposalState !== ProposalState.Canceled &&
                    join.proposalState !== ProposalState.Rejected
                ).length
              ) {
                this.onRegisterStudent(ProposalState.Approved);
              }
              if (typeViewObject.siteUrl.startsWith('http')) {
                window.open(typeViewObject.siteUrl, '_blank');
              } else {
                reactAlert({
                  title: '알림',
                  message: '잘못 된 URL 정보입니다.',
                });
              }
            },
          };
        }
        const classroomAvailable: boolean =
          typeViewObject.classrooms && typeViewObject.classrooms.length;
        const hasAvailStudentJoins: boolean =
          !studentJoins ||
          !studentJoins.length ||
          !studentJoins.filter(
            join =>
              join.proposalState !== ProposalState.Canceled &&
              join.proposalState !== ProposalState.Rejected
          ).length;
        if (
          classroomAvailable &&
          typeViewObject.classrooms.length > 1 &&
          hasAvailStudentJoins
        ) {
          return {
            type: LectureSubInfo.ActionType.Enrollment,
            onAction: this.onClickChangeSeries,
          };
        } else {
          if (
            studentJoins &&
            studentJoins.length &&
            studentJoins.filter(
              join =>
                join.proposalState !== ProposalState.Canceled &&
                join.proposalState !== ProposalState.Rejected
            ).length
          ) {
            return undefined;
          }
          if (!applyingPeriod) {
            return {
              type: LectureSubInfo.ActionType.Enrollment,
              onAction: () =>
                reactAlert({
                  title: '수강신청 기간 안내',
                  message: '수강신청 기간이 아닙니다.',
                }),
            };
          }
          const {
            year: startYear,
            month: startMonth,
            date: startDate,
          } = getYearMonthDateHourMinuteSecond(applyingPeriod!.startDateSub)!;
          const {
            year: endYear,
            month: endMonth,
            date: endDate,
          } = getYearMonthDateHourMinuteSecond(applyingPeriod!.endDateSub)!;
          if (
            new Date(startYear, startMonth, startDate, 0, 0, 0).getTime() >
              today.getTime() ||
            new Date(endYear, endMonth, endDate, 23, 59, 59).getTime() <
              today.getTime()
          ) {
            return {
              type: LectureSubInfo.ActionType.Enrollment,
              onAction: () =>
                reactAlert({
                  title: '수강신청 기간 안내',
                  message: '수강신청 기간이 아닙니다.',
                }),
            };
          }
          return {
            type: LectureSubInfo.ActionType.Enrollment,
            onAction: this.onClickEnrollment,
          };
        }
      case CubeType.Audio:
      case CubeType.Video:
        if (
          typeViewObject.mediaType === MediaType.LinkMedia ||
          typeViewObject.mediaType === MediaType.ContentsProviderMedia
        ) {
          return {
            type: LectureSubInfo.ActionType.LearningStart,
            onAction: this.onOpenStart,
          };
        } else {
          return {
            type: LectureSubInfo.ActionType.Play,
            onAction: this.onClickPlay,
          };
        }
      case CubeType.WebPage:
      case CubeType.Experiential:
        return {
          type: LectureSubInfo.ActionType.LearningStart,
          onAction: this.onOpenStart,
        };
      case CubeType.Documents:
        return {
          type: LectureSubInfo.ActionType.Download,
          onAction: this.onDownload,
        };
      case CubeType.Community:
        if (
          studentJoins &&
          studentJoins.length &&
          studentJoins.filter(
            join =>
              join.proposalState !== ProposalState.Canceled &&
              join.proposalState !== ProposalState.Rejected
          ).length
        ) {
          return undefined;
        }
        return { type: LectureSubInfo.ActionType.Join, onAction: this.onJoin };
      default:
        return undefined;
    }
  }

 */
