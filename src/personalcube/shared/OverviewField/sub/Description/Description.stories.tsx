
import React from 'react';

import { Segment } from 'semantic-ui-react';
import OverviewField from '../../OverviewField';


export default {
  title: 'components|element/OverviewField/Description',
  component: OverviewField.Description,
};


/**
 * Basic Story
 */
export const Basic = () => {
  //
  const description = 'UI/UX의 세계로 들어가도 어디서부터 시작해야 할지 모르겠나요?<br/>'
    + '이 과정을 통해 당신은 당신의 CV에 UX 디자이너를 추가하고 당신의 새로운 기술에 대한 보수를 받기 시작할 수 있을 것입니다.<br/><br/>'
    + '안녕하세요. 내 이름은 홍길동이며, Adobe Certified 강사입니다. 어도비 XD를 효율적이고 포괄적으로 배울 수 있도록 도와주러 이 강좌를 개설하였습니다. XD는 업계'
    + '전문가들이 고품질의 기능성 모형을 생산하기 위해 사용하는 환상적인 디자인 도구입니다. 본 코스를 통해 실용적이고 효과적인 UX(User Experience) 및 UI(User'
    + 'Interface) 설계를 제작할 수 있습니다.';

  return (
    <Segment className="full">
      <OverviewField.Wrapper>
        <OverviewField.Description description={description} />
      </OverviewField.Wrapper>
    </Segment>
  );
};
