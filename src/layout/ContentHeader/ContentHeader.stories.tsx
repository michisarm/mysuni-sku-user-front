
import React from 'react';
import { action } from '@storybook/addon-actions';

import { Button, Image } from 'semantic-ui-react';
import { ContentHeader, ContentLayout } from 'shared';
import { ContentHeaderTotalTimeItem } from 'myTraining/shared';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';


export default {
  title: 'components|layout/ContentHeader',
  component: ContentHeader,
};


const profileItem = (
  <ContentHeader.ProfileItem
    image={profileImg}
    name="김유니"
    teams={['SK C&C', '플랫폼 개발 1팀']}
  />
);


export const Basic = () =>
  //
  (
    <ContentHeader>
      <ContentHeader.Cell inner>
        <ContentHeader.ProfileItem
          name="김유니"
          teams={['SK C&C', '플랫폼 개발 1팀']}
          image={profileImg}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
export const ProfileItem = () =>
  //
  (
    <ContentHeader>
      <ContentHeader.Cell inner>
        <ContentHeader.ProfileItem
          name="김유니"
          teams={['SK C&C', '플랫폼 개발 1팀']}
          image={profileImg}
          imageEditable
          myPageActive
          onEditImage={action('editImage')}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
ProfileItem.story = {
  name: 'ContentHeader.ProfileItem',
};


export const TotalTimeItem = () =>
  //
  (
    <ContentHeader>
      <ContentHeader.Cell inner>
        {profileItem}
      </ContentHeader.Cell>
      <ContentHeader.Cell inner>
        <ContentHeaderTotalTimeItem
          minute={90}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
TotalTimeItem.story = {
  name: 'ContentHeader.TotalTimeItem',
};

export const WaitingItem = () =>
  //
  (
    <ContentHeader>
      <ContentHeader.Cell inner>
        {profileItem}
      </ContentHeader.Cell>
      <ContentHeader.Cell inner>
        <ContentHeader.WaitingItem
          onClick={action('clickWaitingItem')}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
WaitingItem.story = {
  name: 'ContentHeader.WaitingItem',
};


export const ChartItem = () =>
  //
  (
    <ContentHeader>
      <ContentHeader.Cell inner>
        {profileItem}
      </ContentHeader.Cell>
      <ContentHeader.Cell inner>
        <ContentHeader.ChartItem
          universityTime={200}
          myCompanyTime={400}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
ChartItem.story = {
  name: 'ContentHeader.ChartItem',
};


export const CommunityItem = () =>
  //
  (
    <ContentHeader>
      <ContentHeader.Cell inner>
        {profileItem}
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeader.CommunityItem
          joinedCount={5}
          myCount={1}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
CommunityItem.story = {
  name: 'ContentHeader.CommunityItem',
};


export const StampItem = () =>
  //
  (
    <ContentHeader>
      <ContentHeader.Cell inner>
        {profileItem}
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeader.StampItem
          annualStamps={[
            { year: 2019 },
            { year: 2018 },
            { year: 2017 },
            { year: 2016 },
          ]}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
StampItem.story = {
  name: '(Todo) ContentHeader.StampItem',
};


export const Bottom = () =>
  //
  (
    <ContentHeader
      bottom={(
        <div className="channel-of-interest">
          <h2>Bottom content</h2>
        </div>
      )}
    >
      <ContentHeader.Cell inner>
        {profileItem}
      </ContentHeader.Cell>
    </ContentHeader>
  );
export const CategoryExample = () =>
  //
  (
    <ContentLayout className="channel">
      <ContentHeader>
        <ContentHeader.Cell className="thumb">
          <div>
            <Image src={`${process.env.PUBLIC_URL}/images/all/thumb-college-86-px.jpg`} alt="College thumbnail" />
          </div>
        </ContentHeader.Cell>
        <ContentHeader.Cell className="title">
          <h2 className="college-name">AI College</h2>
          <p>
            <em>AI 아싸(Outsider)에서 AI 핵인싸(Insider)로!</em>
            AI College는 SK 구성원 누구나 알아야 할 기본 지식을 바탕으로, 각 산업과 직무에서 AI를 활용하는 실무 역량을
            <br /> 배양하고 AI기술 전문가로 성장할 수 있는 기회를 제공 합니다.
          </p>
        </ContentHeader.Cell>
        <ContentHeader.Cell className="btn-wrap">
          <Button className="personal line">
            <span>mySUNI 전체 커리큘럼 보기</span>
          </Button>
        </ContentHeader.Cell>
      </ContentHeader>
    </ContentLayout>
  );
export const RecommendItem = () =>
  //
  (
    <ContentHeader>
      <ContentHeader.Cell inner>
        {profileItem}
      </ContentHeader.Cell>
      <ContentHeader.Cell>
        <ContentHeader.RecommendItem
          favoriteChannelCount={24}
          totalChannelCount={999}
        />
      </ContentHeader.Cell>
    </ContentHeader>
  );
RecommendItem.story = {
  name: 'ContentHeader.RecommendItem',
};
