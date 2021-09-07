import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { Select, Radio, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
import ApprovalProcessModal from './ApprovalProcessModal';
import ApprovalProcessModalRejected from './ApprovalProcessModalRejected';
import { ProposalState } from '../../../shared/model';
import SelectOptions from '../model/SelectOptions';
import { ApprovalCubeService } from '../../stores';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

interface Props {
  totalCount: number;
  searchSelectOptions: any[];
  searchState: any;
  lectures: any[];
  defaultValue?: string;
  targetProps?: string;
  onSetCubeIntroPropsByJSON: (name: string, value: string) => void;
  onExcelDownloadClick: () => void;
  onSearchProposalStateChange: (searchState: ProposalState) => void;
  onSearchDateChange: (startDate: number) => void;
  approvalCubeService?: ApprovalCubeService;
}

interface States {
  approvalProcessModalRejectedOpen: boolean;
  approvalProcessModalOpen: boolean;
}
@inject(mobxHelper.injectFrom('approvalCube.approvalCubeService'))
@reactAutobind
@observer
class ApprovalListPanelTopLineView extends React.Component<Props, States> {
  state = {
    approvalProcessModalRejectedOpen: false,
    approvalProcessModalOpen: false,
  };

  handleSearchProposalStateChange(e: any, data: any) {
    const { onSearchProposalStateChange } = this.props;
    this.checkRemoveAll();
    onSearchProposalStateChange(data.value);
  }

  // 전체 삭제
  checkRemoveAll() {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) {
      approvalCubeService.changeSelectedStudentProps([]);
      approvalCubeService.changeSelectedProposalStateProps([]);
    }
  }

  handleSearchPeriodChange(e: any, data: any) {
    const { onSearchDateChange } = this.props;
    let searchDateMoment: moment.Moment = moment(9999999999999);
    const now: moment.Moment = moment().startOf('day');
    switch (data.value) {
      case '2':
        searchDateMoment = now.add(7, 'days');
        break;
      case '3':
        searchDateMoment = now.add(14, 'days');
        break;
      case '4':
        searchDateMoment = now.add(1, 'months');
        break;
      case '5':
        searchDateMoment = now.add(6, 'months');
        break;
      case '6':
        searchDateMoment = now.add(1, 'years');
        break;
      case '1':
      default:
      // 전체
    }
    onSearchDateChange(searchDateMoment.toDate().getTime());
  }

  handleRejectClick() {
    const { approvalCubeService } = this.props;
    const { selectedList } = approvalCubeService!;

    if (selectedList.length < 1) {
      reactAlert({
        title: getPolyglotText('알림', '승인관리-유료과정-알림3'),
        message: getPolyglotText(
          '반려하실 건을 선택해주세요.',
          '승인관리-유료과정-반려선택'
        ),
      });
      return;
    }

    this.setState({ approvalProcessModalRejectedOpen: true });
  }

  handleApproveClick() {
    const { approvalCubeService } = this.props;
    const { selectedList } = approvalCubeService!;

    if (selectedList.length < 1) {
      reactAlert({
        title: getPolyglotText('알림', '승인관리-유료과정-알림5'),
        message: getPolyglotText(
          '승인하실 건을 선택해주세요.',
          '승인관리-유료과정-승인선택'
        ),
      });
      return;
    }

    this.setState({ approvalProcessModalOpen: true });
  }

  render() {
    //
    const {
      defaultValue,
      targetProps,
      onSetCubeIntroPropsByJSON,
      onExcelDownloadClick,
      searchState,
      lectures,
      approvalCubeService,
    } = this.props;

    return (
      <>
        <div className="list-top">
          <div className="top">
            <div className="right-area">
              <Radio
                className="base"
                label={getPolyglotText('전체', '승인관리-유료과정-전체2')}
                name="radioGroup"
                value=""
                checked={searchState === ''}
                onChange={this.handleSearchProposalStateChange}
              />
              <Radio
                className="base"
                label={getPolyglotText('승인요청', '승인관리-유료과정-승요')}
                name="radioGroup"
                value="Submitted"
                checked={searchState === 'Submitted'}
                onChange={this.handleSearchProposalStateChange}
              />
              <Radio
                className="base"
                label={getPolyglotText('반려dd', '승인관리-유료과정-반려2')}
                name="radioGroup"
                value="Rejected"
                checked={searchState === 'Rejected'}
                onChange={this.handleSearchProposalStateChange}
              />
              <Radio
                className="base"
                label={getPolyglotText('승인dd', '승인관리-유료과정-승인2')}
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
                {searchState !== 'Submitted' ? (
                  ''
                ) : (
                  <>
                    <Button
                      icon
                      className="left post return"
                      onClick={this.handleRejectClick}
                    >
                      <Icon className="return" />
                      <PolyglotText
                        id="승인관리-유료과정-반려"
                        defaultString="반려"
                      />
                    </Button>
                    <ApprovalProcessModalRejected
                      open={this.state.approvalProcessModalRejectedOpen}
                      onCloseModal={() =>
                        this.setState({
                          approvalProcessModalRejectedOpen: false,
                        })
                      }
                      approvalCubeService={approvalCubeService}
                    />
                    <Button
                      icon
                      className="left post approval"
                      onClick={this.handleApproveClick}
                    >
                      <Icon className="approval" />
                      <PolyglotText
                        id="승인관리-유료과정-승인"
                        defaultString="승인"
                      />
                    </Button>
                    <ApprovalProcessModal
                      open={this.state.approvalProcessModalOpen}
                      onCloseModal={() =>
                        this.setState({ approvalProcessModalOpen: false })
                      }
                      approvalCubeService={approvalCubeService}
                    />
                  </>
                )}
                <ExcelDownloadButton
                  splitter={searchState === 'Submitted'}
                  onClick={onExcelDownloadClick}
                />
              </div>
            </div>

            <div className="right-area">
              <Select
                placeholder={getPolyglotText(
                  '과정선택',
                  '승인관리-유료과정-과정선택'
                )}
                options={lectures}
                onChange={(e: any, data: any) =>
                  onSetCubeIntroPropsByJSON(`${targetProps}`, data.value)
                }
                value={defaultValue && defaultValue}
                className="ui small-border dropdown selection list-title-sel"
              />
              <Select
                placeholder={getPolyglotText(
                  '교육기간',
                  '승인관리-유료과정-교육기간'
                )}
                options={SelectOptions.approvalSearchDate}
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
  splitter: boolean;
  onClick: () => void;
}
function ExcelDownloadButton(props: ExcelDownloadButtonProps) {
  const { onClick, splitter = false } = props;
  function renderDownloadButton() {
    return (
      <Button icon className="left post excel-down" onClick={onClick}>
        <Icon className="excel-down" />
        <PolyglotText
          id="승인관리-유료과정-엑셀다운"
          defaultString="엑셀 다운로드"
        />
      </Button>
    );
  }
  return splitter ? (
    <span className="excel-wrap">{renderDownloadButton()}</span>
  ) : (
    renderDownloadButton()
  );
}

export default ApprovalListPanelTopLineView;
