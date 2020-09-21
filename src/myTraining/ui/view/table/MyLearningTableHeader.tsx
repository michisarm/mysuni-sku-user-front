
import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Checkbox, Icon, Table } from 'semantic-ui-react';
import classNames from 'classnames';
import MyTrainingService from 'myTraining/present/logic/MyTrainingService';
import { MyLearningContentType, TableHeaderInfo } from '../../model';

interface Props {
  contentType: MyLearningContentType;
  onClickSort: (column: string, direction: string) => void;
  myTrainingService?: MyTrainingService;
}

function MyLearningTableHeader(props: Props) {
  const { contentType, onClickSort, myTrainingService } = props;
  const { myTrainingV2s, selectedIds, selectAll, deleteAll } = myTrainingService!;

  const [column, setColumn] = useState<string>();
  const [direction, setDirection] = useState<string>('desc');

  const headerInfos = TableHeaderInfo.getByContentType(contentType);

  useEffect(() => {
    deleteAll();
  }, []);


  const onCheckAll = (e: any, data: any) => {
    if (myTrainingV2s.length === selectedIds.length) {
      deleteAll();
      return;
    }
    selectAll();
  };

  const handleClickSort = (column: string) => {
    setColumn(column);

    if (direction === 'asc') {
      setDirection('desc');
    } else {
      setDirection('asc');
    }

    onClickSort(column, direction);
  };

  return (
    <>
      {/* header */}
      <Table.Header>
        <Table.Row>

          {contentType === MyLearningContentType.InProgress && (
            <Table.HeaderCell className="ck">
              <Checkbox
                checked={selectedIds.length === myTrainingV2s.length}
                onChange={onCheckAll}
              />
            </Table.HeaderCell>
          )}
          {headerInfos &&
            headerInfos.length &&
            headerInfos.map(headerInfo => (
              <Table.HeaderCell
                key={headerInfo.key}
                className={headerInfo.text === '과정명' ? 'title' : ''}
              >
                {headerInfo.text}
                {headerInfo.icon && (
                  <a href="#" onClick={() => handleClickSort(headerInfo.text)}>
                    <Icon className={classNames(direction === 'asc' ? 'list-up16' : 'list-down16')}>
                      <span className="blind">{direction === 'asc' ? '오름차순 정렬' : '내림차순 정렬'}</span>
                    </Icon>
                  </a>
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
))(observer(MyLearningTableHeader));
