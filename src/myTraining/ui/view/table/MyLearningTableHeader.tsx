
import React from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Checkbox, Icon, Table } from 'semantic-ui-react';
import MyTrainingService from 'myTraining/present/logic/MyTrainingService';
import { MyLearningContentType, TableHeaderInfo } from '../../model';

interface Props {
  contentType: MyLearningContentType;
  myTrainingService?: MyTrainingService;
}

function MyLearningTableHeader(props: Props) {
  const { contentType, myTrainingService } = props;
  const { myTrainingV2s, selectedIds } = myTrainingService!;

  const headerInfos = TableHeaderInfo.getByContentType(contentType);

  const onCheckAll = (e: any, data: any) => {
    myTrainingService!.selectAll();
  };

  return (
    <>
      {/* header */}
      <Table.Header>
        <Table.Row>

          {contentType === MyLearningContentType.InProgress && (
            <Table.HeaderCell>
              <Checkbox
                checked={selectedIds.length === myTrainingV2s.length}
                onChange={onCheckAll}
              />
            </Table.HeaderCell>
          )}
          {headerInfos &&
            headerInfos.length &&
            headerInfos.map(headerInfo => (
              <Table.HeaderCell>
                {headerInfo.text}
                {headerInfo.icon && (
                  <div>
                    <Icon />
                  </div>
                )}
              </Table.HeaderCell>
            ))}
        </Table.Row>
      </Table.Header>
    </>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.myTrainingService'
))(MyLearningTableHeader);
