
import React, { useEffect } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import { Table } from 'semantic-ui-react';
import { SearchFilterType } from 'shared/model';
import EnumUtil, { CubeStateView } from 'shared/ui/logic/EnumUtil';
import { PersonalCubeModel, CubeTypeNameType, CubeType } from 'personalcube/personalcube/model';


interface Props {
  personalCubes: PersonalCubeModel[]
  totalCount: number
  handleClickCubeRow: (cubeId: string) => void
}

const CreateListView: React.FC<Props> = ({ personalCubes, totalCount, handleClickCubeRow }) => {

  return (
    <CreateListInnerView
      personalCubes={personalCubes}
      totalCount={totalCount}
      handleClickCubeRow={handleClickCubeRow}
    />
  )
}

export default CreateListView;


@reactAutobind
@observer
class CreateListInnerView extends React.Component<Props> {
  //
  getCubeType(personalCube: PersonalCubeModel) {
    //
    return CubeTypeNameType[CubeType[personalCube.contents.type]];
  }

  render() {
    const { personalCubes, totalCount, handleClickCubeRow } = this.props;
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
              {/*<Table.HeaderCell className="people">이수자</Table.HeaderCell>*/}
              <Table.HeaderCell className="date">일자</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {personalCubes.map((cube, index) => {
              const newCube = new PersonalCubeModel(cube);
              return (
                <Table.Row key={index} onClick={() => handleClickCubeRow(cube.personalCubeId)}>
                  <Table.Cell className="no">{totalCount - index}</Table.Cell>
                  <Table.Cell className="title"><a><span className="ellipsis">{cube.name && cube.name}</span></a></Table.Cell>
                  <Table.Cell className="type">{this.getCubeType(cube)}</Table.Cell>
                  <Table.Cell>{EnumUtil.getEnumValue(CubeStateView, newCube.cubeState).get(newCube.cubeState)}</Table.Cell>
                  <Table.Cell className="open">{cube.searchFilter && cube.searchFilter === SearchFilterType.SearchOn ? 'Yes' : 'No'}</Table.Cell>
                  {/*<Table.Cell className="people">{cube.creator && cube.creator.name}</Table.Cell>*/}
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

