import React from 'react';
import { Table } from 'semantic-ui-react';
import { MyLearningContentType, MyPageContentType } from 'myTraining/ui/model';

interface Props {
  contentType: MyLearningContentType | MyPageContentType;
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
const getWrapperStyle = (contentType: MyLearningContentType | MyPageContentType): string => {
  switch (contentType) {
    case MyPageContentType.EarnedStampList: /* My Stamp */
      return 'mystamp-list-wrap';
    default:
      return 'mylearning-list-wrap';
  }
};

const getTableStyle = (contentType: MyLearningContentType | MyPageContentType): string => {
  switch (contentType) {
    case MyLearningContentType.InProgress: /* 학습중 */
      return 'ml-02-02';
    case MyLearningContentType.Completed: /* mySUNI 학습완료 */
      return 'ml-02-06';
    case MyPageContentType.EarnedStampList: /* My Stamp */
      return '';
    /* 
      관심목록
      권장과정
      학습예정
      취소/미이수
    */
    default:
      return 'ml-02-03';
  }
};