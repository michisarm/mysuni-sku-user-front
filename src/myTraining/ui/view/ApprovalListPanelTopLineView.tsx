
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import {
  Segment, Checkbox, Select, Radio, Button, Icon, Table, Form
} from 'semantic-ui-react';

import { ListPanelTopLine } from 'shared';
import { SearchFilterType } from 'shared/model';

import EnumUtil, { CubeStateView } from 'shared/ui/logic/EnumUtil';

import ApprovalApplyStatusModal from './ApprovalApplyStatusModal';
import ApprovalActionButtons from './ApprovalActionButtons';

import ApprovalProcessModal from './ApprovalProcessModal';

import IdName from '../../../shared/model/IdName';

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
  totalCount: number
  searchSelectOptions: any[]
  onChange: (e: any, data: any) => void
  searchState: any
  setContentsProvider: () => []
  defaultValue?: string
  targetProps?: string
  onSetCubeIntroPropsByJSON: (name: string, value: string) => void
}

@reactAutobind
@observer
class ApprovalListPanelTopLineView extends React.Component<Props> {

  state = {
    approvalStatus : 'Submitted',
  };

  statusChange = (approvalStatus: any) => {
    console.log(' approvalStatus :: ' + approvalStatus );

    this.setState({
      approvalStatus,
    });
  };

  render() {
    //
    const { defaultValue, targetProps, onSetCubeIntroPropsByJSON, totalCount, searchSelectOptions, onChange, searchState, setContentsProvider } = this.props;
    const { approvalStatus } = this.state;
    const contentsProviderTsx = setContentsProvider();
    
    console.log('render approvalStatus ::' + approvalStatus);
    console.log('render searchState ::' + searchState);
    //console.log('render onSetCubeIntroPropsByJSON ::' + onSetCubeIntroPropsByJSON);
    //console.log('render contentsProviderTsx ::' + contentsProviderTsx);

    return (
      <>
        <div className="list-top">
          <div className="top">
            <div className="right-area">
              <Radio
                className="base"
                label="승인요청"
                name="radioGroup"
                value="Submitted"
                checked={searchState === 'Submitted'}
                onChange={onChange}
              />
              <Radio
                className="base"
                label="반려"
                name="radioGroup"
                value="Rejected"
                checked={searchState === 'Rejected'}
                onChange={onChange}
              />
              <Radio
                className="base"
                label="승인"
                name="radioGroup"
                value="Approved"
                checked={searchState === 'Approved'}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="bottom">
            <div className="left-area">
              <div className="actions top">

                {searchState !== 'Submitted' ? '' :
                <>
                  <ApprovalProcessModal
                    trigger={(
                      <Button icon className="left post return">
                        <Icon className="return"/> 반려
                      </Button>
                    )}
                  />
                  < ApprovalProcessModal
                    trigger={(
                      <Button icon className="left post approval">
                        <Icon className="approval"/> 승인
                      </Button>
                    )}
                  />
                </>
                }

              </div>
            </div>

            <div className="right-area">
              <Select
                placeholder = "과정선택"
                options = {contentsProviderTsx}
                onChange={(e: any, data: any) => onSetCubeIntroPropsByJSON(`${targetProps}`, data.value)}
                value={defaultValue && defaultValue}
                className="ui small-border dropdown selection list-title-sel"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default ApprovalListPanelTopLineView;

