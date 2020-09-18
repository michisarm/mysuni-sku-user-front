import * as React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Form, Table } from 'semantic-ui-react';
import depot, { DepotFileViewModel } from '@nara.drama/depot';
import moment from 'moment';
import { AplState } from '../../model/AplState';
import { AplType } from '../../model/AplType';
import AplService from '../../present/logic/AplService';

interface Props {
  //menuMain: MenuMainModel
  aplService?: AplService;
}

@observer
@reactAutobind
class OpenedAplBasicInfoView extends React.Component<Props> {
  //
  render() {
    //const { menuMain } = this.props;
    const { apl } = this.props.aplService || ({} as AplService);
    return (
      <Table celled key={5}>
        <colgroup>
          <col width="20%" />
          <col width="80%" />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={2} className="title-header">
              생성정보
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell className="tb-header">생성자 및 일시</Table.Cell>
            <Table.Cell>
              {apl.creatorName} |{' '}
              {moment(apl.creationTime).format('YYYY.MM.DD HH:mm:ss')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="tb-header">변경자 및 일시</Table.Cell>
            <Table.Cell>
              {apl.creatorName} |{' '}
              {moment(apl.creationTime).format('YYYY.MM.DD HH:mm:ss')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="tb-header">
              Main 편성 Set 상태
            </Table.Cell>
            {(apl.state === AplState.Created && (
              <Table.Cell>승인요청</Table.Cell>
            )) ||
              (apl.state === AplState.OpenApproval && (
                <Table.Cell>승인대기</Table.Cell>
              )) ||
              (apl.state === AplState.Opened && (
                <Table.Cell>승인완료</Table.Cell>
              )) || <Table.Cell />}
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default OpenedAplBasicInfoView;
