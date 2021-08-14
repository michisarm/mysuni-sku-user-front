/* eslint-disable */
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
class FavoriteJobContainerRe extends React.Component<Props, State> {
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
      const favoriteJobGroup =
        skProfile.member.favoriteJobGroup.favoriteJobGroup;

      if (skProfile.member.favoriteJobGroup.favoriteJobGroup) {
        jobGroupService!.findJobGroupById(favoriteJobGroup.id);
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
    // 김민준 - 객체 없음
    // skProfileService!.setFavoriteJobGroupProp('favoriteJobGroup', {
    //   id: data.value,
    //   name: event.target.innerText,
    // });
    // skProfileService!.setFavoriteJobGroupProp('favoriteJobDuty', new IdName());
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

    // 김민준 - 객체 없음
    // skProfileService!.setFavoriteJobGroupProp('favoriteJobDuty', {
    //   id: data.value,
    //   name: event.target.innerText,
    // });
  }

  selectEtcJobDuty(data: any) {
    //
    const { skProfileService } = this.props;

    this.setState({
      focus: false,
    });

    // skProfileService!.setFavoriteJobGroupProp('favoriteJobDuty', {
    //   id: 'etc',
    //   name: data.value,
    // });
  }

  onPreviousClick() {
    // this.props.history.push(routePaths.favoriteCollege());
    this.props.history.push(routePaths.currentJob());
  }

  onNextClick() {
    //
    const skProfileService = this.props.skProfileService!;
    const { additionalUserInfo } = skProfileService!;
    const {
      currentJobDutyId,
      currentJobGroupId,
      favoriteJobGroupId,
      favoriteJobDutyId,
    } = additionalUserInfo;

    let skProfileUdo: SkProfileUdo;

    if (
      !favoriteJobDutyId
      // !favoriteJobGroup.favoriteJobGroup ||
      // !favoriteJobGroup.favoriteJobGroup!.id ||
      // !favoriteJobGroup.favoriteJobDuty ||
      // !favoriteJobGroup.favoriteJobDuty!.id
    ) {
      reactAlert({
        title: '알림',
        message: '관심 직군과 관심 직무를 선택해주세요.',
      });
    } else {
      skProfileUdo = new SkProfileUdo(
        // 객체 없음
        // skProfileService.skProfile.member.currentJobGroup,
        // skProfileService.skProfile.member.favoriteJobGroup,
        skProfileService.skProfile.pisAgreement
      );

      // skProfileService.modifySkProfile(skProfileUdo).then(() => {
      //   this.props.history.push('/');
      // });
    }
  }

  render() {
    //
    const selectOptionJobGroup = this.setJobGroup();
    const selectOptionJobDuty = this.setJobDuties();
    const { skProfileService } = this.props;
    const { additionalUserInfo } = skProfileService!;
    const {
      currentJobDutyId,
      currentJobGroupId,
      favoriteJobGroupId,
      favoriteJobDutyId,
    } = additionalUserInfo;

    return (
      <Form>
        <div className="select-cont-wrap" style={{ height: '20rem' }}>
          <div className="select-box">
            <div className="select-title">
              Step 01. 관심 있는 직군을 선택해주세요.
            </div>
            <Select
              placeholder="선택해주세요"
              options={selectOptionJobGroup}
              value={
                favoriteJobGroupId
                // favoriteJobGroup &&
                // favoriteJobGroup.favoriteJobGroup &&
                // favoriteJobGroup.favoriteJobGroup.id
              }
              onChange={(event: any, data: any) =>
                this.selectJobGroup(event, data)
              }
            />
          </div>
          {favoriteJobGroupId !== 'etc' ? (
            // favoriteJobGroup &&
            // favoriteJobGroup.favoriteJobGroup &&
            // favoriteJobGroup.favoriteJobGroup.id &&
            // favoriteJobGroup.favoriteJobGroup.id !== 'etc' ? (
            <div className="select-box">
              <div className="select-title">
                Step 02. 관심 직무를 선택해주세요.
              </div>
              <Select
                placeholder="선택해주세요"
                options={selectOptionJobDuty}
                value={
                  favoriteJobDutyId
                  // member &&
                  // member.favoriteJobGroup &&
                  // member.favoriteJobGroup.favoriteJobDuty &&
                  // member.favoriteJobGroup.favoriteJobDuty.id
                }
                onChange={(event: any, data: any) =>
                  this.selectJobDuty(event, data)
                }
              />
            </div>
          ) : (
            ''
          )}
          {favoriteJobGroupId === 'etc' ? (
            // favoriteJobGroup &&
            // favoriteJobGroup.favoriteJobGroup &&
            // favoriteJobGroup.favoriteJobGroup.id &&
            // favoriteJobGroup.favoriteJobGroup.id === 'etc' ? (
            <div className="select-box">
              <div className="select-title">
                Step 02. 해당 되는 직무가 없을 경우 직접 입력해주세요.
              </div>
              <div
                className={classNames('ui h48 input', {
                  focus: this.state.focus,
                  write:
                    // 김민준 - 이름 없음
                    // favoriteJobGroup &&
                    // favoriteJobGroup.favoriteJobDuty &&
                    // favoriteJobGroup.favoriteJobDuty.name,
                    favoriteJobDutyId,
                })}
              >
                <input
                  type="text"
                  placeholder="Text.."
                  value={
                    // 김민준 - 이름 없음
                    favoriteJobDutyId
                    // favoriteJobGroup &&
                    // favoriteJobGroup.favoriteJobDuty &&
                    // favoriteJobGroup.favoriteJobDuty.name
                  }
                  onClick={() => this.setState({ focus: true })}
                  onChange={(e) =>
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

export default withRouter(FavoriteJobContainerRe);
