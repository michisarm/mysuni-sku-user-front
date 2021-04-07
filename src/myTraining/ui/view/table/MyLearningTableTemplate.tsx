import React, { memo } from 'react';
import { Table } from 'semantic-ui-react';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';
import { MyContentType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import MyApprovalContentType from 'myTraining/ui/model/MyApprovalContentType';

interface Props {
  contentType: MyContentType;
  children: React.ReactNode;
}

function MyLearningTableTemplate(props: Props) {
  const { contentType, children } = props;

  return (
    <div className={getWrapperStyle(contentType)}>
      <Table className={getTableStyle(contentType)}>
        {contentType === MyLearningContentType.PersonalCompleted && (
          <colgroup>
            <col width="10%" />
            <col width="25%" />
            <col width="15%" />
            <col width="10%" />
            <col width="5%" />
            <col width="15%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
        )}
        {contentType === MyLearningContentType.InProgress && (
          <colgroup>
            <col width="4%" />
            <col width="4%" />
            <col width="15%" />
            <col width="25%" />
            <col width="11%" />
            <col width="11%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
        )}
        {(contentType === MyLearningContentType.InMyList ||
          contentType === MyLearningContentType.Required) && (
          <colgroup>
            <col width="8%" />
            <col width="12%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
        )}
        {children}
      </Table>
    </div>
  );
}

export default memo(MyLearningTableTemplate);

/* globals */
const getWrapperStyle = (contentType: MyContentType): string => {
  switch (contentType) {
    /* My Stamp */
    case MyPageContentType.EarnedStampList:
      return 'mystamp-list-wrap';
    default:
      return 'mylearning-list-wrap';
  }
};

const getTableStyle = (contentType: MyContentType): string => {
  switch (contentType) {
    /* 학습중 */
    case MyLearningContentType.InProgress:
      return 'ml-02-02';
    /* mySUNI 학습완료 */
    case MyLearningContentType.Completed:
      return 'ml-02-06';
    case MyLearningContentType.PersonalCompleted:
      return 'ml-02-09';
    /* My Stamp */
    case MyPageContentType.EarnedStampList:
      return '';
    /* 개인학습 */
    case MyApprovalContentType.PersonalLearning:
      return 'my-04-01';
    default:
      return 'ml-02-03';
  }
};
