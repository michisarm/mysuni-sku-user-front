/* eslint-disable */
import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
  Form,
  Button,
  Icon,
  Select,
  Input,
  DropdownProps,
} from 'semantic-ui-react';
import classNames from 'classnames';
import { IdName } from 'shared/model';
import { JobGroupService } from 'college/stores';

import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';
import SkProfileUdo from '../../model/SkProfileUdo';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

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
      // const favoriteJobGroup =
      //   skProfile.member.favoriteJobGroup.favoriteJobGroup;
      // if (skProfile.member.favoriteJobGroup.favoriteJobGroup) {
      //   jobGroupService!.findJobGroupById(favoriteJobGroup.id);
      // }
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
          text: parsePolyglotString(jobGroup.name),
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

  setJobDuties() {
    //
    const { jobGroup } = this.props.jobGroupService!;
    const jobDutySelect: any = [];

    if (jobGroup) {
      jobGroup.jobDuties.map((jobDuty, index) => {
        jobDutySelect.push({
          key: index + 1,
          value: jobDuty.id,
          text: parsePolyglotString(jobDuty.name),
        });
      });
    }

    return jobDutySelect;
  }

  selectJobGroup(_: React.SyntheticEvent, data: DropdownProps) {
    //
    const { jobGroupService, skProfileService } = this.props;

    jobGroupService!.findJobGroupById(data.value as string);
    skProfileService?.setFavoriteJobGroupProp(data.value as string);
    // 김민준 - 객체 없음
    // skProfileService!.setFavoriteJobGroupProp('favoriteJobGroup', {
    //   id: data.value,
    //   name: event.target.innerText,
    // });
    // // 김민준 - 객체 없음
    // skProfileService!.setFavoriteJobGroupProp('favoriteJobDuty', new IdName());
  }

  selectJobDuty(event: any, data: any) {
    //
    const { skProfileService } = this.props;

    this.setState({
      focus: false,
    });

    // // 김민준 - 객체 없음
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

    // 김민준 - 객체 없음
    // skProfileService!.setFavoriteJobGroupProp('favoriteJobDuty', {
    //   id: 'etc',
    //   name: data.value,
    // });
  }

  onPreviousClick() {
    // this.props.history.push(routePaths.favoriteCollege());
    this.props.history.push(routePaths.currentJob());
  }

  async onNextClick() {
    //
    const skProfileService = this.props.skProfileService!;
    const { additionalUserInfo } = skProfileService!;
    const {
      currentJobDutyId,
      currentJobGroupId,
      favoriteJobGroupId,
      favoriteJobDutyId,
    } = additionalUserInfo;

    if (
      !favoriteJobDutyId ||
      !favoriteJobGroupId ||
      !currentJobDutyId ||
      !currentJobGroupId
    ) {
      reactAlert({
        title: getPolyglotText('알림', 'job-favorite-알림'),
        message: getPolyglotText(
          '관심 직군과 관심 직무를 선택해주세요.',
          'job-favorite-알림내용'
        ),
      });
    } else {
      // await skProfileService.modifyStudySummary();
      this.props.history.push(routePaths.favoriteCollege());
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
        <div className="select-cont-wrap">
          <div className="select-box">
            <div className="select-title">
              <PolyglotText
                defaultString="Step 01. 관심 있는 직군을 선택해주세요."
                id="job-favorite-step1"
              />
            </div>
            <Select
              placeholder="선택해주세요"
              options={selectOptionJobGroup}
              value={favoriteJobGroupId}
              onChange={this.selectJobGroup}
            />
          </div>
          {favoriteJobGroupId !== 'etc' ? (
            <div className="select-box">
              <div className="select-title">
                <PolyglotText
                  defaultString="Step 02. 관심 직무를 선택해주세요."
                  id="job-favorite-step2On"
                />
              </div>
              <Select
                placeholder="선택해주세요"
                options={selectOptionJobDuty}
                value={favoriteJobDutyId}
                onChange={(event: any, data: any) =>
                  this.selectJobDuty(event, data)
                }
              />
            </div>
          ) : (
            ''
          )}
          {favoriteJobGroupId ? (
            // favoriteJobGroup &&
            // favoriteJobGroup.favoriteJobGroup &&
            // favoriteJobGroup.favoriteJobGroup.id &&
            // favoriteJobGroup.favoriteJobGroup.id === 'etc' ? (
            <div className="select-box">
              <div className="select-title">
                <PolyglotText
                  defaultString="Step 02. 해당 되는 직무가 없을 경우 직접 입력해주세요."
                  id="job-favorite-step2Off"
                />
              </div>
              <div
                className={classNames('ui h48 input', {
                  focus: this.state.focus,
                  write:
                    // 김민준 - name 없음
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
                    // 김민준 - name 없음
                    // favoriteJobGroup &&
                    // favoriteJobGroup.favoriteJobDuty &&
                    // favoriteJobGroup.favoriteJobDuty.name
                    favoriteJobDutyId
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
          <div className="error">
            <PolyglotText
              defaultString="직군 및 직무를 선택해주세요."
              id="job-favorite-주의"
            />
          </div>
          <Button className="fix bg" onClick={() => this.onNextClick()}>
            <PolyglotText defaultString="다음" id="job-favorite-다음" />
          </Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(FavoriteJobContainer);
