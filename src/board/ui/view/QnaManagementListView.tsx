import React from 'react';
import { Table } from 'semantic-ui-react';
import { NoSuchContentPanel } from '../../../shared/components/NoSuchContentPanel';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';
import moment from 'moment';

interface Props {
  // qnas: PostModel[];
  // startNo: number;
  // onClickPost: (postId: string) => void;
}

class QnaManagementListView extends React.Component<Props> {
  //
  render() {
    //
    // const { posts, startNo, onClickPost } = this.props;

    return (
      <>
        <Table celled selectable>
          <colgroup>
            <col width="2%" />
            <col width="10%" />
            <col width="10%" />
            <col />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell className="title-header">No.</Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                접수채널
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                카테고리
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                문의제목
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                문의일자
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                문의자
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                담당자
              </Table.HeaderCell>
              <Table.HeaderCell className="title-header">
                처리상태
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/*{})) ||*/}(
            <Table.Row>
              <Table.Cell textAlign="center" colSpan={4}>
                <NoSuchContentPanel
                  message={getPolyglotText(
                    '등록된 Q&A가 없습니다.',
                    'support-noti-목록없음'
                  )}
                />
              </Table.Cell>
            </Table.Row>
            {/*)}*/}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default QnaManagementListView;
