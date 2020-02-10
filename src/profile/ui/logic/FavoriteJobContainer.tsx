
import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Form, Button, Icon, Select } from 'semantic-ui-react';
import classNames from 'classnames';
import { IdName } from 'shared';
import { JobGroupService } from 'college';

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
class FavoriteJobContainer extends React.Component<Props, State> {
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
      this.props.history.push(routePaths.favoriteLearningType());
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
      <Form>
        <h3 className="title-filter">관심직무 선택</h3>
        <div className="select-cont-wrap">
          <div className="select-box">
            <div className="select-title">관심 있는 직군을 선택해주세요.</div>
            <Select
              placeholder="선택해주세요"
              options={selectOptionJobGroup}
              value={favoriteJobGroup && favoriteJobGroup.favoriteJobGroup && favoriteJobGroup.favoriteJobGroup.id}
              onChange={(event:any, data:any) => this.selectJobGroup(event, data)}
            />
          </div>
          {
            favoriteJobGroup && favoriteJobGroup.favoriteJobGroup && favoriteJobGroup.favoriteJobGroup.id && favoriteJobGroup.favoriteJobGroup.id !== 'etc' ? (
              <div className="select-box">
                <div className="select-title">관심 있는 직무를 선택해주세요.</div>
                <Select
                  placeholder="선택해주세요"
                  options={selectOptionJobDuty}
                  value={
                    member && member.favoriteJobGroup && member.favoriteJobGroup.favoriteJobDuty
                    && member.favoriteJobGroup.favoriteJobDuty.id
                  }
                  onChange={(event:any, data:any) => this.selectJobDuty(event, data)}
                />
              </div>
            ) : ''
          }
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
          <Button className="fix line" onClick={() => this.onPreviousClick()}>Previous</Button>
          <Button className="fix bg" onClick={() => this.onNextClick()}>Next</Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(FavoriteJobContainer);
