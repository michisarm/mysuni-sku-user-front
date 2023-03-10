import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Button } from 'semantic-ui-react';
import BadgeService from '../../present/logic/BadgeService';
import IssueStateNameType from '../../shared/Badge/ui/model/IssueStateNameType';
import ChallengeState from '../../shared/Badge/ui/model/ChallengeState';
import { MyBadge } from '../../model/MyBadge';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeView from '../view/BadgeView';
import ChallengeBadgeAlertModal from '../view/ChallengeBadgeAlertModal';
import { findBadgeStudent } from '../../api/BadgeStudentApi';
import { BadgeStudent } from '../../model/BadgeStudent';
import {
  PolyglotText,
  getPolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface BadgeCompLeftProps {
  challengeBadge: MyBadge;
  challengeState: ChallengeState;
  passedCardCount: number;
  badgeCardCount: number;
  issueTime: string;
  onSetBadgeStudent: (next: BadgeStudent) => void;
  badgeService?: BadgeService;
}

function BadgeCompLeft({
  challengeBadge,
  challengeState,
  passedCardCount,
  badgeCardCount,
  issueTime,
  onSetBadgeStudent,
  badgeService,
}: BadgeCompLeftProps) {
  const [alertModal, setAlertModal] = useState(false);

  const onClickRequestIssue = async () => {
    if (!challengeBadge.issueAutomatically) {
      if (passedCardCount !== badgeCardCount) {
        setAlertModal(true);
        return;
      }
    }

    const response = await badgeService!.requestIssue(challengeBadge.id);

    if (response) {
      const badgeStudent = await findBadgeStudent(challengeBadge.id);
      if (badgeStudent !== undefined) {
        onSetBadgeStudent(badgeStudent);
      }
    }
  };

  const onCloseAlertModal = () => {
    setAlertModal(false);
  };

  return (
    <div className="left-area">
      <div className="badge-list-type" style={{ padding: 0! }}>
        <BadgeView
          id={challengeBadge.id}
          name={parsePolyglotString(
            challengeBadge.name,
            getDefaultLang(challengeBadge.langSupport)
          )}
          level={challengeBadge.level}
          iconUrl={challengeBadge.iconUrl}
          categoryId={challengeBadge.categoryId}
          badgeStyle={BadgeStyle.List}
          badgeSize={BadgeSize.Small}
        />
      </div>
      <div className="status">
        {challengeState === ChallengeState.Requested && (
          <span className="status">
            <span className="number">
              <b>{IssueStateNameType.Requested}</b>
            </span>
            <span className="txt mt2">
              {issueTime}
              <PolyglotText
                id="Certification-clls-????????????1"
                defaultString="?????? ??????"
              />
            </span>
          </span>
        )}
        {challengeState !== ChallengeState.Requested &&
          !challengeBadge.issueAutomatically && (
            <>
              <Button className="fix line" onClick={onClickRequestIssue}>
                <PolyglotText
                  id="Certification-clls-????????????2"
                  defaultString="????????????"
                />
              </Button>
              <span className="number">
                <span className="ing-txt">
                  <PolyglotText
                    id="Certification-clls-????????????1"
                    defaultString="?????????"
                  />
                </span>
                <span>
                  <b>{passedCardCount}</b>/{badgeCardCount}
                </span>
              </span>
            </>
          )}
        {challengeState !== ChallengeState.Requested &&
          challengeBadge.issueAutomatically && (
            <>
              <span className="number">
                <span className="ing-txt">
                  <PolyglotText
                    id="Certification-clls-????????????2"
                    defaultString="?????????"
                  />
                </span>
                <span>
                  <b>{passedCardCount}</b>/{badgeCardCount}
                </span>
              </span>
              <span
                className="txt"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `Badge ?????? ?????? ?????? ?????? ???<br />???????????? Badge??? ???????????????.`,
                    'Certification-clls-????????????'
                  ),
                }}
              />
            </>
          )}
        <ChallengeBadgeAlertModal
          open={alertModal}
          onClick={onCloseAlertModal}
        />
      </div>
    </div>
  );
}

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  observer(BadgeCompLeft)
);

// <ChallengeBoxCompanionModal
//   open={requestModal}
//   onAction={onClickRequestIssue}
//   onClick={onCloseRequestModal}

// {/*???????????? ?????? ??????*/}
// <ChallengeSuccessModal
// badge={challengeBadge}
// categoryId={challengeBadge.categoryId}
// successModal={successModal}
// onCloseSuccessModal={onCloseSuccessModal}
// />

// const onCloseRequestModal = () => {
//   setRequestModal(false);
// };

// // ?????? ?????? ??????
// const onCloseSuccessModal = () => {
//   setSuccessModal(false);
//   refreshChallengingContainer();
// };
