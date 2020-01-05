import React from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

import { Form, Button, Icon, Select } from 'semantic-ui-react';
import classNames from 'classnames';
import { ContentLayout } from 'shared';

import CollegeService from '../../../college/present/logic/CollegeService';
import TitleView from '../view/TitleView';
import SkProfileService from '../../present/logic/SkProfileService';
import { SkProfileUdo } from '../../model/SkProfileUdo';

interface Props extends RouteComponentProps{
  collegeService? : CollegeService
  skProfileService? : SkProfileService
}

interface States{
  isSelectedJobGroup : boolean
  isSelectedDutyGroup: boolean
  isEtc : boolean
  focus : boolean
  write : string

}

@inject(mobxHelper.injectFrom('college.collegeService', 'profile.skProfileService'))
@observer
@reactAutobind
class FavoriteJobContainer extends React.Component<Props, States> {

  constructor(props:Props) {
    super(props);
    this.state = {
      isSelectedJobGroup: false,
      isSelectedDutyGroup: false,
      isEtc: false,
      focus: false,
      write: '',
    };
  }

  componentDidMount(): void {
    const { collegeService, skProfileService } = this.props;
    if (collegeService && skProfileService) {
      collegeService.findAllJobGroups();
      skProfileService.findSkProfile();
    }
  }

  setJobGroup() {
    const { jobGroups } = this.props.collegeService || {} as CollegeService;
    const jobGroupSelect : any = [];
    if (jobGroups) {
      jobGroups.map((jobGroup, index ) => {
        jobGroupSelect.push({ key: index + 1, value: jobGroup.jobGroupId, text: jobGroup.name });
      });
      jobGroupSelect.push({ key: jobGroups.length + 1, value: 'etc', text: '기타' });
    }
    return jobGroupSelect;
  }

  selectJobGroup(event:any, data:any ) {
    const { collegeService, skProfileService } = this.props;

    if (data.value === 'etc') {
      this.setState({
        isEtc: true,
      });
    } else {
      this.setState({
        isEtc: false,
      });
    }

    if (collegeService ) {
      collegeService.findJobGroupById(data.value);
    }

    this.setState({
      isSelectedJobGroup: true,
      isSelectedDutyGroup: false,
    });

    if (skProfileService) {
      skProfileService.setFavoriteJobGroupProp('favoriteJobGroup', { id: data.value, name: event.target.innerText });
    }

  }

  setJobDuties() {
    const { jobGroup } = this.props.collegeService || {} as CollegeService;
    const { isSelectedJobGroup } = this.state;

    const jobDutySelect : any = [];

    if (isSelectedJobGroup && jobGroup) {
      jobGroup.jobDuties.map((jobDuty, index) => {
        jobDutySelect.push({ key: index + 1, value: jobDuty.id, text: jobDuty.name });
      });
    }

    return jobDutySelect;
  }

  selectJobDuty(event:any, data:any ) {
    const { skProfileService } = this.props;

    this.setState({
      isSelectedDutyGroup: true,
      focus: false,
    });

    if (skProfileService) {
      skProfileService.setFavoriteJobGroupProp('favoriteJobDuty', { id: data.value, name: event.target.innerText });
    }
  }

  selectEtcJobDuty(data:any) {
    const { skProfileService } = this.props;
    const { isEtc, write } = this.state;

    this.setState({
      isSelectedDutyGroup: true,
      focus: false,
    });

    if (skProfileService && isEtc) {
      skProfileService.setFavoriteJobGroupProp('favoriteJobDuty', { id: 'etc', name: write } );
    }
  }

  onPreviousClick() {
    this.props.history.push('/profile/interest/college');
  }

  onNextClick() {
    const { skProfileService } = this.props;
    const { isSelectedJobGroup, isSelectedDutyGroup } = this.state;
    let skProfileUdo : SkProfileUdo;
    if (skProfileService ) {
      if ( !isSelectedJobGroup || !isSelectedDutyGroup ) {
        reactAlert({ title: '알림', message: '맞춤 교육을 위해 추후 선택 가능합니다.' });
      } else {
        skProfileUdo = new SkProfileUdo(skProfileService.skProfile.member.favoriteJobGroup);
        skProfileService.modifySkProfile(skProfileUdo);
      }
    }
    this.props.history.push('/profile/interest/learningType');
  }

  render() {

    const selectOptionJobGroup = this.setJobGroup();
    const selectOptionJobDuty =  this.setJobDuties();
    const {  isSelectedJobGroup,  isEtc } = this.state;

    return (
      <ContentLayout breadcrumb={[
        { text: 'd1', path: '/depth1-path' },
        { text: 'd2' },
      ]}
        className="bg-white"
      >
        <div className="interest-content step2">
          <TitleView step={2} />
          <Form>
            <h3 className="title-filter">관심직무 선택</h3>
            <div className="select-cont-wrap">
              <div className="select-box">
                <div className="select-title">관심 있는 직군을 선택해주세요.</div>
                <Select placeholder="선택해주세요"
                  options={selectOptionJobGroup}
                  onChange={(event:any, data:any) => this.selectJobGroup(event, data)}
                />
              </div>
              {
                isSelectedJobGroup && !isEtc ? (
                  <div className="select-box">
                    <div className="select-title">관심 있는 직무를 선택해주세요.</div>
                    <Select placeholder="선택해주세요"
                      options={selectOptionJobDuty}
                      onChange={(event:any, data:any) => this.selectJobDuty(event, data)}
                    />
                  </div>
                ) : ''
              }
              {
                isSelectedJobGroup && isEtc ? (
                  <div className="select-box">
                    <div className="select-title">해당 되는 직무가 없을 경우 직접 입력해주세요.</div>
                    <div className={classNames('ui h48 input', { focus: this.state.focus, write: this.state.write })}>
                      <input type="text"
                        placeholder="Text.."
                        value={this.state.write}
                        onClick={() => this.setState({ focus: true })}
                        onBlur={( data:any) => this.selectEtcJobDuty(data) }
                        onChange={(e) => this.setState({ write: e.target.value })}
                      />
                      <Icon className="clear link" onClick={() => this.setState({ write: '' })} />
                    </div>
                  </div>
                ) : ''
              }
            </div>
            <div className="select-error">
              <Icon className="error16" /><span className="blind">error</span>
              <span>
                        직군 및 직무를 선택해주세요.
              </span>
            </div>
            <div className="button-area">
              <Button className="fix line" onClick={() => this.onPreviousClick()}>Previous</Button>
              <Button className="fix bg" onClick={() => this.onNextClick()}>Next</Button>
            </div>
          </Form>
        </div>
      </ContentLayout>
    );
  }
}

export default FavoriteJobContainer;
