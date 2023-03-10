import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import numeral from 'numeral';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react';
import ApprovalCubeService from '../../present/logic/ApprovalCubeService';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props {
  approvalCubeService: ApprovalCubeService;
  totalCount: number;
  handleClickCubeRow: (cubeId: string) => void;
  onChangeOrderBy: (orderBy: string, desc?: boolean) => void;
  orderBy?: string;
  searchState: any;
}

interface States {
  cubeAll: string;
}

@reactAutobind
@observer
class ApprovalListView extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);

    this.state = {
      cubeAll: 'No',
    };
  }

  removeInList(index: number, oldList: string[]) {
    //
    return oldList.slice(0, index).concat(oldList.slice(index + 1));
  }

  checkOne(cubeId: string) {
    //
    const { selectedList } =
      this.props.approvalCubeService || ({} as ApprovalCubeService);
    const tempList: string[] = [...selectedList];
    if (tempList.indexOf(cubeId) !== -1) {
      const newTempStudentList = this.removeInList(
        tempList.indexOf(cubeId),
        tempList
      );
      this.onChangeSelectedStudentProps(newTempStudentList);
    } else {
      tempList.push(cubeId);
      this.onChangeSelectedStudentProps(tempList);
    }
  }

  checkAll(isChecked: string) {
    //
    const { approvalCubeOffsetList } =
      this.props.approvalCubeService || ({} as ApprovalCubeService);
    const { results: approvalCubes } = approvalCubeOffsetList;

    let allList: string[] = [];
    let allProposalState: string[] = [];
    if (isChecked === 'Yes') {
      allList = [];
      allProposalState = [];
      this.onChangeSelectedStudentProps(allList);
      this.onChangeSelectedProposalStateProps(allProposalState);
      this.setState({ cubeAll: 'No' });
    } else {
      approvalCubes.forEach((approvalCube) => {
        allList.push(approvalCube.studentId);
      });
      approvalCubes.forEach((approvalCube) => {
        allProposalState.push(approvalCube.proposalState);
      });
      this.onChangeSelectedStudentProps(allList);
      this.onChangeSelectedProposalStateProps(allProposalState);
      this.setState({ cubeAll: 'Yes' });
    }
  }

  onChangeSelectedStudentProps(selectedList: string[]) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) {
      approvalCubeService.changeSelectedStudentProps(selectedList);
    }
  }

  onChangeSelectedProposalStateProps(selectedList: string[]) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) {
      approvalCubeService.changeSelectedProposalStateProps(selectedList);
    }
  }

  onChangeOrderBy(orderBy: string) {
    const { onChangeOrderBy } = this.props;
    onChangeOrderBy(orderBy);
  }

  getOrderByIconColor(iconOrderBy: string) {
    const { orderBy: currentOrderBy } = this.props;
    return iconOrderBy === currentOrderBy ? 'blue' : 'grey';
  }

  getProposalStateString(proposalState: string) {
    //
    if (proposalState === 'Submitted') {
      return (
        <PolyglotText
          id="????????????-????????????-????????????"
          defaultString="????????????"
        />
      );
    } else if (proposalState === 'Canceled') {
      return <PolyglotText id="????????????-????????????-??????" defaultString="??????" />;
    } else if (proposalState === 'Rejected') {
      return <PolyglotText id="????????????-????????????-??????" defaultString="??????" />;
    } else if (proposalState === 'Approved') {
      return <PolyglotText id="????????????-????????????-??????" defaultString="??????" />;
    }
  }

  render() {
    const { approvalCubeService, totalCount, handleClickCubeRow, searchState } =
      this.props;
    const { approvalCubeOffsetList, selectedList } = approvalCubeService!;
    const { results: approvalCubes } = approvalCubeOffsetList;
    const { cubeAll } = this.state;

    let approvalNameVal = getPolyglotText(
      '????????????',
      '????????????-????????????-????????????'
    );

    if (searchState === 'Submitted') {
      approvalNameVal = getPolyglotText(
        '????????????',
        '????????????-????????????-????????????'
      );
    } else if (searchState === 'Rejected') {
      approvalNameVal = getPolyglotText(
        '????????????',
        '????????????-????????????-????????????'
      );
    } else if (searchState === 'Approved') {
      approvalNameVal = getPolyglotText(
        '????????????',
        '????????????-????????????-????????????'
      );
    } else {
      approvalNameVal = getPolyglotText('??????', '????????????-????????????-??????');
    }

    const approvalDateName = approvalNameVal;
    const noTitle = getPolyglotText(
      '???????????? ????????? ????????????.',
      '????????????-????????????-????????????'
    );

    return (
      <div id="DataTableRow">
        <Table className="confirm-list typeA">
          <Table.Header>
            <Table.Row className="row thead">
              <Table.HeaderCell className="cell ck">
                <Checkbox
                  className="base"
                  checked={
                    selectedList.length > 0 &&
                    selectedList.length === approvalCubes.length
                  }
                  value={cubeAll}
                  onChange={(e: any, data: any) => this.checkAll(data.value)}
                />
              </Table.HeaderCell>
              <Table.HeaderCell className="cell num">
                <PolyglotText id="????????????-????????????-??????1" defaultString="No" />
              </Table.HeaderCell>
              <Table.HeaderCell className="cell name">
                <PolyglotText
                  id="????????????-????????????-??????2"
                  defaultString="?????????"
                />
              </Table.HeaderCell>
              <Table.HeaderCell className="cell team">
                <PolyglotText
                  id="????????????-????????????-??????3"
                  defaultString="??????"
                />
              </Table.HeaderCell>
              <Table.HeaderCell className="cell title">
                <PolyglotText
                  id="????????????-????????????-??????4"
                  defaultString="?????????"
                />
              </Table.HeaderCell>
              <Table.HeaderCell className="cell class">
                <PolyglotText
                  id="????????????-????????????-??????5"
                  defaultString="??????"
                />
              </Table.HeaderCell>
              <Table.HeaderCell className="cell status">
                <PolyglotText
                  id="????????????-????????????-??????6"
                  defaultString="????????????"
                />
              </Table.HeaderCell>
              <Table.HeaderCell className="cell term">
                <PolyglotText
                  id="????????????-????????????-??????7"
                  defaultString="????????????"
                />
                <Button
                  icon
                  className="img-icon"
                  onClick={() => this.onChangeOrderBy('LearningEndDateDesc')}
                >
                  <Icon
                    name="sort content ascending"
                    size="small"
                    color={this.getOrderByIconColor('LearningEndDateDesc')}
                  />
                </Button>
              </Table.HeaderCell>
              <Table.HeaderCell className="cell pay">
                <PolyglotText
                  id="????????????-????????????-??????8"
                  defaultString="??????"
                />
              </Table.HeaderCell>
              <Table.HeaderCell className="cell date">
                {approvalDateName}
              </Table.HeaderCell>
              <Table.HeaderCell className="cell pay">
                <PolyglotText
                  id="????????????-????????????-??????9"
                  defaultString="?????? ????????????"
                />
                <Button
                  icon
                  className="img-icon"
                  onClick={() => this.onChangeOrderBy('ChargeAmountDesc')}
                >
                  <Icon
                    className="sort content ascending"
                    size="small"
                    color={this.getOrderByIconColor('ChargeAmountDesc')}
                  />
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {totalCount < 1 && (
              <Table.Row className="row">
                <Table.Cell colSpan="10">
                  <div className="no-cont-wrap">
                    <Icon className="no-contents80" />
                    <span className="blind">
                      <PolyglotText
                        id="????????????-????????????-????????????title"
                        defaultString="????????? ??????"
                      />
                    </span>
                    <div className="text">{noTitle}</div>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
            {approvalCubes.map((cube, index) => {
              return (
                <Table.Row className="row" key={cube.studentId}>
                  <Table.Cell className="cell ck">
                    <Checkbox
                      className="base"
                      value={cube.studentId}
                      checked={selectedList.includes(cube.studentId)}
                      onChange={(e: any, data: any) =>
                        this.checkOne(data.value)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell className="cell num">
                    {totalCount - index}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => handleClickCubeRow(cube.studentId)}
                    className="cell name"
                  >
                    <a>
                      <span className="ellipsis">{cube.studentName}</span>
                    </a>
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => handleClickCubeRow(cube.studentId)}
                    className="cell team"
                  >
                    <a>
                      <span className="ellipsis">
                        {parsePolyglotString(cube.studentDepartmentNames)}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => handleClickCubeRow(cube.studentId)}
                    className="cell title"
                  >
                    <a>
                      <span className="ellipsis">
                        {parsePolyglotString(cube.cubeName)}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => handleClickCubeRow(cube.studentId)}
                    className="cell class"
                  >
                    <a>
                      <span className="ellipsis">{cube.round}</span>
                    </a>
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => handleClickCubeRow(cube.studentId)}
                    className="cell status"
                  >
                    <a>
                      <span className="ellipsis">
                        {cube.approvedStudentCount}/{cube.capacity}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => handleClickCubeRow(cube.studentId)}
                    className="cell term"
                  >
                    <a>
                      <span className="ellipsis">
                        {cube.learningStartDate}
                        <br />~ {cube.learningEndDate}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => handleClickCubeRow(cube.studentId)}
                    className="cell status"
                  >
                    <a>
                      <span className="ellipsis">
                        {this.getProposalStateString(cube.proposalState)}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => handleClickCubeRow(cube.studentId)}
                    className="cell date"
                  >
                    <a>
                      <span className="ellipsis">
                        {cube.registeredTime &&
                          moment(cube.registeredTime).format('YYYY.MM.DD')}
                      </span>
                    </a>
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => handleClickCubeRow(cube.studentId)}
                    className="cell pay"
                  >
                    <a>
                      <span className="ellipsis">
                        {numeral(cube.chargeAmount).format('0,0')}
                      </span>
                    </a>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ApprovalListView;
