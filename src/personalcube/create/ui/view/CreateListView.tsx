import React from 'react';
import { Table } from 'semantic-ui-react';

import moment from 'moment';
import { SearchFilter } from 'shared';
import EnumUtil, { CubeStateView } from 'shared/ui/logic/EnumUtil';
import { PersonalCubeModel, CubeTypeNameType, CubeType } from 'personalcube/personalcube';


interface Props {
  result: PersonalCubeModel[]
  totalCount: number
  handleClickCubeRow:(cubeId: string) => void
}

class CreateListView extends React.Component <Props> {
  //
  getCubeType(personalCube: PersonalCubeModel) {
    //
    return CubeTypeNameType[CubeType[personalCube.contents.type]];
  }

  render() {
    const { result, totalCount, handleClickCubeRow } = this.props;
    return (
      <div className="create-list-wrap">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="no">No</Table.HeaderCell>
              <Table.HeaderCell className="title">강좌명</Table.HeaderCell>
              <Table.HeaderCell className="type">교육형태</Table.HeaderCell>
              <Table.HeaderCell className="status">상태</Table.HeaderCell>
              <Table.HeaderCell className="open">공개여부</Table.HeaderCell>
              <Table.HeaderCell className="people">이수자</Table.HeaderCell>
              <Table.HeaderCell className="date">일자</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
            result && result.length && result.map((cube, index) => {
              const newCube = new PersonalCubeModel(cube);
              return (
                <Table.Row key={index} onClick={() => handleClickCubeRow(cube.personalCubeId)}>
                  <Table.Cell className="no">{totalCount - index}</Table.Cell>
                  <Table.Cell className="title"><a href="#"><span className="ellipsis">{cube.name && cube.name}</span></a></Table.Cell>
                  <Table.Cell className="type">{this.getCubeType(cube)}</Table.Cell>
                  <Table.Cell>{EnumUtil.getEnumValue(CubeStateView, newCube.cubeState).get(newCube.cubeState)}</Table.Cell>
                  <Table.Cell className="open">{cube.searchFilter && cube.searchFilter === SearchFilter.SearchOn ? 'Yes' : 'No'}</Table.Cell>
                  <Table.Cell className="people">{cube.creator && cube.creator.name}</Table.Cell>
                  <Table.Cell className="date">{cube.time && moment(cube.time).format('YYYY.MM.DD')}</Table.Cell>
                </Table.Row>
              );
            })
          }
          </Table.Body>
        </Table>
      </div>

    );
  }
}

export default CreateListView;
