
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import {
  Select, Radio, Button, Icon,
} from 'semantic-ui-react';
import moment from 'moment';

import ApprovalProcessModal from './ApprovalProcessModal';
import ApprovalProcessModalRejected from './ApprovalProcessModalRejected';
import { ProposalState } from '../../../shared/model';
import SelectOptions from '../model/SelectOptions';

interface Props {
  totalCount: number
  searchSelectOptions: any[]
  searchState: any
  lectures: any[]
  defaultValue?: string
  targetProps?: string
  onSetCubeIntroPropsByJSON: (name: string, value: string) => void
  onExcelDownloadClick: () => void
  onSearchProposalStateChange: (searchState: ProposalState) => void
  onSearchStartDateChange: (startDate: number) => void
}

@reactAutobind
@observer
class ApprovalListPanelTopLineView extends React.Component<Props> {
  handleSearchProposalStateChange(e:any, data: any) {
    const { onSearchProposalStateChange } = this.props;
    onSearchProposalStateChange(data.value);
  }

  handleSearchPeriodChange(e:any, data: any) {
    const { onSearchStartDateChange } = this.props;
    let startDateMoment: moment.Moment = moment(0);
    const now: moment.Moment = moment().startOf('day');
    switch (data.value) {
      case '2': startDateMoment = now.subtract(7, 'days');
        break;
      case '3': startDateMoment = now.subtract(14, 'days');
        break;
      case '4': startDateMoment = now.subtract(1, 'months');
        break;
      case '5': startDateMoment = now.subtract(6, 'months');
        break;
      case '6': startDateMoment = now.subtract(1, 'years');
        break;
      case '1':
      default:
        // 전체
    }
    onSearchStartDateChange(startDateMoment.toDate().getTime());
  }

  render() {
    //
    const { defaultValue, targetProps, onSetCubeIntroPropsByJSON, onExcelDownloadClick, searchState, lectures } = this.props;

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
                        <Icon className="return" /> 반려
                      </Button>
                    )}
                  />
                  <ApprovalProcessModal
                    trigger={(
                      <Button icon className="left post approval">
                        <Icon className="approval" /> 승인
                      </Button>
                    )}
                  />
                </>
                }
                <ExcelDownloadButton splitter={searchState === 'Submitted'} onClick={ onExcelDownloadClick } />
              </div>
            </div>

            <div className="right-area">
              <Select
                placeholder = "과정선택"
                options={lectures}
                onChange={(e: any, data: any) => onSetCubeIntroPropsByJSON(`${targetProps}`, data.value)}
                value={defaultValue && defaultValue}
                className="ui small-border dropdown selection list-title-sel"
              />
              <Select
                placeholder = "교육기간"
                options = {SelectOptions.approvalSearchStartDate}
                onChange={this.handleSearchPeriodChange}
                value={defaultValue && defaultValue}
                className="ui small-border dropdown selection list-num-sel"
              />
            </div>
          </div>
        </div>
      </>
    );
  }

}

interface ExcelDownloadButtonProps {
  splitter: boolean
  onClick: () => void
}
function ExcelDownloadButton(props:ExcelDownloadButtonProps ) {
  const { onClick, splitter = false } = props;
  function renderDownloadButton() {
    return (
      <Button icon className="left post excel-down" onClick={onClick}>
        <Icon className="excel-down" /> 엑셀 다운로드
      </Button>
    );
  }
  return splitter ? (
    <span className="excel-wrap">
      {renderDownloadButton()}
    </span>
  ) : renderDownloadButton();
}

export default ApprovalListPanelTopLineView;

