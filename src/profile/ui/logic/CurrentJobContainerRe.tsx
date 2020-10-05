/* eslint-disable */
import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Form, Button, Icon, Select } from 'semantic-ui-react';
import classNames from 'classnames';
import { IdName } from 'shared/model';
import { JobGroupService } from 'college/stores';

import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';
import SkProfileUdo from '../../model/SkProfileUdo';

interface Props extends RouteComponentProps {
  jobGroupService?: JobGroupService;
  skProfileService?: SkProfileService;
}

interface State {
  focus: boolean;
}

@inject(
  mobxHelper.injectFrom('college.jobGroupService', 'profile.skProfileService')
)
@observer
@reactAutobind
class CurrentJobContainerRe extends React.Component<Props, State> {
  //
  state = {
    focus: false,
  };

  componentDidMount(): void {
    //
    const { jobGroupService, skProfileService } = this.props;

    jobGroupService!.findAllJobGroups();
    skProfileService!.findSkProfile().then(skProfile => {
      //
      const currentJobGroup = skProfile.member.currentJobGroup.currentJobGroup;

      if (skProfile.member.currentJobGroup.currentJobGroup) {
        jobGroupService!.findJobGroupById(currentJobGroup.id);
      }
    });
  }

  setJobGroup() {
    //
    const { jobGroups } = this.props.jobGroupService!;
    const jobGroupSelect: any = [];

    if (jobGroups) {
      jobGroupSelect.push({ key: 0, value: '', text: '선택해주세요' });
      jobGroups.map((jobGroup, index) => {
        jobGroupSelect.push({
          key: index + 1,
          value: jobGroup.jobGroupId,
          text: jobGroup.name,
        });
      });
      jobGroupSelect.push({
        key: jobGroups.length + 1,
        value: 'etc',
        text: '기타',
      });
    }
    return jobGroupSelect;
  }

  selectJobGroup(event: any, data: any) {
    //
    const { jobGroupService, skProfileService } = this.props;

    jobGroupService!.findJobGroupById(data.value);
    skProfileService!.setCurrentJobGroupProp('currentJobGroup', {
      id: data.value,
      name: event.target.innerText,
    });
    skProfileService!.setCurrentJobGroupProp('currentJobDuty', new IdName());
  }

  setJobDuties() {
    //
    const { jobGroup } = this.props.jobGroupService!;
    const jobDutySelect: any = [];

    if (jobGroup) {
      jobGroup.jobDuties.map((jobDuty, index) => {
        jobDutySelect.push({
          key: index + 1,
          value: jobDuty.id,
          text: jobDuty.name,
        });
      });
    }

    return jobDutySelect;
  }

  selectJobDuty(event: any, data: any) {
    //
    const { skProfileService } = this.props;

    this.setState({
      focus: false,
    });

    skProfileService!.setCurrentJobGroupProp('currentJobDuty', {
      id: data.value,
      name: event.target.innerText,
    });
  }

  selectEtcJobDuty(data: any) {
    //
    const { skProfileService } = this.props;

    this.setState({
      focus: false,
    });

    skProfileService!.setCurrentJobGroupProp('currentJobDuty', {
      id: 'etc',
      name: data.value,
    });
  }

  onPreviousClick() {
    this.props.history.push(routePaths.personalInfoAgreement());
  }

  onNextClick() {
    //
    const skProfileService = this.props.skProfileService!;
    const { skProfile } = skProfileService!;
    const { member } = skProfile!;
    const { currentJobGroup, favoriteJobGroup } = member!;

    let skProfileUdo: SkProfileUdo;

    if (
      !currentJobGroup.currentJobGroup ||
      !currentJobGroup.currentJobGroup!.id ||
      !currentJobGroup.currentJobDuty ||
      !currentJobGroup.currentJobDuty!.id
    ) {
      reactAlert({
        title: '알림',
        message: '현재 직군과 현재 직무를 선택해주세요.',
      });
    } else {
      skProfileUdo = new SkProfileUdo(
        skProfileService.skProfile.member.currentJobGroup,
        skProfileService.skProfile.member.favoriteJobGroup,
        skProfileService.skProfile.pisAgreement
      );
      skProfileService.modifySkProfile(skProfileUdo).then(() => {
        if (
          !favoriteJobGroup.favoriteJobGroup ||
          !favoriteJobGroup.favoriteJobGroup!.id ||
          favoriteJobGroup.favoriteJobGroup!.id === ''
        ) {
          this.props.history.push(routePaths.favoriteJobRe());
        } else {
          this.props.history.push('/');
        }
      });
      // this.props.history.push(routePaths.favoriteLearningType());
      // this.props.history.push(routePaths.favoriteJob());
    }
  }

  render() {
    //
    const selectOptionJobGroup = this.setJobGroup();
    const selectOptionJobDuty = this.setJobDuties();
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService!;
    const { member } = skProfile!;
    const { currentJobGroup } = member!;

    return (
      <Form>
      <div className="select-cont-wrap" style={{height:'20rem'}}>
        <div className="select-box">
          <div className="select-title">
            Step 01. 현재 직무가 속해 있는 직군을 선택해주세요.
          </div>
          <Select
            placeholder="선택해주세요"
            options={selectOptionJobGroup}
            value={
              currentJobGroup &&
              currentJobGroup.currentJobGroup &&
              currentJobGroup.currentJobGroup.id
            }
            onChange={(event: any, data: any) =>
              this.selectJobGroup(event, data)
            }
          />
        </div>
        {currentJobGroup &&
        currentJobGroup.currentJobGroup &&
        currentJobGroup.currentJobGroup.id &&
        currentJobGroup.currentJobGroup.id !== 'etc' ? (
          <div className="select-box">
            <div className="select-title">
              Step 02. 현재 직무를 선택해주세요.
            </div>
            <Select
              placeholder="선택해주세요"
              options={selectOptionJobDuty}
              value={
                member &&
                member.currentJobGroup &&
                member.currentJobGroup.currentJobDuty &&
                member.currentJobGroup.currentJobDuty.id
              }
              onChange={(event: any, data: any) =>
                this.selectJobDuty(event, data)
              }
            />
          </div>
        ) : (
          ''
        )}
        {currentJobGroup &&
        currentJobGroup.currentJobGroup &&
        currentJobGroup.currentJobGroup.id &&
        currentJobGroup.currentJobGroup.id === 'etc' ? (
          <div className="select-box">
            <div className="select-title">
              Step 02. 해당 되는 직무가 없을 경우 직접 입력해주세요.
            </div>
            <div
              className={classNames('ui h48 input', {
                focus: this.state.focus,
                write:
                  currentJobGroup &&
                  currentJobGroup.currentJobDuty &&
                  currentJobGroup.currentJobDuty.name,
              })}
            >
              <input
                type="text"
                placeholder="Text.."
                value={
                  currentJobGroup &&
                  currentJobGroup.currentJobDuty &&
                  currentJobGroup.currentJobDuty.name
                }
                onClick={() => this.setState({ focus: true })}
                onChange={e =>
                  this.selectEtcJobDuty({ value: e.target.value })
                }
              />
              <Icon
                className="clear link"
                onClick={() => this.selectEtcJobDuty({ value: '' })}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {/*<div className="select-error">*/}
      {/*  <Icon className="error16" /><span className="blind">error</span>*/}
      {/*  <span>직군 및 직무를 선택해주세요.</span>*/}
      {/*</div>*/}
      <div className="button-area">
        {/* <Button className="fix line" onClick={() => this.onPreviousClick()}>
          Previous
        </Button> */}
        <div className="error">직군 및 직무를 선택해주세요.</div>
        <Button className="fix bg" onClick={() => this.onNextClick()}>
          완료
        </Button>
      </div>
      </Form>
    );
  }
}

export default withRouter(CurrentJobContainerRe);
