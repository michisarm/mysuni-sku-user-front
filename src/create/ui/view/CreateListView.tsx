import { Button, Icon, Table } from 'semantic-ui-react';
import * as React from 'react';
import { OpenFilter } from '../../model/OpenFilter';
import { CubeModel } from '../..';

interface Props {
  result: CubeModel[]
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
              result && result.length && result.map((cube, index) => (
                <Table.Row key={index} onClick={() => handleClickCubeRow(cube.cubeId)}>
                  <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                  <Table.Cell>{cube.name && cube.name}</Table.Cell>
                  <Table.Cell>{cube.contents && cube.contents.type}</Table.Cell>
                  <Table.Cell>{cube.openState}</Table.Cell>
                  <Table.Cell>{cube.openFilter && cube.openFilter === OpenFilter.FilterOn ? 'Yes' : 'No'}</Table.Cell>
                  <Table.Cell>{cube.creator && cube.creator.name}</Table.Cell>
                  <Table.Cell>{cube.time && new Date(cube.time).toLocaleDateString()}</Table.Cell>
                </Table.Row>
              ))
            }
            </Table.Body>
          </Table>
        </div>
        <div className="more-comments">
          <Button icon className="left moreview">
            <Icon className="moreview"
              disabled={disabled}
              onClick={() => findAllCubes(limit)}
            />list more
          </Button>
        </div>
      </>
    );
  }
}

export default CreateListView;
