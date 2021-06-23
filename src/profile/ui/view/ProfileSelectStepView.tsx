import React from 'react';
import { Step } from 'semantic-ui-react';

export interface ProfileSelectStepViewProps {
  step: number;
}

export function ProfileSelectStepView({ step }: ProfileSelectStepViewProps) {
  return (
    <Step.Group className="number-step type2">
      <Step active={step === 1} completed={step !== 1}>
        <Step.Content>
          <span className="number">
            <span className="blind">1</span>
          </span>
          <Step.Title>안내</Step.Title>
        </Step.Content>
      </Step>
      <Step active={step === 2} completed={step > 2}>
        <Step.Content>
          <span className="number">
            <span className="blind">2</span>
          </span>
          <Step.Title>개인정보동의</Step.Title>
        </Step.Content>
      </Step>
      <Step active={step === 3} completed={step > 3}>
        <Step.Content>
          <span className="number">
            <span className="blind">3</span>
          </span>
          <Step.Title>현 직무</Step.Title>
        </Step.Content>
      </Step>
      <Step active={step === 4} completed={step > 4}>
        <Step.Content>
          <span className="number">
            <span className="blind">4</span>
          </span>
          <Step.Title>관심 직무</Step.Title>
        </Step.Content>
      </Step>
      <Step active={step === 5} completed={step > 5}>
        <Step.Content>
          <span className="number">
            <span className="blind">5</span>
          </span>
          <Step.Title>관심 분야</Step.Title>
        </Step.Content>
      </Step>
      <Step active={step === 6}>
        <Step.Content>
          <span className="number">
            <span className="blind">6</span>
          </span>
          <Step.Title>학습방식</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
}
