
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
  searchState: any
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
    const { approvalCubes, totalCount, handleClickCubeRow, searchState } = this.props;
    console.log('ApprovalListView totalCount :: ' + totalCount);

    console.log('ApprovalListView searchState :: ' + searchState);

    let approvalNameVal = '신청일자';

    if ( searchState === 'Submitted' ) {
      approvalNameVal = '신청일자';
    } else if ( searchState === 'Rejected' ) {
      approvalNameVal = '반려일자';
    } else if ( searchState === 'Approved' ) {
      approvalNameVal = '승인일자';
    } else {
      approvalNameVal = '신청일자';
    }

    const approvalDateName = approvalNameVal;
    const noTitle = '승인요청 학습이 없습니다.';

    if( totalCount < 1 ) {
      return (

        <>
          {/*해당 콘텐츠 없음*/}
          <div className="no-cont-wrap">
            <Icon className="no-contents80"/>
            <span className="blind">콘텐츠 없음</span>
            <div className="text">{noTitle}</div>
          </div>

          {/*<div id="DataTableRow">*/}
          {/*<Table className="confirm-list typeA">*/}
          {/*<Table.Header>*/}
          {/*<Table.Row className="row thead">*/}
          {/*<Table.HeaderCell className="cell ck">*/}
          {/*<Checkbox className="base"/>*/}
          {/*</Table.HeaderCell>*/}
          {/*<Table.HeaderCell className="cell num">No</Table.HeaderCell>*/}
          {/*<Table.HeaderCell className="cell name">신청자</Table.HeaderCell>*/}
          {/*<Table.HeaderCell className="cell team">조직</Table.HeaderCell>*/}
          {/*<Table.HeaderCell className="cell title">과정명</Table.HeaderCell>*/}
          {/*<Table.HeaderCell className="cell class">차수</Table.HeaderCell>*/}
          {/*<Table.HeaderCell className="cell status">신청현황</Table.HeaderCell>*/}
          {/*<Table.HeaderCell className="cell term">(차수)교육기간<Icon className="list-down16" /></Table.HeaderCell>*/}
          {/*<Table.HeaderCell className="cell date">{ approvalDateName }</Table.HeaderCell>*/}
          {/*<Table.HeaderCell className="cell pay">인당 교육금액<Icon className="list-down16"/></Table.HeaderCell>*/}
          {/*</Table.Row>*/}
          {/*</Table.Header>*/}
          {/*<Table.Body>*/}
          {/*<Table.Row>*/}
          {/*<Table.Cell className="title" colSpan="10">{noTitle}</Table.Cell>*/}
          {/*</Table.Row>*/}
          {/*</Table.Body>*/}
          {/*</Table>*/}
          {/*</div>*/}
        </>
      );
    } else {
      return (
        <div id="DataTableRow">
          <Table className="confirm-list typeA">
            <Table.Header>
              <Table.Row className="row thead">
                <Table.HeaderCell className="cell ck">
                  <Checkbox className="base"/>
                </Table.HeaderCell>
                <Table.HeaderCell className="cell num">No</Table.HeaderCell>
                <Table.HeaderCell className="cell name">신청자</Table.HeaderCell>
                <Table.HeaderCell className="cell team">조직</Table.HeaderCell>
                <Table.HeaderCell className="cell title">과정명</Table.HeaderCell>
                <Table.HeaderCell className="cell class">차수</Table.HeaderCell>
                <Table.HeaderCell className="cell status">신청현황</Table.HeaderCell>
                <Table.HeaderCell className="cell term">(차수)교육기간<Icon className="list-down16" /></Table.HeaderCell>
                <Table.HeaderCell className="cell date">{ approvalDateName }</Table.HeaderCell>
                <Table.HeaderCell className="cell pay">인당 교육금액<Icon className="list-down16"/></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {approvalCubes.map((cube, index) => {
                const newCube = new ApprovalCubeModel(cube);
                return (
                  <Table.Row key={index} onClick={() => handleClickCubeRow(cube.personalCubeId)} className="row">
                    <Table.Cell className="cell ck">
                      <Checkbox className="base" />
                    </Table.Cell>
                    <Table.Cell className="cell num">{totalCount - index}</Table.Cell>
                    <Table.Cell className="cell name"><span className="ellipsis">{cube.memberName}</span></Table.Cell>
                    <Table.Cell className="cell team"><span className="ellipsis">{cube.memberDepartment}</span></Table.Cell>
                    <Table.Cell className="cell title"><span className="ellipsis">{cube.cubeName}</span></Table.Cell>
                    <Table.Cell className="cell class">{cube.round}</Table.Cell>
                    <Table.Cell className="cell status">{cube.studentCount}/{cube.capacity}</Table.Cell>

                    <Table.Cell className="cell term">{moment(cube.enrolling.applyingPeriod.startDate).format('YYYY.MM.DD')}<br/>~ {moment(cube.enrolling.applyingPeriod.endDate).format('YYYY.MM.DD')}</Table.Cell>
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
}


export default ApprovalListView;

