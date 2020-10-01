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
  mainCategoryId: string;
}

export const BadgeContentWrapper: FunctionComponent<BadgeContentWrapperProps> = ({
  badgeLevel,
  badgeStyle,
  badgeSize,
  mainCategoryId,
  children,
  onViewDetail,
}) => (
  <>
    {badgeStyle === 'List' ? (
      <a
        className={classNames('badge', mainCategoryId)}
        onClick={onViewDetail}
      >
        {children}
      </a>
    ) : (
      <div className={classNames('badge', mainCategoryId)}>
        {children}
      </div>
    )}
  </>
);

interface BadgeLevelProps {
  difficultyLevel: string;
}

export const BadgeLevel: FunctionComponent<BadgeLevelProps> = (({difficultyLevel}) => (
  <p className="star-score star3">
    {
      difficultyLevel === 'Level1' && (
        <>
          <em/>
        </>
      )
    }
    {
      difficultyLevel === 'Level2' && (
        <>
          <em/>
          <em/>
        </>
      )
    }
    {
      difficultyLevel === 'Level3' && (
        <>
          <em/>
          <em/>
          <em/>
        </>
      )
    }
  </p>
));

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
