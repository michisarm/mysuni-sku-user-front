
import React, { FunctionComponent } from 'react';
import { Segment, Form, Step } from 'semantic-ui-react';
import {PolyglotText} from '../../../../shared/ui/logic/PolyglotText';


export const ContentWrapperWithHeader: FunctionComponent = ({ children }) => (
  <>
    <div className="add-personal-learning support">
      <div className="add-personal-learning-wrap">
        <div className="apl-tit"><PolyglotText defaultString="Create" id="Create-NM-Title" /></div>
        <div className="apl-notice" >
          <PolyglotText defaultString="내가 갖고 있는 지식을 강좌로 만들 수 있습니다." id="Create-NM-Subtitle1" />
          <br />
          <PolyglotText defaultString="관리자의 확인 절차를 거쳐 다른 mySUNI 사용자에게 전파해보세요." id="Create-NM-Subtitle2" />
        </div>
      </div>
    </div>

    <Segment className="full">
      <div className="apl-form-wrap create">
        <Form>
          {children}
        </Form>
      </div>
    </Segment>
  </>
);

interface FormTitleProps {
  activeStep: 1 | 2
}

export const FormTitle: FunctionComponent<FormTitleProps> = ({ activeStep }) => (
  <div className="section-tit">
    <span className="text1">기본정보</span>
    <div className="right-step">
      <Step.Group className="number-step">
        <Step active={activeStep === 1}>
          <Step.Content>
            <span className="number"><span className="blind">1</span></span>
            <Step.Title>기본정보 및 노출정보</Step.Title>
          </Step.Content>
        </Step>
        <Step active={activeStep === 2}>
          <Step.Content>
            <span className="number"><span className="blind">2</span></span>
            <Step.Title>교육정보 및 부가정보</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    </div>
  </div>
);


export const ChannelFieldRow: FunctionComponent = ({ children }) => (
  <div className="table-css type5">
    <div className="row">
      {children}
    </div>
  </div>
);


interface ChannelModalContentWrapper {
  header: React.ReactNode
}

export const ChannelModalContentWrapper: FunctionComponent<ChannelModalContentWrapper> = ({ header, children }) => (
  <div className="channel-change">
    <div className="table-css">
      <div className="row head">
        {header}
      </div>
      <div className="row">
        {children}
      </div>
    </div>
  </div>
);
