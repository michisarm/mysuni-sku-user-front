import React from 'react';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';

interface Props {
  className: string;
  contentType: MyLearningContentType | MyPageContentType;
  activeFilter: boolean;
  filterCount: number;
  children: React.ReactNode;

}


function ListTopPanelTemplate(props: Props) {
  const { className, contentType, activeFilter, filterCount, children } = props;

  const renderByContentType = (contentType: MyLearningContentType | MyPageContentType) => {

    switch (contentType) {
      case MyLearningContentType.InProgress:
      case MyLearningContentType.Completed:
      case MyPageContentType.EarnedStampList:
        return (
          <div className={className}>
            {children}
          </div>
        );
      default:
        return (
          (activeFilter || filterCount) && className === 'right-wrap' &&
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

  return renderByContentType(contentType);
}

export default ListTopPanelTemplate;