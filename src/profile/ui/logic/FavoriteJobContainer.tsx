import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {  Form, Button, Icon, Select } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { reactAlert, reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from '../../../shared';

import CollegeService from '../../../college/present/logic/CollegeService';
import TitleView from '../view/TitleView';
import SkProfileService from '../../present/logic/SkProfileService';
import { SkProfileModel } from '../..';

interface Props extends RouteComponentProps{
  collegeService? : CollegeService
  skProfileService? : SkProfileService
}

interface States{
  isSelectedJobGroup : boolean
  isSelectedDutyGroup : boolean
}

@inject('collegeService', 'skProfileService')
@observer
@reactAutobind
class FavoriteJobContainer extends React.Component<Props, States> {

  constructor(props:Props) {
    super(props);
    this.state = {
      isSelectedJobGroup: false,
      isSelectedDutyGroup: false,
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
    }


    return jobGroupSelect;
  }

  selectJobGroup(event:any, data:any ) {
    const { collegeService, skProfileService } = this.props;
    if (collegeService && skProfileService) {
      collegeService.findJobGroupById(data.value)
        .then(() =>
          this.setState({
            isSelectedJobGroup: true,
            isSelectedDutyGroup: false,
          })
        );
      skProfileService.setFavoriteJobGroupProp('favoriteJobGroup', { id: data.value, name: data.text });
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
    if (skProfileService) {
      skProfileService.setFavoriteJobGroupProp('favoriteJobDuty', { id: data.value, name: data.text });
      this.setState({
        isSelectedDutyGroup: true,
      });
    }
  }

  onSKIntroClick() {
    //SKUniversity 소개
  }

  onPreviousClick() {
    this.props.history.push('/profile/interest/college');
  }

  onNextClick() {
    //favoriteJobGroup setting 호출 여기? stetp3 submit?
    const { skProfileService } = this.props;
    const { isSelectedJobGroup, isSelectedDutyGroup } = this.state;
    if (skProfileService ) {
      if ( !isSelectedJobGroup || !isSelectedDutyGroup ) {
        reactAlert({ title: '알림', message: '맞춤 교육을 위해 추후 선택 가능합니다.' });
      } else {
        skProfileService.modifySkProfile(SkProfileModel.asNameValues(skProfileService.skProfile));
      }
    }
    this.props.history.push('/profile/interest/learningType');
  }

  render() {

    const selectOptionJobGroup = this.setJobGroup();
    const selectOptionJobDuty =  this.setJobDuties();
    return (
      <ContentLayout breadcrumb={[
        { text: 'd1', path: '/depth1-path' },
        { text: 'd2' },
      ]}
        className="bg-white"
      >
        <div className="interest-content step2">
          <TitleView step={2} onSKIntroClick={this.onSKIntroClick} />
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
              <div className="select-box">
                <div className="select-title">관심 있는 직무를 선택해주세요.</div>
                <Select placeholder="선택해주세요"
                  options={ selectOptionJobDuty}
                  onChange={(event:any, data:any) => this.selectJobDuty(event, data)}
                />
              </div>
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
