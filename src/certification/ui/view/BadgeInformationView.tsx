import React from 'react';
import { dateTimeHelper } from '../../shared';
import { BadgeLevel } from '../../model/BadgeLevel';
import { getBadgeCategoryName } from '../../service/useRequestBadgeCategory';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

interface BadgeInformationViewProps {
  certiAdminId: string;
  designAdminId: string;
  level: BadgeLevel;
  learningTime: number;
}

export function BadgeInformationView({
  certiAdminId,
  designAdminId,
  level,
  learningTime,
}: BadgeInformationViewProps) {
  //
  const formattedLearningTime =
    dateTimeHelper.timeToHourMinuteFormat(learningTime);
  const levelHtml = getLevelHtml(level);

  return (
    <div className="info">
      <div>
        <span className="detail admin">
          <span>
            <PolyglotText
              id="Certification-View-인증관리"
              defaultString="인증/관리 주체"
            />
          </span>
          <span>{certiAdminId}</span>
        </span>
      </div>
      <div>
        <span className="detail design">
          <span>
            <PolyglotText
              id="Certification-View-설계주체2"
              defaultString="설계 주체dd"
            />
          </span>
          <span>{getBadgeCategoryName(designAdminId)}</span>
        </span>
      </div>
      <div>
        <span className="detail level">
          <span>
            <PolyglotText id="Certification-View-레벨" defaultString="Level" />
          </span>
          <span
            dangerouslySetInnerHTML={{
              __html: levelHtml,
            }}
          />
        </span>
        <span className="detail period">
          <span>
            <PolyglotText
              id="Certification-View-총학시간"
              defaultString="총 학습시간"
            />
          </span>
          <span>{formattedLearningTime}</span>
        </span>
      </div>
    </div>
  );
}

const getLevelHtml = (level: BadgeLevel) => {
  //
  let levelHtml = '';
  const num = Number(level.charAt(level.length - 1));
  for (let i = 0; i < num; i++) {
    levelHtml += '<span class="star"></span>';
  }

  return levelHtml;
};
