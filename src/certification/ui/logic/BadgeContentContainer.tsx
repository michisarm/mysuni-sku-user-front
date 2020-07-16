import React from 'react';
import {Button, Icon, Label, Segment} from 'semantic-ui-react';

import {OverviewField} from 'personalcube';
import {Badge} from '../../shared/Badge';
import {BadgeContentHeader, BadgeInformation, BadgeTitle, BadgeOverview} from '../view/BadgeContentElementView';



import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';



interface BadgeContentProps {
  badge: any,
  children: React.ReactNode
}

const BadgeContentContainer: React.FC<BadgeContentProps> = ({badge, children}) => {
  //
  return (
    <>
      {console.log(badge)}
      {/*상단*/}
      <BadgeContentHeader>
        {/*뱃지 정보 및 디자인*/}
        <Badge
          badgeId={badge.badgeId}
          badgeLevel={badge.difficultyLevel}
          iconUrl={badge.iconUrl}
          mainCategory={badge.mainCategoryName}
          name={badge.name}
          badgeStyle={BadgeStyle.Detail}
          badgeSize={BadgeSize.Large}
        />
        {/*뱃지 타이틀*/}
        <BadgeTitle
          college={badge.mainCategoryName}
          name={badge.name}
        />
        {/*뱃지 메타정보1*/}
        <BadgeInformation
          certiAdminCategoryName={badge.certiAdminCategory.certiAdminCategoryName}
          certiAdminSubCategoryName={badge.certiAdminSubcategory.certiAdminSubcategoryName}
          difficultyLevel={badge.difficultyLevel}
          learningTime={badge.learningTime}
        />

        <div className="status">
          <Button className="fix bg">도전하기</Button>
        </div>
      </BadgeContentHeader>

      {/*하단 - 그외 메타정보 및 학습 정보 */}
      <BadgeOverview>

        {/*설명 및 획득조건, 자격증명*/}
        <OverviewField.List>
          <OverviewField.Item
            title="인증내용"
            content={badge.description}
          />
          <OverviewField.Item
            title="획득 조건"
            content={badge.obtainTerms}
          />
          <OverviewField.Item
            title="자격증명"
            content={badge.qualification}
          />
        </OverviewField.List>

        {/*담당자 & 추가발급조건*/}
        <OverviewField.List icon>
          <OverviewField.Item
            titleIcon="host"
            title="담당자"
            content={
              <div className="host-line">
                {badge.badgeOperator.badgeOperatorName} ({badge.badgeOperator.badgeOperatorCompany})
                <Button icon className="right btn-blue">
                  문의하기
                  <Icon className="arrow-b-16"/>
                </Button>
              </div>
            }
          />
          <OverviewField.Item
            titleIcon="addinfo"
            title="추가 발급 조건"
            content="v0.1 API에 관련 내용 없음. 추가발급 여부만 있음 boolean"
          />
        </OverviewField.List>

        {/*학습정보*/}
        <OverviewField.List icon>
          <OverviewField.Item
            titleIcon="list24"
            title="Learning Path"
            content="학습목록 course-cont"
          />
        </OverviewField.List>

        {/*태그*/}
        <OverviewField.List icon>
          <OverviewField.Item
            titleIcon="tag2"
            title="태그"
            content={badge.tags}
          />
        </OverviewField.List>

      </BadgeOverview>
    </>
  );
};

export default BadgeContentContainer;
