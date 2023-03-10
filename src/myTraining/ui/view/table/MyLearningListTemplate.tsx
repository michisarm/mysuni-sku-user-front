import React, { memo } from 'react';
import { Table } from 'semantic-ui-react';
import { MyApprovalContentType } from 'myTraining/ui/model/MyApprovalContentType';
import { MyLearningContentType } from '../../model/MyLearningContentType';
import { MyPageContentType } from '../../model/MyPageContentType';

interface MyLearningListTemplateProps {
  contentType:
    | MyLearningContentType
    | MyPageContentType
    | MyApprovalContentType;
  children: React.ReactNode;
}

function MyLearningListTemplate({
  contentType,
  children,
}: MyLearningListTemplateProps) {
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
        {contentType === MyPageContentType.EarnedStampList && (
          <colgroup>
            <col width="80px" />
            <col width="100px" />
            <col width="420px" />
            <col width="150px" />
            {/* ????????? ????????? ?????? */}
            {/* <col width="100px"/> */}
          </colgroup>
        )}
        {children}
      </Table>
    </div>
  );
}

export default memo(MyLearningListTemplate);

/* globals */
const getWrapperStyle = (
  contentType: MyLearningContentType | MyPageContentType | MyApprovalContentType
): string => {
  switch (contentType) {
    /* My Stamp */
    case MyPageContentType.EarnedStampList:
      return 'stamp-list-wrapper';
    default:
      return 'mylearning-list-wrap';
  }
};

const getTableStyle = (
  contentType: MyLearningContentType | MyPageContentType | MyApprovalContentType
): string => {
  switch (contentType) {
    /* ????????? */
    case MyLearningContentType.InProgress:
      return 'ml-02-02';
    /* mySUNI ???????????? */
    case MyLearningContentType.Completed:
      return 'ml-02-06';
    case MyLearningContentType.PersonalCompleted:
      return 'ml-02-09';
    /* My Stamp */
    case MyPageContentType.EarnedStampList:
      return '';
    /* ???????????? */
    case MyApprovalContentType.PersonalLearning:
      return 'my-04-01';
    default:
      return 'ml-02-03';
  }
};
