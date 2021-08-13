import React, { useState, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { reactAlert, mobxHelper } from '@nara.platform/accent';
import {
  BadgeService,
  BadgeStudentService,
  BadgeCardService,
} from '../../../lecture/stores';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import ChallengeStateView from '../view/ChallengeStateView';
import ChallengeSuccessModal from './ChallengeSuccessModal';
import ChallengeCancelModal from './ChallengeCancelModal';
import { getMainCategoryId } from '../../model/Badge';
import IssueCancelModal from '../view/IssueCancelModal';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface BadgeChallengeContainerProps {
  badgeService?: BadgeService;
  badgeCardService?: BadgeCardService;
  badgeStudentService?: BadgeStudentService;
}

function BadgeChallengeContainer({
  badgeService,
  badgeCardService,
  badgeStudentService,
}: BadgeChallengeContainerProps) {
  const { badge } = badgeService!;
  const { badgeCardCount } = badgeCardService!;
  const { badgeStudent, challengeState, passedCardCount } =
    badgeStudentService!;
  const issueStateTime =
    (badgeStudent && badgeStudent.badgeIssueStateModifiedTime) || 0;

  const [challengeSuccessModal, setChallengeSuccessModal] =
    useState<boolean>(false);
  const [challengeCancelModal, setChallengeCancelModal] =
    useState<boolean>(false);
  const [issueCancelModal, setIssueCancelModal] = useState<boolean>(false);

  const onClickChallengeButton = () => {
    if (badge === undefined) {
      return;
    }

    if (badge.forSelectedMember) {
      reactAlert({
        title: '',
        message: getPolyglotText(
          '별도 공지되는 신청 과정을 통해 운영하는 뱃지입니다.<p>해당 자격증을 이미 취득하셨거나, 취득 예정인 분은 <p>담당자에게 연락 주시기 바랍니다.',
          'Certification-도전모달-뱃지안내'
        ),
      });
    } else {
      switch (challengeState) {
        case ChallengeState.WaitForChallenge:
          challengeBadge();
          break;
        case ChallengeState.Challenging:
          setChallengeCancelModal(true);
          break;
        case ChallengeState.ReadyForRequest:
          requestIssue();
          break;
        case ChallengeState.Requested:
          setIssueCancelModal(true);
          break;
      }
    }
  };

  const challengeBadge = async () => {
    if (badge === undefined) {
      return;
    }

    const response = await badgeService!.challengeBadge(badge.id);

    if (response) {
      const refoundBadgeStudent = await badgeStudentService!.findBadgeStudent(
        badge.id
      );

      if (
        badge.issueAutomatically &&
        refoundBadgeStudent &&
        refoundBadgeStudent.badgeIssueState === 'Issued'
      ) {
        setChallengeSuccessModal(true);
      } else {
        reactAlert({
          title: '',
          message: getPolyglotText(
            `{badgeName} Badge 도전이 시작되었습니다.<p>‘도전 중 Badge’ 탭을 통해 Learning Path에 따라 학습해주세요.<p>뱃지 도전관련 문의는 담당자에게 연락 부탁드립니다.`,
            'Certification-도전모달-도전시작',
            {
              badgeName: parsePolyglotString(
                badge.name,
                getDefaultLang(badge.langSupport)
              ),
            }
          ),
        });
      }
    } else {
      reactAlert({
        title: getPolyglotText(
          '도전 실패',
          'Certification-BadgeChallenge-도전실패T'
        ),
        message: getPolyglotText(
          '뱃지 도전 요청을 실패했습니다.',
          'Certification-BadgeChallenge-도전실패M'
        ),
      });
    }
  };

  const requestIssue = async () => {
    if (badge === undefined) {
      return;
    }

    if (badge.issueAutomatically) {
      setChallengeSuccessModal(true);
      return;
    }

    const response = await badgeService!.requestIssue(badge.id);

    if (response) {
      badgeStudentService!.findBadgeStudent(badge.id);
    } else {
      reactAlert({
        title: getPolyglotText(
          '발급요청 실패',
          'Certification-BadgeChallenge-발급요청실패T'
        ),
        message: getPolyglotText(
          '뱃지 발급 요청을 실패했습니다.',
          'Certification-BadgeChallenge-발급요청실패M'
        ),
      });
    }
  };

  const cancelChallengeBadge = async () => {
    if (badge === undefined || badgeStudent === undefined) {
      return;
    }

    const response = await badgeService!.cancelChallengeBadge(badgeStudent.id);

    if (response) {
      badgeStudentService!.findBadgeStudent(badge.id);
    } else {
      reactAlert({
        title: getPolyglotText(
          '도전 취소 실패',
          'Certification-BadgeChallenge-도전취소실패T'
        ),
        message: getPolyglotText(
          '뱃지 도전 취소 요청을 실패했습니다.',
          'Certification-BadgeChallenge-도전취소실패M'
        ),
      });
    }

    setChallengeCancelModal(false);
  };

  const cancelRequestIssue = async () => {
    if (badge === undefined) {
      return;
    }

    const response = await badgeService!.cancelRequestIssue(badge.id);

    if (response) {
      badgeStudentService!.findBadgeStudent(badge.id);
    } else {
      reactAlert({
        title: getPolyglotText(
          '발급요청 취소 실패',
          'Certification-BadgeChallenge-발급요청취소실패T'
        ),
        message: getPolyglotText(
          '뱃지 발급 취소 요청을 실패했습니다.',
          'Certification-BadgeChallenge-발급요청취소실패M'
        ),
      });
    }

    setIssueCancelModal(false);
  };

  const onCloseSuccessModal = useCallback(() => {
    setChallengeSuccessModal(false);
  }, []);

  const onCloseChallengeCancelModal = useCallback(() => {
    setChallengeCancelModal(false);
  }, []);

  const onCloseIssueCancelModal = useCallback(() => {
    setIssueCancelModal(false);
  }, []);

  return (
    <>
      <ChallengeStateView
        challengeState={challengeState}
        passedCardCount={passedCardCount}
        badgeCardCount={badgeCardCount}
        issueStateTime={issueStateTime}
        onClickButton={onClickChallengeButton}
      />
      <ChallengeSuccessModal
        badge={badge}
        categoryId={getMainCategoryId(badge)}
        successModal={challengeSuccessModal}
        onClose={onCloseSuccessModal}
      />
      <ChallengeCancelModal
        cancelModal={challengeCancelModal}
        onClose={onCloseChallengeCancelModal}
        onConfirm={cancelChallengeBadge}
      />
      <IssueCancelModal
        cancelModal={issueCancelModal}
        onClose={onCloseIssueCancelModal}
        onConfirm={cancelRequestIssue}
      />
    </>
  );
}

export default inject(
  mobxHelper.injectFrom(
    'badge.badgeService',
    'badge.badgeCardService',
    'badge.badgeStudentService'
  )
)(observer(BadgeChallengeContainer));
