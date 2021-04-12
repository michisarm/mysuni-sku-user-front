import React, { memo } from 'react';
import { Table } from 'semantic-ui-react';
import { MyApprovalContentType } from 'myTraining/ui/model/MyApprovalContentType';
import { useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from '../../../model/MyTrainingRouteParams';
import { MyPageRouteParams } from '../../../model/MyPageRouteParams';
import { MyApprovalRouteParams } from '../../../model/MyApprovalRouteParams';
import { MyLearningContentType } from '../../model/MyLearningContentType';
import { MyPageContentType } from '../../model/MyPageContentType';

interface MyLearningListTemplateProps {
  children: React.ReactNode;
}

function MyLearningListTemplate({
  children,
}: MyLearningListTemplateProps) {
  const params = useParams<MyTrainingRouteParams | MyPageRouteParams | MyApprovalRouteParams>();
  const contentType = params.tab;

  return (
    <div className={getWrapperStyle(params.tab)}>
      <Table className={getTableStyle(params.tab)}>
        {params.tab === MyLearningContentType.PersonalCompleted && (
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

export default memo(MyLearningListTemplate);

/* globals */
const getWrapperStyle = (contentType: MyLearningContentType | MyPageContentType | MyApprovalContentType): string => {
  switch (contentType) {
    /* My Stamp */
    case MyPageContentType.EarnedStampList:
      return 'mystamp-list-wrap';
    default:
      return 'mylearning-list-wrap';
  }
};

const getTableStyle = (contentType: MyLearningContentType | MyPageContentType | MyApprovalContentType): string => {
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
