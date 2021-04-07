import React, { memo } from 'react';
import { Table } from 'semantic-ui-react';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';
import MyApprovalContentType from 'myTraining/ui/model/MyApprovalContentType';
import { useParams } from 'react-router-dom';
import { MyTrainingRouteParams } from '../../../model/MyTrainingRouteParams';
import { MyPageRouteParams } from '../../../model/MyPageRouteParams';

interface Props {
  children: React.ReactNode;
}

function MyLearningTableTemplate(props: Props) {
  const { children } = props;
  const params = useParams<MyTrainingRouteParams | MyPageRouteParams>();

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
        {children}
      </Table>
    </div>
  );
}

export default memo(MyLearningTableTemplate);

/* globals */
const getWrapperStyle = (contentType: MyLearningContentType | MyPageContentType | MyApprovalContentType): string => {
  switch (contentType) {
    case MyPageContentType.EarnedStampList: /* My Stamp */
      return 'mystamp-list-wrap';
    default:
      return 'mylearning-list-wrap';
  }
};

const getTableStyle = (contentType: MyLearningContentType | MyPageContentType | MyApprovalContentType): string => {
  switch (contentType) {
    case MyLearningContentType.InProgress: /* 학습중 */
      return 'ml-02-02';
    case MyLearningContentType.Completed: /* mySUNI 학습완료 */
      return 'ml-02-06';
    case MyLearningContentType.PersonalCompleted:
      return 'ml-02-09';
    case MyPageContentType.EarnedStampList: /* My Stamp */
      return '';
    case MyApprovalContentType.PersonalLearning: /* 개인학습 */
      return 'my-04-01';
    default:
      return 'ml-02-03';
  }
};