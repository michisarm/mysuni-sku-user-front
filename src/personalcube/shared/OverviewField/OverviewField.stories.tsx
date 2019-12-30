
import React from 'react';

import { Segment } from 'semantic-ui-react';

import { ClassroomModel } from 'personalcube/classroom';
import { InstructorModel } from 'personalcube/cubeintro';
import OverviewField from './OverviewField';

export default {
  title: 'components|element/OverviewField/OverviewField',
  component: OverviewField,
};


export const Basic = () =>
  //
  (
    <Segment className="full">
      <OverviewField.Wrapper>
        <OverviewField.Description
          description="UI/UX의 세계로 들어가도 어디서부터 시작해야 할지 모르겠나요?<br/>
                    이 과정을 통해 당신은 당신의 CV에 UX 디자이너를 추가하고 당신의 새로운 기술에 대한 보수를 받기 시작할 수 있을 것입니다.<br/><br/>
                    안녕하세요. 내 이름은 홍길동이며, Adobe Certified 강사입니다. 어도비 XD를 효율적이고 포괄적으로 배울 수 있도록 도와주러 이 강좌를 개설하였습니다. XD는 업계
                    전문가들이 고품질의 기능성 모형을 생산하기 위해 사용하는 환상적인 디자인 도구입니다. 본 코스를 통해 실용적이고 효과적인 UX(User Experience) 및 UI(User
                    Interface) 설계를 제작할 수 있습니다."
        />
        <OverviewField.List className="sub-category">
          <OverviewField.Item
            title="AI"
            content="AI Biz Essential / AI Tech Biginner / Language AI / AI Tech Advanced / Speech AI"
          />
          <OverviewField.Item
            title="Leadership"
            content="Leadership / Leading Myself / Leading Business / Leadership Pipeline / Leadership Clinic Leadership / Leading Myself / Leading Business / Leadership Pipeline"
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    </Segment>
  );
export const BasicWithHeader = () =>
  //
  (
    <Segment className="full">
      <OverviewField.Wrapper>
        <OverviewField.List
          className="sub-category fn-parents open"
          header={<OverviewField.Title icon="category" text="Sub Category" />}
        >
          <OverviewField.Item
            title="AI"
            content="AI Biz Essential / AI Tech Biginner / Language AI / AI Tech Advanced / Speech AI"
          />
          <OverviewField.Item
            title="Leadership"
            content="Leadership / Leading Myself / Leading Business / Leadership Pipeline / Leadership Clinic Leadership / Leading Myself / Leading Business / Leadership Pipeline"
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    </Segment>
  );
export const IconFields = () =>
  //
  (
    <Segment className="full">
      <OverviewField.Wrapper>
        <OverviewField.List icon className="period-area">
          <OverviewField.Item
            titleIcon="period"
            title="Registration Period"
            content="2020.01.01 ~ 2020.02.01"
          />
          <OverviewField.Item
            titleIcon="cancellation"
            title="Cancellation Period"
            content={(
              <>
                2020.01.01 ~ 2020.02.01
                <div className="info">
                  Cancellation penalty : 2020 of the lecture fee and no application for training for three months
                </div>
              </>
            )}
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    </Segment>
  );
export const Table = () => {
  //
  const mockClassroom = new ClassroomModel();
  const mockInstructor = new InstructorModel();

  const classrooms = [
    new ClassroomModel({
      ...mockClassroom,
      round: 1,
      instructor: new InstructorModel({ ...mockInstructor, name: '김강사' }),
    }),
    new ClassroomModel({
      ...mockClassroom,
      round: 2,
      instructor: new InstructorModel({ ...mockInstructor, name: '이강사' }),
    }),
  ];

  return (
    <Segment className="full">
      <OverviewField.Wrapper>
        <OverviewField.List
          header={(
            <OverviewField.Table
              titleIcon="series"
              titleText="Class Series"
              classrooms={classrooms}
            />
          )}
        >
          <OverviewField.Item
            title="AI"
            content="AI Biz Essential / AI Tech Biginner / Language AI / AI Tech Advanced / Speech AI"
          />
          <OverviewField.Item
            title="Leadership"
            content="Leadership / Leading Myself / Leading Business / Leadership Pipeline / Leadership Clinic Leadership / Leading Myself / Leading Business / Leadership Pipeline"
          />
        </OverviewField.List>
      </OverviewField.Wrapper>
    </Segment>
  );
};
