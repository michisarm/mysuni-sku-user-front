import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { getPublicUrl } from 'shared/helper/envHelper';

const blankImage = `${getPublicUrl()}/images/all/icon-chanel-64-px.svg`;

enum BadgeDifficultyLevel {
  Level1 = 'basic',
  Level2 = 'intermediate',
  Level3 = 'advanced',
}

interface BadgeContentWrapperProps {
  onViewDetail?: () => void;
  badgeLevel: string;
  badgeStyle: string;
  badgeSize: string;
}

export const BadgeContentWrapper: FunctionComponent<BadgeContentWrapperProps> = ({
  badgeLevel,
  badgeStyle,
  badgeSize,
  children,
  onViewDetail,
}) => (
  <>
    {badgeStyle === 'List' ? (
      <a
        className={classNames('badge', BadgeDifficultyLevel[badgeLevel as keyof typeof BadgeDifficultyLevel], badgeSize)}
        onClick={onViewDetail}
      >
        {children}
      </a>
    ) : (
      <div className={classNames('badge', BadgeDifficultyLevel[badgeLevel as keyof typeof BadgeDifficultyLevel], badgeSize)}>
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
      src={`${getPublicUrl()}${certiAdminCategoryIcon}`}
      alt={`발급기관: ${certiAdminCategoryName}`}
    />
  </span>
);

interface CollegeProps {
  iconUrl: string;
  mainCategory: string;
}

export const College: FunctionComponent<CollegeProps> = ({
  iconUrl,
  mainCategory,
}) => (
  <span className="college">
    <img src={`${getPublicUrl()}${iconUrl}`} alt="" />
    <span>{mainCategory}</span>
  </span>
);

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
