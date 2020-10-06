import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { getPublicUrl } from 'shared/helper/envHelper';

const blankImage = `${getPublicUrl()}/images/all/icon-chanel-64-px.svg`;

enum BadgeDifficultyLevel {
  Level1 = 'basic',
  Level2 = 'intermediate',
  Level3 = 'advanced',
}

enum BadgeCategoryId {
  BDGCAT_AIDT = 'aidt',
  BDGCAT_JOB = 'job',
  BDGCAT_BIZ = 'biz',
  BDGCAT_HAPPY = 'happy',
  BDGCAT_BM = 'bm',
}

interface BadgeContentWrapperProps {
  onViewDetail?: () => void;
  badgeLevel: string;
  badgeStyle: string;
  badgeSize: string;
  mainCategoryId: string;
}

export const BadgeContentWrapper: FunctionComponent<BadgeContentWrapperProps> = ({
  badgeLevel,
  badgeStyle,
  badgeSize,
  children,
  onViewDetail,
  mainCategoryId
}) => (
  <>
    {badgeStyle === 'List' ? (
      <a
        className={classNames('badge_new', BadgeCategoryId[mainCategoryId as keyof typeof BadgeCategoryId])}
        //className={classNames('badge', mainCategoryId, BadgeDifficultyLevel[badgeLevel as keyof typeof BadgeDifficultyLevel], badgeSize)}
        onClick={onViewDetail}
      >
        {children}
      </a>
    ) : (
      <div className={classNames('badge_new', BadgeCategoryId[mainCategoryId as keyof typeof BadgeCategoryId])}>
        {/*<div className={classNames('badge',mainCategoryId, BadgeDifficultyLevel[badgeLevel as keyof typeof BadgeDifficultyLevel], badgeSize)}>*/}
        {children}
      </div>
    )}
  </>
);

interface CertificationOrgProps {
  certiAdminCategoryIcon: string;
  certiAdminCategoryName: string;
}

export const CertificationOrg: FunctionComponent<CertificationOrgProps> = ({
  certiAdminCategoryIcon,
  certiAdminCategoryName,
}) => (
  <span className="issuing">
    <img
      src={certiAdminCategoryIcon}
      alt={`발급기관: ${certiAdminCategoryName}`}
    />
  </span>
);

interface CollegeProps {
  iconUrl: string;
}

export const College: FunctionComponent<CollegeProps> = ({
  iconUrl,
}) => (
  <span className="college">
    <img src={iconUrl} alt="" />
  </span>
);

interface StarScoreProps {
  badgeLevel: string;
}

/*20200929 Update*/
export const StarScore: FunctionComponent<StarScoreProps> = ({ badgeLevel }) => {
  let star = '';
  let starScoreEm;
  if (BadgeDifficultyLevel[badgeLevel as keyof typeof BadgeDifficultyLevel] === BadgeDifficultyLevel.Level1) {
    star = 'star1';
    starScoreEm= <><em/></>;
  } else if (BadgeDifficultyLevel[badgeLevel as keyof typeof BadgeDifficultyLevel] === BadgeDifficultyLevel.Level2) {
    star = 'star2';
    starScoreEm= <><em/><em/></>;
  } else if (BadgeDifficultyLevel[badgeLevel as keyof typeof BadgeDifficultyLevel] === BadgeDifficultyLevel.Level3) {
    star = 'star3';
    starScoreEm= <><em/><em/><em/></>;
  }
  return (
    <p className={`star-score ${star}`}>
      {starScoreEm}
    </p>
  );
};

interface TitleProps {
  name: string;
}

export const Title: FunctionComponent<TitleProps> = ({ name }) => (
  <span className="title">
    <span className="cell">
      <span>{name}</span>
    </span>
  </span>
);
