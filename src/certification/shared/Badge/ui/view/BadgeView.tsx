
import React, {FunctionComponent} from 'react';
import classNames from 'classnames';

const blankImage = '/images/all/icon-chanel-64-px.svg';


interface BadgeContentWrapperProps {
  onViewDetail?: () => void,
  badgeLevel: string,
  badgeStyle: string,
  badgeSize: string,
}

export const BadgeContentWrapper: FunctionComponent<BadgeContentWrapperProps> = ({ badgeLevel, badgeStyle, badgeSize, children, onViewDetail }) => (
  <>
    { badgeStyle === 'List' ? (
      <a className={ classNames('badge', badgeLevel, badgeSize)} onClick={onViewDetail}>
        {children}
      </a>
    ) : (
      <div className={ classNames('badge', badgeLevel, badgeSize)}>
        {children}
      </div>
    )}
  </>
);


interface CollegeProps {
  iconUrl: string,
  mainCategory: string,
}

export const College: FunctionComponent<CollegeProps> = ({ iconUrl, mainCategory }) => (
  <span className="college">
    <img src={ iconUrl || blankImage} alt="" />
    <span>{mainCategory}</span>
  </span>
);


interface TitleProps {
  name: string
}

export const Title: FunctionComponent<TitleProps> = ({ name }) => (
  <span className="title">
    <span className="cell">
      <span>{name}</span>
    </span>
  </span>
);
