
import React, {Component} from 'react';
import {
  Segment, Checkbox, Select, Radio, Button, Icon
} from 'semantic-ui-react';

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

class ApprovalManagerBoard extends Component {

  state = {
    approvalStatus : 'required',
    approvalDateName : '신청일자',
  };

  statusChange = (approvalStatus: any) => {
    console.log(' approvalStatus :: ' + approvalStatus );

    let approvalNameVal = '신청일자';

    if ( approvalStatus === 'required' ) {
      approvalNameVal = '신청일자';
    } else if ( approvalStatus === 'rejected' ) {
      approvalNameVal = '반려일자';
    } else if ( approvalStatus === 'approved' ) {
      approvalNameVal = '승인일자';
    } else {
      approvalNameVal = '신청일자';
    }

    const approvalDateName = approvalNameVal;

    this.setState({
      approvalStatus,
      approvalDateName,
    });
  };

  render(){

    const { approvalStatus } = this.state;
    const approvalDateName = this.state.approvalDateName;

    return(
      <Segment className="full">
        <div className="confirm-list-wrap">
          <div className="list-top">
            <div className="top">
              <div className="right-area">
                <Radio
                  className="base"
                  label="승인요청(20)"
                  name="radioGroup"
                  value="required"
                  checked={approvalStatus === 'required'}
                  onChange={(e: any, data: any) => {
                    this.statusChange(data.value);
                  }}
                />
                <Radio
                  className="base"
                  label="반려(20)"
                  name="radioGroup"
                  value="rejected"
                  checked={approvalStatus === 'rejected'}
                  onChange={(e: any, data: any) => {
                    this.statusChange(data.value);
                  }}
                />
                <Radio
                  className="base"
                  label="승인(20)"
                  name="radioGroup"
                  value="approved"
                  checked={approvalStatus === 'approved'}
                  onChange={(e: any, data: any) => {
                    this.statusChange(data.value);
                  }}
                />
              </div>
            </div>
            <div className="bottom">
              <div className="left-area">
                <div className="actions top">

                  {approvalStatus !== 'required' ? '' :
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

                    {/*0514 엑셀다운로드 추가*/}
                    <span className="excel-wrap">
                      <Button icon className="left post excel-down">
                        <Icon className="excel-down"/> 엑셀 다운로드
                      </Button>
                    </span>
                  </>
                  }

                  {/*Delete 버튼은 승인요청 목록에는 미노출*/}
                  {approvalStatus === 'required' ?
                    ''
                    :
                    <Button icon className="left post delete">
                      <Icon className="del24"/> Delete
                    </Button>
                  }
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

                <Select
                  placeholder="교육기간"
                  className="ui small-border dropdown selection list-num-sel"
                  options={termOptions}
                />

              </div>
            </div>
          </div>

          {/*목록*/}
          {/*0514 조직, 신청현황, 교육금액 컬럼 추가*/}
          <div className="confirm-list typeA">
            <div className="row thead">
              <span className="cell ck">
                <Checkbox className="base"/>
              </span>
              <span className="cell num">No</span>
              <span className="cell name">신청자</span>
              <span className="cell team">조직</span>
              <span className="cell title">과정명</span>
              <span className="cell class">차수</span>
              <span className="cell status">신청현황</span>
              <span className="cell term">
                <a href="#">
                  (차수)교육기간
                  <Icon className="list-down16" />
                </a>
              </span>
              <span className="cell date">{ approvalDateName }</span>
              <span className="cell pay">
                <a href="#">
                  인당 교육금액
                  <Icon className="list-down16"/>
                </a>
              </span>
            </div>

            {/*목록body*/}
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">20</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">19</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">18</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">17</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">16</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">15</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">14</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">13</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">12</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
            <div className="row">
              <span className="cell ck">
                <Checkbox className="base" />
              </span>
              <span className="cell num">11</span>
              <span className="cell name">
                <a href="/my-training/my-page/ApprovalList/detail">
                  <span className="ellipsis">홍길동</span>
                </a>
              </span>
              <span className="cell team">
                <span className="ellipsis">개발1팀</span>
              </span>
              <span className="cell title">
                <a href="/my-training/my-page/ApprovalList/detail" className="ellipsis">
                  AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!AI와 Block chain과의 상관관계는 어떻게 되는가?!
                </a>
              </span>
              <span className="cell class">1</span>
              <span className="cell status">21/40</span>
              <span className="cell term">2020.02.20<br/>~2020.03.20</span>
              <span className="cell date">2019.10.08</span>
              <span className="cell pay">20,000</span>
            </div>
          </div>

          {/*더보기 버튼 - 목록이 20개 이상일 때 노출*/}
          <div className="more-comments">
            <Button icon className="left moreview">
              <Icon className="moreview"/> <span>list more</span>
            </Button>
          </div>

        </div>
      </Segment>
    );
  }

}

export default ApprovalManagerBoard;
