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
import { isEmpty } from 'lodash';

function getAdditionalInfoParams(
  favoriteJobGroupId: string,
  favoriteJobDutyId: string,
  userDefinedFavoriteJobDuty: string
) {
  const params = {
    nameValues: [
      {
        name: 'favoriteJobGroupId',
        value: favoriteJobGroupId,
      },
      {
        name: 'favoriteJobDutyId',
        value: favoriteJobDutyId,
      },
    ],
  };

  if (favoriteJobGroupId === 'etc') {
    params.nameValues.push({
      name: 'userDefinedfavoriteJobDuty',
      value: userDefinedFavoriteJobDuty,
    });
  }

  return params;
}

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
    const { jobGroupService, skProfileService } = this.props;

    jobGroupService!.findAllJobGroups();
    skProfileService!.findSkProfile();
  }

  onPreviousClick() {
    this.props.history.push(routePaths.currentJob());
  }

  setJobGroup() {
    const { jobGroups } = this.props.jobGroupService!;
    const jobGroupSelect: { key: number; value: string; text: string }[] = [];

    if (jobGroups) {
      jobGroupSelect.push({ key: 0, value: '', text: '선택해주세요' });
      jobGroups.map((jobGroup, index) => {
        jobGroupSelect.push({
          key: index + 1,
          value: jobGroup.id,
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

  selectJobGroup(_: React.SyntheticEvent, data: DropdownProps) {
    const { jobGroupService, skProfileService } = this.props;

    if (data.value === 'etc') {
      skProfileService?.setCurrentJobDutyProp('etc');
    }

    if (data.value !== 'etc') {
      jobGroupService!.findJobGroupById(data.value as string);
    }

    skProfileService?.setFavoriteJobGroupProp(data.value as string);
    skProfileService?.setFavoriteJobDutyProp('');
  }

  setJobDuties() {
    const { jobGroup } = this.props.jobGroupService!;
    const jobDutySelect: { key: number; value: string; text: string }[] = [];

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

  selectJobDuty(_: React.SyntheticEvent, data: DropdownProps) {
    const { skProfileService } = this.props;

    this.setState({
      focus: false,
    });

    skProfileService?.setFavoriteJobDutyProp(data.value as string);
  }

  onChangeEtcJobDuty(e: React.ChangeEvent<HTMLInputElement>) {
    const { skProfileService } = this.props;

    this.setState({
      focus: false,
    });

    skProfileService?.setUserDefinedFavoriteJobDuty(e.target.value);
  }

  onInitEtcJobDuty() {
    const { skProfileService } = this.props;

    skProfileService?.setUserDefinedCurrentJobDuty('');
  }

  async onNextClick() {
    const skProfileService = this.props.skProfileService!;
    const { additionalUserInfo } = skProfileService!;
    const {
      favoriteJobGroupId,
      favoriteJobDutyId,
      userDefinedFavoriteJobDuty,
    } = additionalUserInfo;

    if (
      isEmpty(favoriteJobGroupId) ||
      isEmpty(favoriteJobDutyId) ||
      isEmpty(userDefinedFavoriteJobDuty)
    ) {
      reactAlert({
        title: getPolyglotText('알림', 'job-favorite-알림'),
        message: getPolyglotText(
          '관심 직군과 관심 직무를 선택해주세요.',
          'job-favorite-알림내용'
        ),
      });
    } else {
      await skProfileService.modifyStudySummary(
        getAdditionalInfoParams(
          favoriteJobGroupId,
          favoriteJobDutyId,
          userDefinedFavoriteJobDuty
        )
      );
      this.props.history.push(routePaths.favoriteCollege());
    }
  }

  render() {
    const selectOptionJobGroup = this.setJobGroup();
    const selectOptionJobDuty = this.setJobDuties();
    const { skProfileService } = this.props;
    const { additionalUserInfo } = skProfileService!;
    const {
      favoriteJobGroupId,
      favoriteJobDutyId,
      userDefinedFavoriteJobDuty,
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
          {favoriteJobGroupId !== 'etc' && (
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
                onChange={this.selectJobDuty}
              />
            </div>
          )}
          {favoriteJobGroupId === 'etc' && (
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
                  write: userDefinedFavoriteJobDuty,
                })}
              >
                <input
                  type="text"
                  placeholder="Text.."
                  value={userDefinedFavoriteJobDuty}
                  onClick={() => this.setState({ focus: true })}
                  onChange={this.onChangeEtcJobDuty}
                />
                <Icon className="clear link" onClick={this.onInitEtcJobDuty} />
              </div>
            </div>
          )}
        </div>
        <div className="button-area">
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
