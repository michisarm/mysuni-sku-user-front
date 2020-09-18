import * as React from 'react';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Grid, Icon, Radio, Select, Table } from 'semantic-ui-react';

import { AplCountModel } from '../../model/AplCountModel';
import { AplListViewModel } from '../../model/AplListViewModel';
import { AplService, AplModel } from '../..';
import { AplQueryModel } from '../../model/AplQueryModel';
import {AplState} from '../../model/AplState';
import {AplType} from '../../model/AplType';
import SelectType from '../../model/SelectType';
import EnumUtil, {AplStateView} from '../../../shared/ui/logic/EnumUtil';
import {AlertWin} from '../../../shared';

interface Props {
  result: AplListViewModel[];
  totalCount: number;
  aplCount: AplCountModel;
  // findAllaplsExcel: () => void
  routeToCreateApl: () => void;
  handleClickAplRow: (aplId: string) => void;
  pageIndex: number;
  setAplCountForFind: (name: string, value: string) => void;
  modifyMenuMain: (isUse: boolean, aplId: number) => void;
  aplService: AplService | undefined;
  aplQuery: AplQueryModel;
}


interface States {
  alertWinOpen: boolean;
  alertIcon: string;
  alertTitle: string;
  alertType: string;
  alertMessage: string;
}

@inject('aplService', 'sharedService')
@observer
@reactAutobind
class AplListView extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = {
      alertWinOpen: false,
      alertMessage: '',
      alertIcon: '',
      alertTitle: '',
      alertType: '',
    };
  }

  confirmBlank(message: string | any ) {
    //
    this.setState({
      alertMessage: message,
      alertWinOpen: true,
      alertTitle: '저장 안내',
      alertIcon: 'triangle',
      alertType: '안내',
    });
  }

  handleCloseAlertWin() {
    //
    this.setState({
      alertWinOpen: false,
    });
  }

  handleAlertOk(type: string) {
    //
    this.handleCloseAlertWin();
  }

  modifyMenuMain(isUse: boolean | undefined, aplId: number, state: string, endDate: number) {
    //
    const { modifyMenuMain } = this.props;
    let menuMainMessage = null;
    /*
    const toDateEnd = moment(new Date()).endOf('day').toDate().getTime();

    if(endDate < toDateEnd){
      //menuMainMessage = '노출기간 종료일자가 오늘 이후 일 경우 게시중 상태로 변경할 수 없습니다.';
      menuMainMessage = (
        <>
          <p className="center">
            {' '}
            저장된 노출기간의 종료일자가 오늘 이전 일 경우
          </p>
          <p className="center">
            {' '}
            게시중 상태로 변경할 수 없습니다.
          </p>
        </>
      );

      this.confirmBlank(menuMainMessage);
      return;
    }
    */

    if(state === AplState.Created){
      //menuMainMessage = '임시 저장 일 때는 게시중 상태로 변경할 수 없습니다.';
      menuMainMessage = (
        <>
          <p className="center">
            {' '}
            임시 저장 일 때는 게시중 상태로 변경할 수 없습니다.
          </p>
        </>
      );
      this.confirmBlank(menuMainMessage);
      return;
    }
    //노출 기간 체크 노출기간 종료일자보다 클경우 기간 종료 메세지
    modifyMenuMain(!isUse, aplId);
  }


  render() {
    const {
      result,
      totalCount,
      aplCount,
      routeToCreateApl,
      // , findAllaplsExcel
      handleClickAplRow,
      pageIndex,
      setAplCountForFind,
      aplQuery,
    } = this.props;

    const {
      alertWinOpen,
      alertMessage,
      alertIcon,
      alertTitle,
      alertType,
    } = this.state;

    return (
      <>
        <Grid className="list-info">
          <Grid.Row>
            <Grid.Column width={8}>
              <span>
                전체 <strong>{totalCount}</strong>개
                과정 Set 등록
              </span>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className="right">
                <Select
                  className="ui small-border dropdown m0"
                  defaultValue={SelectType.limit[0].value}
                  control={Select}
                  options={SelectType.limit}
                  onChange={(e: any, data: any) =>
                    setAplCountForFind('limit', data.value)
                  }
                />
                {/*<Button onClick={findAllaplsExcel}><Icon name="file excel outline" />엑셀 다운로드</Button>*/}
                <Button onClick={routeToCreateApl}>
                  <Icon name="plus" />
                  Create
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Table celled selectable>
          <colgroup>
            <col width="5%" />
            <col width="35%" />
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
            <col width="15%" />
          </colgroup>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">No</Table.HeaderCell>
              <Table.HeaderCell>
                과정 Set명
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">노출기간</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">생성자</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                최종 수정일자
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(result &&
              result.length &&
              result.map((apl: AplListViewModel, index) => {
                //const newapl = new AplListViewModel(apl);
                return (
                  <Table.Row key={index}>
                    <Table.Cell
                      textAlign="center"
                      onClick={() => handleClickAplRow(apl.id)}
                    >
                      {totalCount - index - pageIndex}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => handleClickAplRow(apl.id)}
                    >
                      {apl.title && apl.title}
                    </Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      onClick={() => handleClickAplRow(apl.id)}
                    >
                      {EnumUtil.getEnumValue(
                        AplStateView,
                        apl.state
                      ).get(apl.state)}
                    </Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      onClick={() => handleClickAplRow(apl.id)}
                    >
                      {moment(apl.startDate).format(
                        'YYYY.MM.DD'
                      ) +
                        ' ~ ' +
                        moment(apl.endDate).format('YYYY.MM.DD')}
                    </Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      onClick={() => handleClickAplRow(apl.id)}
                    >
                      {apl.creatorName}
                    </Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      onClick={() => handleClickAplRow(apl.id)}
                    >
                      {moment(apl.creationTime).format(
                        'YYYY.MM.DD'
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })) || (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan={9}>
                  <div className="no-cont-wrap no-contents-icon">
                    <Icon className="no-contents80" />
                    <div className="sr-only">콘텐츠 없음</div>
                    <div className="text">등록된 편성 Set이 없습니다.</div>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <AlertWin
          message={alertMessage}
          handleClose={this.handleCloseAlertWin}
          open={alertWinOpen}
          alertIcon={alertIcon}
          title={alertTitle}
          type={alertType}
          handleOk={this.handleAlertOk}
        />
      </>
    );
  }
}

export default AplListView;
