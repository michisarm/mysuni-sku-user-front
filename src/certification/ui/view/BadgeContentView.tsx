import React from 'react';
import { Segment } from 'semantic-ui-react';
import { OverviewField } from '../../../personalcube';
import { BadgeTagView } from './BadgeTagView';
import BadgeCardListContainer from '../logic/BadgeCardListContainer';
import { Badge } from '../../model/Badge';
import { Area } from 'tracker/model';

interface BadgeContentViewProps {
  badge: Badge;
}

export default function BadgeContentView({
  badge,
}: BadgeContentViewProps) {

  const replaceEnterWithBr = (target: string) => {
    return target.split('\n').join('<br />');
  };
  
  return (
    <Segment className="full">
      <div
        className="badge-detail"
        data-area={Area.CERTIFICATION_PATH}
      >
        {
          badge !== undefined && (
            <>
              <OverviewField.List>
                  {
                    badge.description && (
                      <OverviewField.Item
                        title="인증 내용"
                        contentHtml={badge.description}
                      />
                    )
                  }
                  <OverviewField.Item
                    title="획득 조건"
                    contentHtml={replaceEnterWithBr(badge.acquisitionRequirements)}
                  />
                  <OverviewField.Item
                    title="자격 증명"
                    contentHtml={replaceEnterWithBr(badge.qualification)}
                  />
              </OverviewField.List>
                {
                  badge.additionalRequirementsNeeded && (
                    <OverviewField.List icon>
                      <OverviewField.Item
                        titleIcon="addinfo"
                        title="추가 발급 조건"
                        contentHtml="해당 Badge는 학습 이수 외에도 추가 미션이 있습니다.<br/>학습 이수 완료 후, 발급 요청하시면 담당자가 추가 미션에 대해 안내 드릴 예정입니다."
                      />
                    </OverviewField.List>
                  )
                }
                <OverviewField.List icon className="course-area">
                  <OverviewField.Item
                    titleIcon="list24"
                    title="Learning Path"
                    content={
                      <BadgeCardListContainer />
                    }
                  />
                </OverviewField.List>
                {
                  badge.tags && (
                    <BadgeTagView tags={badge.tags} />
                  )
                }
            </>
          )
        }
      </div>
    </Segment>
  );
}