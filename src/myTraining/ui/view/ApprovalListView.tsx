
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import {
  Segment, Checkbox, Select, Radio, Button, Icon, Table
} from 'semantic-ui-react';

import { ListPanelTopLine } from 'shared';

import { SearchFilterType } from 'shared/model';
import EnumUtil, { CubeStateView } from 'shared/ui/logic/EnumUtil';

import { ApprovalCubeModel, CubeTypeNameType, CubeType } from 'myTraining/model';

import ApprovalApplyStatusModal from './ApprovalApplyStatusModal';
import ApprovalActionButtons from './ApprovalActionButtons';

import ApprovalProcessModal from './ApprovalProcessModal';

const classOptions = [
  { key: 'val01', value: 'val01', text: '전체과정' },
  { key: 'val02', value: 'val02', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val03', value: 'val03', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val04', value: 'val04', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val05', value: 'val05', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val06', value: 'val06', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val07', value: 'val07', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val08', value: 'val08', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val09', value: 'val09', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val10', value: 'val10', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' }
];

const numOptions = [
  { key: 'val01', value: 'val01', text: '전체차수' },
  { key: 'val02', value: 'val02', text: '1차' },
  { key: 'val03', value: 'val03', text: '2차' }
];

const termOptions = [
  { key: 'val01', value: 'val01', text: '최근 1주일' },
  { key: 'val02', value: 'val02', text: '최근 2주일' },
  { key: 'val03', value: 'val03', text: '최근 한달' },
  { key: 'val04', value: 'val04', text: '사용자 지정' },
];

interface Props {
  approvalCubes: ApprovalCubeModel[]
  totalCount: number
  handleClickCubeRow:(cubeId: string) => void
}

@reactAutobind
@observer
class ApprovalListView extends React.Component <Props> {
  //
  getCubeType(personalCube: ApprovalCubeModel) {
    //
    return CubeTypeNameType[CubeType[personalCube.contents.type]];
  }

  render() {
    const { approvalCubes, totalCount, handleClickCubeRow } = this.props;
    return (
      <div className="create-list-wrap">
        <Table>
          <Table.Body>
            { approvalCubes.map((cube, index) => {
              const newCube = new ApprovalCubeModel(cube);
              return (
                <Table.Row key={index} onClick={() => handleClickCubeRow(cube.personalCubeId)}>
                  <Table.Cell className="cell ck">
                    <Checkbox className="base" />
                  </Table.Cell>
                  <Table.Cell className="cell num">{totalCount - index}</Table.Cell>
                  <Table.Cell className="cell name">{cube.memberName}</Table.Cell>
                  <Table.Cell className="cell team">{cube.memberDepartment}</Table.Cell>
                  <Table.Cell className="cell title">{cube.cubeName}</Table.Cell>
                  <Table.Cell className="cell class">{cube.round}</Table.Cell>
                  <Table.Cell className="cell status">{cube.studentCount}/{cube.capacity}</Table.Cell>
                  
                  <Table.Cell className="cell term">{moment(cube.enrolling.applyingPeriod.startDate).format('YYYY.MM.DD')} ~ {moment(cube.enrolling.applyingPeriod.endDate).format('YYYY.MM.DD')}</Table.Cell>
                  <Table.Cell className="cell date">{cube.time && moment(cube.time).format('YYYY.MM.DD')}</Table.Cell>
                  <Table.Cell className="cell pay">{cube.freeOfCharge.chargeAmount}</Table.Cell>
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

export default ApprovalListView;
