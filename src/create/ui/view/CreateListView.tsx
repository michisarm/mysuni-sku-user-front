import { Button, Icon, Table } from 'semantic-ui-react';
import * as React from 'react';
import { SearchFilter } from 'shared';
import { PersonalCubeModel } from 'personalcube/personalcube';
import EnumUtil, { CubeStateView } from '../../../shared/ui/logic/getEumValue';


interface Props {
  result: PersonalCubeModel[]
  handleClickCubeRow:(cubeId: string) => void
  disabled: boolean
  findAllCubes: (offset: number) => void
  limit: number
}

class CreateListView extends React.Component <Props> {
  render() {
    const { result, handleClickCubeRow, disabled, findAllCubes, limit } = this.props;
    return (
      <>
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
                    <Table.Cell textAlign="center" className="no">{index + 1}</Table.Cell>
                    <Table.Cell className="title"><span className="ellipsis">{cube.name && cube.name}</span></Table.Cell>
                    <Table.Cell className="type">{cube.contents && cube.contents.type}</Table.Cell>
                    <Table.Cell>{EnumUtil.getEnumValue(CubeStateView, newCube.cubeState).get(newCube.cubeState)}</Table.Cell>
                    <Table.Cell className="open">{cube.searchFilter && cube.searchFilter === SearchFilter.SearchOn ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell className="people">{cube.creator && cube.creator.name}</Table.Cell>
                    <Table.Cell className="date">{cube.time && new Date(cube.time).toLocaleDateString()}</Table.Cell>
                  </Table.Row>
                );
              })
            }
            </Table.Body>
          </Table>
        </div>
        <div className="more-comments">
          <Button icon className="left moreview" onClick={() => findAllCubes(limit)}>
            <Icon className="moreview"
              disabled={disabled}
            />list more
          </Button>
        </div>
      </>
    );
  }
}

export default CreateListView;
