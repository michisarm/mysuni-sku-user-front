
import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Form, Button, Icon, Select, Input } from 'semantic-ui-react';
import classNames from 'classnames';
import { IdName } from 'shared/model';
import { JobGroupService } from 'college/stores';

import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';
import SkProfileUdo from '../../model/SkProfileUdo';


interface Props extends RouteComponentProps {
  jobGroupService?: JobGroupService
  skProfileService?: SkProfileService
}

interface State {
  focus : boolean
}

@inject(mobxHelper.injectFrom(
  'college.jobGroupService',
  'profile.skProfileService'))
@observer
@reactAutobind
class CurrentJobContainer extends React.Component<Props, State> {
  //
  state = {
    focus: false,
  };

  componentDidMount(): void {
    //
    const { jobGroupService, skProfileService } = this.props;

    jobGroupService!.findAllJobGroups();
    skProfileService!.findSkProfile().then((skProfile) => {
      //
      const favoriteJobGroup = skProfile.member.favoriteJobGroup.favoriteJobGroup;

      if (skProfile.member.favoriteJobGroup.favoriteJobGroup) {
        jobGroupService!.findJobGroupById(favoriteJobGroup.id);
      }
    });
  }

  setJobGroup() {
    //
    const { jobGroups } = this.props.jobGroupService!;
    const jobGroupSelect : any = [];

    if (jobGroups) {
      jobGroupSelect.push({ key: 0, value: '', text: '선택해주세요' });
      jobGroups.map((jobGroup, index ) => {
        jobGroupSelect.push({ key: index + 1, value: jobGroup.jobGroupId, text: jobGroup.name });
      });
      jobGroupSelect.push({ key: jobGroups.length + 1, value: 'etc', text: '기타' });
    }
    return jobGroupSelect;
  }

  selectJobGroup(event:any, data:any ) {
    //
    const { jobGroupService, skProfileService } = this.props;

    jobGroupService!.findJobGroupById(data.value);
    skProfileService!.setFavoriteJobGroupProp('favoriteJobGroup', { id: data.value, name: event.target.innerText });
    skProfileService!.setFavoriteJobGroupProp('favoriteJobDuty', new IdName());
  }

  setJobDuties() {
    //
    const { jobGroup } = this.props.jobGroupService!;
    const jobDutySelect : any = [];

    if (jobGroup) {
      jobGroup.jobDuties.map((jobDuty, index) => {
        jobDutySelect.push({ key: index + 1, value: jobDuty.id, text: jobDuty.name });
      });
    }

    return jobDutySelect;
  }

  selectJobDuty(event: any, data: any ) {
    //
    const { skProfileService } = this.props;

    this.setState({
      focus: false,
    });

    skProfileService!.setFavoriteJobGroupProp('favoriteJobDuty', { id: data.value, name: event.target.innerText });
  }

  selectEtcJobDuty(data: any) {
    //
    const { skProfileService } = this.props;

    this.setState({
      focus: false,
    });

    skProfileService!.setFavoriteJobGroupProp('favoriteJobDuty', { id: 'etc', name: data.value } );
  }

  onPreviousClick() {
    this.props.history.push(routePaths.favoriteCollege());
  }

  onNextClick() {
    //
    const skProfileService = this.props.skProfileService!;
    const { skProfile } = skProfileService!;
    const { member } = skProfile!;
    const { favoriteJobGroup } = member!;

    let skProfileUdo : SkProfileUdo;

    if (!favoriteJobGroup.favoriteJobGroup || !favoriteJobGroup.favoriteJobGroup!.id
      || !favoriteJobGroup.favoriteJobDuty || !favoriteJobGroup.favoriteJobDuty!.id ) {
      reactAlert({ title: '알림', message: '관심 직군과 관심 직무를 선택해주세요.' });
    } else {
      skProfileUdo = new SkProfileUdo(skProfileService.skProfile.member.favoriteJobGroup, skProfileService.skProfile.pisAgreement);
      skProfileService.modifySkProfile(skProfileUdo);
      this.props.history.push(routePaths.favoriteJob());
    }
  }

  render() {
    //
    const selectOptionJobGroup = this.setJobGroup();
    const selectOptionJobDuty =  this.setJobDuties();
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService!;
    const { member } = skProfile!;
    const { favoriteJobGroup } = member!;

    return (
      <>
        <div className="title-box">
          <Icon className="login-sub2 woman"/>
          <h2>현직무</h2>
          <p>
            여러분은 어떤 직무 분야에 해당하시나요?<br/>
            수행하고 있는 업무를 기반으로 현 직무를 선택해주시기 바랍니다.<br/>
            직무분석이 완료된 관계사를 중심으로 반영되어 있으니, 해당하는 직무가 없을 경우 기타-직접입력으로 작성 해주세요.
          </p>
        </div>
        <Form>
          <div className="select-cont-wrap">
            <div className="select-box">
              <div className="select-title">Step 01. 현재 직무가 속해 있는 직군을 선택해주세요.</div>
              <Select
                placeholder="선택해주세요"
                options={selectOptionJobGroup}
                value={favoriteJobGroup && favoriteJobGroup.favoriteJobGroup && favoriteJobGroup.favoriteJobGroup.id}
                onChange={(event:any, data:any) => this.selectJobGroup(event, data)}
              />

              {/*기타 선택 시 직군, 직무 개별로 등록 가능*/}
              <Input
                className="h48"
                placeholder="Optional..."
              />

            </div>
            {/*{*/}
            {/*favoriteJobGroup && favoriteJobGroup.favoriteJobGroup && favoriteJobGroup.favoriteJobGroup.id && favoriteJobGroup.favoriteJobGroup.id !== 'etc' ? (*/}
            <div className="select-box">
              <div className="select-title">Step 02. 현재 직무를 선택해주세요.</div>
              <Select
                placeholder="선택해주세요"
                options={selectOptionJobDuty}
                value={
                  member && member.favoriteJobGroup && member.favoriteJobGroup.favoriteJobDuty
                  && member.favoriteJobGroup.favoriteJobDuty.id
                }
                onChange={(event:any, data:any) => this.selectJobDuty(event, data)}
              />

              {/*기타 선택 시 직군, 직무 개별로 등록 가능*/}
              <Input
                className="h48"
                placeholder="Optional..."
              />
            </div>
            {/*) : ''*/}
            {/*}*/}
            {
              favoriteJobGroup && favoriteJobGroup.favoriteJobGroup && favoriteJobGroup.favoriteJobGroup.id && favoriteJobGroup.favoriteJobGroup.id === 'etc' ? (
                <div className="select-box">
                  <div className="select-title">해당 되는 직무가 없을 경우 직접 입력해주세요.</div>
                  <div className={classNames('ui h48 input', { focus: this.state.focus, write: favoriteJobGroup && favoriteJobGroup.favoriteJobDuty && favoriteJobGroup.favoriteJobDuty.name })}>
                    <input type="text"
                      placeholder="Text.."
                      value={favoriteJobGroup && favoriteJobGroup.favoriteJobDuty && favoriteJobGroup.favoriteJobDuty.name}
                      onClick={() => this.setState({ focus: true })}
                      onChange={(e) => this.selectEtcJobDuty({ value: e.target.value })}
                    />
                    <Icon className="clear link" onClick={() => this.selectEtcJobDuty({ value: '' })} />
                  </div>
                </div>
              ) : ''
            }
          </div>
          {/*<div className="select-error">*/}
          {/*  <Icon className="error16" /><span className="blind">error</span>*/}
          {/*  <span>직군 및 직무를 선택해주세요.</span>*/}
          {/*</div>*/}
          <div className="button-area">
            <div className="error">직군 및 직무를 선택해주세요.</div>
            {/*<Button className="fix line" onClick={() => this.onPreviousClick()}>Previous</Button>*/}
            <Button className="fix bg" onClick={() => this.onNextClick()}>다음</Button>
          </div>
        </Form>
      </>
    );
  }
}

export default withRouter(CurrentJobContainer);
