
import React, {FunctionComponent} from 'react';
import {Image} from 'semantic-ui-react';
import classNames from 'classnames';

const blankImage = '/images/all/icon-chanel-64-px.svg';


interface BadgeContentWrapperProps {
  badgeLevel: string,
  badgeStyle: string,
  badgeSize: string,
}

export const BadgeContentWrapper: FunctionComponent<BadgeContentWrapperProps> = ({ badgeLevel, badgeStyle, badgeSize, children }) => (
  <>
    { badgeStyle === 'List' ? (
      <a href="#" className={ classNames('badge', badgeLevel, badgeSize)}>
        {children}
      </a>
    ) : (
      <div className={ classNames('badge', badgeLevel, badgeSize)}>
        {children}
      </div>
    )}
  </>
);


interface CollegeIconProps {
  iconUrl: string
}

export const CollegeIcon: FunctionComponent<CollegeIconProps> = ({ iconUrl }) => (
  <span className="college">
    <Image src={ iconUrl || blankImage} alt="" />
  </span>
);


interface MainCategoryProps {
  mainCategory: string,
}

export const MainCategory: FunctionComponent<MainCategoryProps> = ({ mainCategory }) => (
  <span className="part">
    {mainCategory}
  </span>
);


interface TitleProps {
  name: string
}

export const Title: FunctionComponent<TitleProps> = ({ name }) => (
  <span className="title">
    {name}
  </span>
);
