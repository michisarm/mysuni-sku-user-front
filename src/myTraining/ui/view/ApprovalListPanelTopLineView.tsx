
import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import {
  Segment, Checkbox, Select, Radio, Button, Icon, Table
} from 'semantic-ui-react';

import { ListPanelTopLine } from 'shared';
import { SearchFilterType } from 'shared/model';

import EnumUtil, { CubeStateView } from 'shared/ui/logic/EnumUtil';

import ApprovalApplyStatusModal from './ApprovalApplyStatusModal';
import ApprovalActionButtons from './ApprovalActionButtons';

import ApprovalProcessModal from './ApprovalProcessModal';

const classOptions = [
  { key: 'val01', value: 'val01', text: '전체과정' },
  { key: 'val02', value: 'val02', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val03', value: 'val03', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val04', value: 'val04', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val05', value: 'val05', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val06', value: 'val06', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val07', value: 'val07', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val08', value: 'val08', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val09', value: 'val09', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val10', value: 'val10', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' }
];

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
    const { totalCount, searchSelectOptions, onChange, searchState } = this.props;
    const { approvalStatus } = this.state;

    console.log('render approvalStatus ::' + approvalStatus);
    console.log('render searchState ::' + searchState);

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

                    {/*Delete 버튼은 승인요청 목록에는 미노출*/}
                    {searchState === 'Submitted' ?
                      ''
                      :
                      <Button icon className="left post delete">
                        <Icon className="del24"/> Delete
                      </Button>
                    }

                    {/*0514 엑셀다운로드 추가*/}
                    {/*0521 엑셀다운로드 위치 변경*/}
                    {/* <span className="excel-wrap">
                      <Button icon className="left post excel-down">
                        <Icon className="excel-down"/> 엑셀 다운로드
                      </Button>
                    </span> */}


                  </div>
                </div>

                <div className="right-area">

                  {/*신청현황 모달팝업*/}
                  {/*0514 신청현황 -> 목록으로 이동*/}
                  {/*<ApprovalApplyStatusModal/>*/}

                  <Select
                    placeholder="전체과정"
                    className="ui small-border dropdown selection list-title-sel"
                    options={classOptions}
                  />

                  {/*0514 차수선택 => 교육기간으로 변경*/}
                  {/*<Select*/}
                  {/*placeholder="전체차수"*/}
                  {/*className="ui small-border dropdown selection list-num-sel"*/}
                  {/*options={numOptions}*/}
                  {/*/>*/}

                  {/* <Select
                    placeholder="교육기간"
                    className="ui small-border dropdown selection list-num-sel"
                    options={termOptions}
                  /> */}

                </div>
              </div>
            </div>

          </div>
        </Segment>
      </>
    );
  }

}

export default ApprovalListPanelTopLineView;
