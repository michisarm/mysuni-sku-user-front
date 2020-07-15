import React from 'react';
import {Segment} from 'semantic-ui-react';


interface Props {
  children: React.ReactNode
}

export const BadgeContentHeader: React.FC<Props> = ({children}) => (
  <div className="badge-header">
    <div className="inner">
      {children}
    </div>
  </div>
);


interface BadgeTitleProps {
  college: string,
  name: string,
}

export const BadgeTitle: React.FC<BadgeTitleProps> = ({college, name}) => (
  <div className="title-area">
    <div className="college">{college}</div>
    <div className="title">{name}</div>
  </div>
);


interface BadgeInfoProps {
  certiAdminCategoryName: string,
  certiAdminSubCategoryName: string,
  difficultyLevel: string,
  learningTime: number
}

export const BadgeInformation: React.FC<BadgeInfoProps> = ({certiAdminCategoryName, certiAdminSubCategoryName, difficultyLevel, learningTime}) => (
  <div className="info">
    <div>
      <span className="detail admin">
        <span>인증/관리 주체</span>
        <span>{certiAdminCategoryName}</span>
      </span>
    </div>
    <div>
      <span className="detail design">
        <span>설계 주체</span>
        <span>{certiAdminSubCategoryName}</span>
      </span>
    </div>
    <div>
      <span className="detail level">
        <span>Level</span>
        <span>{difficultyLevel}</span>
      </span>
      <span className="detail period">
        <span>총 학습시간</span>
        <span>{learningTime}</span>
      </span>
    </div>
  </div>
);


interface BadgeOverviewProps {
  children: React.ReactNode
}

export const BadgeOverview: React.FC<BadgeOverviewProps> = ({children}) => (
  <Segment className="full">
    <div className="badge-detail">
      {children}
    </div>
  </Segment>
);
