
import React from 'react';
import { Table } from 'semantic-ui-react';
import { MyLearningContentType } from 'myTraining/ui/model';
import MyTrainingModelV2 from 'myTraining/model/MyTrainingModelV2';
import MyLearningTableHeader from './MyLearningTableHeader';
import MyLearningTableBody from './MyLearningTableBody';





interface Props {
  contentType: MyLearningContentType;
  models: MyTrainingModelV2[];
  totalCount: number;
}

function MyLearningTableView(props: Props) {
  const { contentType, models, totalCount } = props;

  /*
    탭에 따라 table header 가 달라진다.
      1. 관심목록, 권장과정, 
  */

  return (
    <div className="mylearning-list-wrap">
      <Table className="ml-02-02">
        <MyLearningTableHeader
          contentType={contentType}
        />

        {/* body */}
        <MyLearningTableBody
          contentType={contentType}
          models={models}
          totalCount={totalCount}
        />
      </Table>
    </div>
  );
}

export default MyLearningTableView;
