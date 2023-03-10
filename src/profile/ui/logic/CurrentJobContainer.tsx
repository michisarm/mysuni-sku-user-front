/* eslint-disable */
import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Form, Button, Icon, Select, DropdownProps } from 'semantic-ui-react';
import classNames from 'classnames';
import { JobGroupService } from 'college/stores';
import routePaths from '../../routePaths';
import SkProfileService from '../../present/logic/SkProfileService';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { isEmpty } from 'lodash';

function getAdditionalInfoParams(
  currentJobGroupId: string,
  currentJobDutyId: string,
  userDefinedCurrentJobDuty: string
) {
  const params = {
    nameValues: [
      {
        name: 'currentJobGroupId',
        value: currentJobGroupId,
      },
      {
        name: 'currentJobDutyId',
        value: currentJobDutyId,
      },
      {
        name: 'userDefinedCurrentJobDuty',
        value: '',
      },
    ],
  };

  if (currentJobGroupId === 'etc') {
    params.nameValues[2].value = userDefinedCurrentJobDuty;
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
class CurrentJobContainer extends React.Component<Props, State> {
  state = {
    focus: false,
  };

  componentDidMount(): void {
    const { jobGroupService, skProfileService } = this.props;

    skProfileService!.findSkProfile();
    jobGroupService!.findAllJobGroups();

    if (skProfileService?.additionalUserInfo.currentJobGroupId) {
      jobGroupService!.findJobGroupById(
        skProfileService?.additionalUserInfo.currentJobGroupId
      );
    }
  }

  onPreviousClick() {
    this.props.history.push(routePaths.personalInfoAgreement());
  }

  setJobGroup() {
    const { jobGroups } = this.props.jobGroupService!;
    const jobGroupSelect: { key: number; value: string; text: string }[] = [];
    const selectText = {
      ko: '??????????????????',
      en: 'Please select one',
      zh: '?????????',
    };
    const etcText = { ko: '??????', en: 'Others', zh: '??????' };

    if (jobGroups) {
      jobGroupSelect.push({
        key: 0,
        value: '',
        text: parsePolyglotString(selectText),
      });
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
        text: parsePolyglotString(etcText),
      });
    }
    return jobGroupSelect;
  }

  selectJobGroup(_: React.SyntheticEvent, data: DropdownProps) {
    const { jobGroupService, skProfileService } = this.props;

    if (data.value !== 'etc') {
      jobGroupService!.findJobGroupById(data.value as string);
    }

    skProfileService?.setCurrentJobGroupProp(data.value as string);
    if (data.value === 'etc') {
      skProfileService?.setCurrentJobDutyProp('etc');
    } else {
      skProfileService?.setCurrentJobDutyProp('');
    }
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

    skProfileService?.setCurrentJobDutyProp(data.value as string);
  }

  onChangeEtcJobDuty(e: React.ChangeEvent<HTMLInputElement>) {
    const { skProfileService } = this.props;

    this.setState({
      focus: false,
    });

    skProfileService?.setUserDefinedCurrentJobDuty(e.target.value);
  }

  onInitEtcJobDuty() {
    const { skProfileService } = this.props;

    skProfileService?.setUserDefinedCurrentJobDuty('');
  }

  async onNextClick() {
    const skProfileService = this.props.skProfileService!;
    const { additionalUserInfo } = skProfileService!;
    const {
      currentJobGroupId,
      currentJobDutyId,
      userDefinedCurrentJobDuty,
    } = additionalUserInfo!;

    if (
      isEmpty(currentJobDutyId) ||
      isEmpty(currentJobGroupId) ||
      (currentJobDutyId === 'etc' && isEmpty(userDefinedCurrentJobDuty))
    ) {
      reactAlert({
        title: getPolyglotText('??????', 'job-recent-??????'),
        message: getPolyglotText(
          '?????? ????????? ?????? ????????? ??????????????????.',
          'job-recent-??????'
        ),
      });
    } else {
      await skProfileService.modifyStudySummary(
        getAdditionalInfoParams(
          currentJobGroupId,
          currentJobDutyId,
          userDefinedCurrentJobDuty
        )
      );
      this.props.history.push(routePaths.favoriteJob());
    }
  }

  render() {
    const selectOptionJobGroup = this.setJobGroup();
    const selectOptionJobDuty = this.setJobDuties();
    const { skProfileService } = this.props;
    const { additionalUserInfo } = skProfileService!;
    const {
      currentJobGroupId,
      currentJobDutyId,
      userDefinedCurrentJobDuty,
    } = additionalUserInfo!;

    return (
      <Form>
        <div className="select-cont-wrap">
          <div className="select-box">
            <div className="select-title">
              <PolyglotText
                defaultString="Step 01. ?????? ????????? ?????? ?????? ????????? ??????????????????."
                id="job-recent-step1"
              />
            </div>
            <Select
              placeholder={getPolyglotText('??????????????????', 'job-recent-select')}
              options={selectOptionJobGroup}
              value={isEmpty(currentJobGroupId) ? undefined : currentJobGroupId}
              onChange={this.selectJobGroup}
            />
          </div>
          {currentJobGroupId !== 'etc' && (
            <div className="select-box">
              <div className="select-title">
                <PolyglotText
                  defaultString="Step 02. ?????? ????????? ??????????????????."
                  id="job-recent-step2On"
                />
              </div>
              <Select
                placeholder={getPolyglotText(
                  '??????????????????',
                  'job-recent-select'
                )}
                options={selectOptionJobDuty}
                value={isEmpty(currentJobDutyId) ? undefined : currentJobDutyId}
                onChange={this.selectJobDuty}
              />
            </div>
          )}
          {currentJobGroupId === 'etc' && (
            <div className="select-box">
              <div className="select-title">
                <PolyglotText
                  defaultString="Step 02. ?????? ?????? ????????? ?????? ?????? ?????? ??????????????????."
                  id="job-recent-step2Off"
                />
              </div>
              <div
                className={classNames('ui h48 input', {
                  focus: this.state.focus,
                  write: userDefinedCurrentJobDuty,
                })}
              >
                <input
                  type="text"
                  placeholder="Text.."
                  value={userDefinedCurrentJobDuty}
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
              defaultString="?????? ??? ????????? ??????????????????."
              id="job-recent-??????"
            />
          </div>
          <Button className="fix bg" onClick={() => this.onNextClick()}>
            <PolyglotText defaultString="??????" id="job-recent-??????" />
          </Button>
        </div>
      </Form>
    );
  }
}

export default withRouter(CurrentJobContainer);
