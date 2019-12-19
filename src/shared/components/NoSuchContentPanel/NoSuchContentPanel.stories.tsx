
import React from 'react';

import { NoSuchContentPanel } from 'shared';
import { Segment } from 'semantic-ui-react';


export default {
  title: 'components|panel/NoSuchContent',
  component: NoSuchContentPanel,
};

// 각 Tab 메뉴명과 함께 알림 메시지를 제공
// <div class="text">수강중인 학습 과정이 없습니다.</div>
// <a href="#recommend" class="ui icon right button btn-blue2">김유니 님에게 추천하는 학습 과정 보기<i class="icon morelink"></i></a>
// <div class="text">수강 대기중인 학습 과정이 없습니다.</div>
// <div class="text">Required 된 학습 과정이 없습니다.</div>
// <div class="text">Completed List에 해당하는 학습카드가 없습니다.</div>
// <div class="text">Retry에 해당하는 학습카드가 없습니다.</div>


export const Basic = () => {
  //
  return (
    <Segment className="full">
      <NoSuchContentPanel message="수강중인 학습 과정이 없습니다." />
    </Segment>
  );
};
