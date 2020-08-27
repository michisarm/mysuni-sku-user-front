
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ContentLayout } from 'shared';
import classNames from 'classnames';
import PersonalInfoStep from '../view/PersonalInfoStep';
import PersonalInfoAgreementIntro from '../view/PersonalInfoAgreementIntro';
import PersonalInfoAgreementContainer from '../logic/PersonalInfoAgreementContainer';


const ClassNameOfStep = {
  step1: 'lo-08-01',
  step2: 'lo-08-02',
  step3: 'lo-08-03',
  step4: 'lo-08-03',
  step5: 'lo-08-06 step1',
  step6: 'lo-08-05 step3',
};

@observer
@reactAutobind
class PersonalInfoAgreementPage extends Component {
  //
  state = {
    activeStep: 'step1'
  };

  onClickNextStep (step: string) {
    this.setState({activeStep: step});
  }

  render() {
    //
    const { activeStep } = this.state;

    return (
      <ContentLayout
        className="bg-white"
      >
        <div className={classNames('interest-content', ClassNameOfStep[activeStep as keyof typeof ClassNameOfStep])}>

          {/*
          - step 컴포넌트 추가: PersonalInfoStep
          - props 현재 스텝 넘버 "step1"

          - step1 안내, step2 개인정보동의 컴포넌트는 한페이지에 있음
          - 스텝별로 div.interest-content 가 갖는 클래스명이 다름 lo-08-01 ~ lo-08-06

          - "현 직무" 컴포넌트가 없어서 FavoriteJobPage, FavoriteJobContainer 복사하여 컴포넌트 생성
          */}

          {/*step 영역*/}
          <PersonalInfoStep activeStep={activeStep}/>


          { activeStep === 'step1' && (
            <PersonalInfoAgreementIntro onClickNextStep={this.onClickNextStep}/>
          )}

          { activeStep === 'step2' && (
            <PersonalInfoAgreementContainer />
          )}
          
        </div>
      </ContentLayout>
    );
  }
}

export default PersonalInfoAgreementPage;
