import React from 'react';
import { MyApprovalContentType } from 'myTraining/ui/model/MyApprovalContentType';
import { ContentType } from 'myTraining/ui/logic/NewLearningListContainer';
import { MyLearningContentType } from '../../model/MyLearningContentType';
import { MyPageContentType } from '../../model/MyPageContentType';
import { MyContentType } from '../../model/MyContentType';
import classNames from 'classnames';

interface Props {
  className: 'right-wrap' | 'left-wrap' | 'top-list' | null;
  children?: React.ReactNode;
}

export function MyTrainingTabHeaderTemplate(props: Props) {
  const { className, children } = props;

  if (className === 'right-wrap') {
    return <div className={className}>{children}</div>;
  } else {
    return <>{children}</>;
  }
}
