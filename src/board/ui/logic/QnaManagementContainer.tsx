import React from 'react';
import { Radio } from 'semantic-ui-react';
import { inject } from 'mobx-react';
import { ReactComponent, mobxHelper } from '@nara.platform/accent';

import SubActions from '../../../shared/components/SubActions';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';

import SupportService from '../../present/logic/SupportService';
import Pagination from '../../../shared/components/Pagination';
import QnaManagementListView from '../view/QnaManagementListView';

interface Props {}

interface State {
  answered: string;
  isLoading: boolean;
}

interface Injected {
  supportService: SupportService;
}

@inject(mobxHelper.injectFrom('board.supportService'))
class QnaManagementContainer extends ReactComponent<Props, State, Injected> {
  //
  paginationKey = 'QnAManagement';
  state: State = {
    answered: 'all',
    isLoading: false,
  };

  render() {
    //
    const { supportService } = this.injected;
    const { answered, isLoading } = this.state;

    return (
      <>
        <div className="support-list-wrap">
          <SubActions>
            <SubActions.Left>
              <SubActions.Count number={0} />
            </SubActions.Left>
            <SubActions.Right>
              <div className="list-top">
                <div className="radio-wrap">
                  <Radio
                    className="base"
                    label={getPolyglotText('모두 보기', 'support-qna-rall')}
                    name="radioGroup"
                    value="all"
                    checked={answered === 'all'}
                    onChange={(e: any, data: any) => {}}
                  />
                  <Radio
                    className="base"
                    label={getPolyglotText('답변 완료', 'support-qna-rdn')}
                    name="radioGroup"
                    value="true"
                    checked={answered === 'true'}
                    onChange={(e: any, data: any) => {}}
                  />
                  <Radio
                    className="base"
                    label={getPolyglotText('답변 대기', 'support-qna-rwt')}
                    name="radioGroup"
                    value="false"
                    checked={answered === 'false'}
                    onChange={(e: any, data: any) => {}}
                  />
                </div>
              </div>
            </SubActions.Right>

            <Pagination name={this.paginationKey} onChange={() => {}}>
              <QnaManagementListView />

              <Pagination.Navigator />
            </Pagination>
          </SubActions>
        </div>
      </>
    );
  }
}

export default QnaManagementContainer;
