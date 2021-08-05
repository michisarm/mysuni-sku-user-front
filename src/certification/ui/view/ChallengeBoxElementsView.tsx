import React, { FunctionComponent } from 'react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString, PolyglotString } from 'shared/viewmodel/PolyglotString';

interface BadgeStatusProps {
  children: React.ReactNode;
}

export const ChallengeBadgeStatus: FunctionComponent<BadgeStatusProps> = ({
  children,
}) => <div className="status">{children}</div>;

interface BadgeTitleProps {
  mainCategoryName: string;
  name: PolyglotString;
}

export const ChallengeBadgeTitle: FunctionComponent<BadgeTitleProps> = ({
  mainCategoryName,
  name,
}) => (
  <div className="badge-title">
    <div className="t1">{mainCategoryName}</div>
    <div className="t2">{parsePolyglotString(name)}</div>
    <div className="path">
      <PolyglotText
        defaultString="Learning Path"
        id="Certification-clls-학습경로"
      />
    </div>
  </div>
);
