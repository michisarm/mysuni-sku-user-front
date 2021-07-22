import React from 'react';
import moment from 'moment';
import { Table } from 'semantic-ui-react';
import EnumUtil, { CubeStateView } from 'shared/ui/logic/EnumUtil';
import { CubeTypeNameType } from 'personalcube/personalcube/model';
import CubeType from '../../../../lecture/detail/model/CubeType';
import CubeState from '../../../../lecture/detail/model/CubeState';
import { useHistory } from 'react-router-dom';
import { useScrollMove } from '../../../../myTraining/useScrollMove';
import routePaths from '../../../routePaths';
import { CreateCube } from '../../model/CreateCube';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface CreateListViewProps {
  createCubes: CreateCube[];
  totalCount: number;
}

export default function CreateListView({
  createCubes,
  totalCount,
}: CreateListViewProps) {
  const history = useHistory();
  const { scrollSave } = useScrollMove();

  const onViewDetail = (
    cubeId: string,
    cubeType: CubeType,
    cubeState: CubeState
  ) => {
    scrollSave();

    if (cubeState === 'Created') {
      history.push(routePaths.createPersonalCubeDetail(cubeId, cubeType));
    } else {
      history.push(routePaths.createSharedDetail(cubeId, cubeType, cubeState));
    }
  };

  return (
    <div className="create-list-wrap">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="no">
              <PolyglotText defaultString="No" id="Create-MainList-컬럼1" />
            </Table.HeaderCell>
            <Table.HeaderCell className="title">
              <PolyglotText defaultString="강좌명" id="Create-MainList-컬럼2" />
            </Table.HeaderCell>
            <Table.HeaderCell className="type">
              <PolyglotText
                defaultString="교육형태"
                id="Create-MainList-컬럼3"
              />
            </Table.HeaderCell>
            <Table.HeaderCell className="status">
              <PolyglotText defaultString="상태" id="Create-MainList-컬럼4" />
            </Table.HeaderCell>
            <Table.HeaderCell className="date">
              <PolyglotText defaultString="일자" id="Create-MainList-컬럼6" />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {createCubes.map((cube, index) => {
            return (
              <Table.Row
                key={index}
                onClick={() => onViewDetail(cube.cubeId, cube.type, cube.state)}
              >
                <Table.Cell className="no">{totalCount - index}</Table.Cell>
                <Table.Cell className="title">
                  <a>
                    <span className="ellipsis">
                      {cube.name && parsePolyglotString(cube.name)}
                    </span>
                  </a>
                </Table.Cell>
                <Table.Cell className="type">
                  {CubeTypeNameType[cube.type] || '-'}
                </Table.Cell>
                <Table.Cell>
                  {
                    // 김민준
                    EnumUtil.getEnumValue(CubeStateView, cube.state).get(
                      cube.state
                    ) || '-'
                  }
                </Table.Cell>
                <Table.Cell className="date">
                  {(cube.time && moment(cube.time).format('YYYY.MM.DD')) || '-'}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
