
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import {
  Checkbox, Icon, Table
} from 'semantic-ui-react';
import { ApprovalCubeModel, CubeTypeNameType, CubeType } from 'myTraining/model';
import ApprovalCubeService from '../../present/logic/ApprovalCubeService';

interface Props {
  approvalCubeService: ApprovalCubeService
  totalCount: number
  handleClickCubeRow:(cubeId: string) => void
  searchState: any
}

interface States {
  cubeAll: string
}

@reactAutobind
@observer
class ApprovalListView extends React.Component <Props, States> {
  constructor(props:Props) {
    super(props);

    this.state = {
      cubeAll: 'No',
    };
  }

  //
  getCubeType(personalCube: ApprovalCubeModel) {
    //
    return CubeTypeNameType[CubeType[personalCube.contents.type]];
  }

  removeInList(index: number, oldList: string []) {
    //
    return oldList.slice(0, index).concat(oldList.slice(index + 1));
  }

  checkOne(cubeId: string) {
    //
    //const cubeId = approvalCube && approvalCube.id;
    //const proposalState = approvalCube && approvalCube.proposalState;
    const { selectedList, proposalStateList } = this.props.approvalCubeService || {} as ApprovalCubeService;
    const tempList: string [] = [ ...selectedList ];
    //const tempList1: string [] = [ ...proposalStateList ];
    if (tempList.indexOf(cubeId) !== -1) {
      const newTempStudentList = this.removeInList(tempList.indexOf(cubeId), tempList);
      //const newTempProposalStateList = this.removeInList(tempList.indexOf(cubeId), tempList1);
      this.onChangeSelectedStudentProps(newTempStudentList);
      //this.onChangeSelectedProposalStateProps(newTempProposalStateList);
    } else {
      tempList.push(cubeId);
      //tempList1.push(proposalState);
      this.onChangeSelectedStudentProps(tempList);
      //this.onChangeSelectedProposalStateProps(tempList1);
    }
  }

  checkAll(isChecked: string) {
    //
    const { approvalCubeOffsetList } = this.props.approvalCubeService || {} as ApprovalCubeService;
    const { results: approvalCubes } = approvalCubeOffsetList;

    let allList: string [] = [];
    let allProposalState: string [] = [];
    if (isChecked === 'Yes') {
      allList = [];
      allProposalState = [];
      this.onChangeSelectedStudentProps(allList);
      this.onChangeSelectedProposalStateProps(allProposalState);
      this.setState({ cubeAll: 'No' });
    } else {
      approvalCubes.forEach(approvalCube => {
        allList.push(approvalCube.id);
      });
      approvalCubes.forEach(approvalCube => {
        allProposalState.push(approvalCube.proposalState);
      });
      this.onChangeSelectedStudentProps(allList);
      this.onChangeSelectedProposalStateProps(allProposalState);
      this.setState({ cubeAll: 'Yes' });
    }
  }

  onChangeSelectedStudentProps(selectedList: string []) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) approvalCubeService.changeSelectedStudentProps(selectedList);
  }

  onChangeSelectedProposalStateProps(selectedList: string []) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) approvalCubeService.changeSelectedProposalStateProps(selectedList);
  }

  render() {
    const { approvalCubeService, totalCount, handleClickCubeRow, searchState } = this.props;
    const { approvalCubeOffsetList, selectedList } = approvalCubeService!;
    const { results: approvalCubes } = approvalCubeOffsetList;
    const { cubeAll } = this.state;

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
                  <Checkbox
                    className="base"
                    checked={
                      selectedList.length > 0
                      && selectedList.length === approvalCubes.length
                    }
                    value={cubeAll}
                    onChange={(e: any, data: any) => this.checkAll(data.value)}
                  />
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
                return (
                  <Table.Row className="row" key={cube.id}>
                    <Table.Cell className="cell ck">
                      <Checkbox
                        className="base"
                        value={cube.id}
                        checked={selectedList.includes(cube.id)}
                        onChange={(e: any, data: any) => this.checkOne(data.value)}
                      />
                    </Table.Cell>
                    <Table.Cell className="cell num">{totalCount - index}</Table.Cell>
                    <Table.Cell onClick={() => handleClickCubeRow(cube.studentId)} className="cell name"><a><span className="ellipsis">{cube.memberName}</span></a></Table.Cell>
                    <Table.Cell onClick={() => handleClickCubeRow(cube.studentId)} className="cell team"><a><span className="ellipsis">{cube.memberDepartment}</span></a></Table.Cell>
                    <Table.Cell onClick={() => handleClickCubeRow(cube.studentId)} className="cell title"><a><span className="ellipsis">{cube.cubeName}</span></a></Table.Cell>
                    <Table.Cell onClick={() => handleClickCubeRow(cube.studentId)} className="cell class"><a><span className="ellipsis">{cube.round}</span></a></Table.Cell>
                    <Table.Cell onClick={() => handleClickCubeRow(cube.studentId)} className="cell status"><a><span className="ellipsis">{cube.studentCount}/{cube.capacity}</span></a></Table.Cell>

                    <Table.Cell onClick={() => handleClickCubeRow(cube.studentId)} className="cell term"><a><span className="ellipsis">{moment(cube.enrolling.applyingPeriod.startDate).format('YYYY.MM.DD')}<br/>~ {moment(cube.enrolling.applyingPeriod.endDate).format('YYYY.MM.DD')}</span></a></Table.Cell>
                    <Table.Cell onClick={() => handleClickCubeRow(cube.studentId)} className="cell date"><a><span className="ellipsis">{cube.time && moment(cube.time).format('YYYY.MM.DD')}</span></a></Table.Cell>
                    <Table.Cell onClick={() => handleClickCubeRow(cube.studentId)} className="cell pay"><a><span className="ellipsis">{cube.freeOfCharge.chargeAmount}</span></a></Table.Cell>
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

