import React from 'react';
import { Table } from 'semantic-ui-react';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';
import { MyContentType } from 'myTraining/ui/logic/MyLearningListContainerV2';

interface Props {
  contentType: MyContentType;
  children: React.ReactNode;
}

function MyLearningTableTemplate(props: Props) {
  const { contentType, children } = props;

  return (
    <div className={getWrapperStyle(contentType)}>
      <Table className={getTableStyle(contentType)}>
        {children}
      </Table>
    </div>
  );
}

export default MyLearningTableTemplate;

/* globals */
const getWrapperStyle = (contentType: MyContentType): string => {
  switch (contentType) {
    case MyPageContentType.EarnedStampList: /* My Stamp */
      return 'mystamp-list-wrap';
    default:
      return 'mylearning-list-wrap';
  }
};

const getTableStyle = (contentType: MyContentType): string => {
  switch (contentType) {
    case MyLearningContentType.InProgress: /* 학습중 */
      return 'ml-02-02';
    case MyLearningContentType.Completed: /* mySUNI 학습완료 */
      return 'ml-02-06';
    case MyPageContentType.EarnedStampList: /* My Stamp */
      return '';
    default:
      return 'ml-02-03';
  }
};