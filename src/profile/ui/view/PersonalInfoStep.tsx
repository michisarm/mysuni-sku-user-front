
import React from 'react';
import {Icon, Step} from 'semantic-ui-react';


const StepTitle = [
  { key: 1, value: 'step1', text: '안내' },
  { key: 2, value: 'step2', text: '개인정보동의' },
  { key: 3, value: 'step3', text: '현 직무' },
  { key: 4, value: 'step4', text: '관심 직무' },
  { key: 5, value: 'step5', text: '관심 분야' },
  { key: 6, value: 'step6', text: '학습방식' },
];

interface Props {
  activeStep: string,
}

const PersonalInfoStep: React.FC<Props> = (Props) => {
  //
  const { activeStep } = Props;

  return (
    <div className="header">
      <div className="logo">
        <Icon className="sk-university-login"/>
        <span className="blind">mySUNI</span>
      </div>

      {/*step*/}
      <Step.Group className="number-step type2">

        { StepTitle.map((step) => (
          <Step key={`step-${step.key}`} active={step.value === activeStep ? true : false}>
            <span className="number">
              <span className="blind">{step.key}</span>
            </span>
            <span className="title">{step.text}</span>
          </Step>
        ))}

      </Step.Group>

    </div>
  );
};

export default PersonalInfoStep;
