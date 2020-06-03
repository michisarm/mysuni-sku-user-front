
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import {
  Select, Radio, Button, Icon,
} from 'semantic-ui-react';

import ApprovalProcessModal from './ApprovalProcessModal';
import ApprovalProcessModalRejected from './ApprovalProcessModalRejected';
import { ProposalState } from '../../../shared/model';

interface Props {
  totalCount: number
  searchSelectOptions: any[]
  searchState: any
  setContentsProvider: () => []
  defaultValue?: string
  targetProps?: string
  onSetCubeIntroPropsByJSON: (name: string, value: string) => void
  onExcelDownloadClick: () => void
  onSearchProposalStateChange: (searchState: ProposalState) => void
}

@reactAutobind
@observer
class ApprovalListPanelTopLineView extends React.Component<Props> {
  handleSearchProposalStateChange(e:any, data: any) {
    const { onSearchProposalStateChange } = this.props;
    onSearchProposalStateChange(data.value);
  }

  render() {
    //
    const { defaultValue, targetProps, onSetCubeIntroPropsByJSON, onExcelDownloadClick, searchState, setContentsProvider } = this.props;
    const contentsProviderTsx = setContentsProvider();

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
                onChange={this.handleSearchProposalStateChange}
              />
              <Radio
                className="base"
                label="반려"
                name="radioGroup"
                value="Rejected"
                checked={searchState === 'Rejected'}
                onChange={this.handleSearchProposalStateChange}
              />
              <Radio
                className="base"
                label="승인"
                name="radioGroup"
                value="Approved"
                checked={searchState === 'Approved'}
                onChange={this.handleSearchProposalStateChange}
              />
            </div>
          </div>

          <div className="bottom">
            <div className="left-area">
              <div className="actions top">

                {searchState !== 'Submitted' ? '' :
                <>
                  <ApprovalProcessModalRejected
                    trigger={(
                      <Button icon className="left post return">
                        <Icon className="return"/> 반려
                      </Button>
                    )}
                  />
                  <ApprovalProcessModal
                    trigger={(
                      <Button icon className="left post approval">
                        <Icon className="approval"/> 승인
                      </Button>
                    )}
                  />
                </>
                }
                <span className="excel-wrap">
                  <Button icon className="left post excel-down" onClick={onExcelDownloadClick}>
                    <Icon className="excel-down" /> 엑셀 다운로드
                  </Button>
                </span>
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

