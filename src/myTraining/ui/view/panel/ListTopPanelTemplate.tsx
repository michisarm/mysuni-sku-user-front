import React from 'react';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';
import { MyContentType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import MyApprovalContentType from 'myTraining/ui/model/MyApprovalContentType';
import { ContentType } from 'myTraining/ui/page/NewLearningPage';

interface Props {
  className: string;
  contentType: MyContentType | MyApprovalContentType | ContentType;
  activeFilter?: boolean;
  children: React.ReactNode;
}

function ListTopPanelTemplate(props: Props) {
  const { className, contentType, activeFilter, children } = props;

  const wrapListTopPanel = (contentType: MyContentType | ContentType) => {
    switch (contentType) {
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed:
      case MyPageContentType.EarnedStampList:
      case MyApprovalContentType.PersonalLearning:
      case ContentType.Enrolling:
        return (
          <div className={className}>
            {children}
          </div>
        );
      default:
        return (
          (activeFilter && className === 'right-wrap') &&
          (
            <div className={className}>
              {children}
            </div>
          ) ||
          (
            <>
              {children}
            </>
          )
        );
    }
  };

  return wrapListTopPanel(contentType);
}

export default ListTopPanelTemplate;