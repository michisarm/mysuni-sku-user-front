import React from 'react';
import { Segment } from 'semantic-ui-react';
import { OverviewField } from '../../../personalcube';
import { BadgeTagView } from './BadgeTagView';
import BadgeCardListContainer from '../logic/BadgeCardListContainer';
import { Badge } from '../../model/Badge';
import { Area } from 'tracker/model';
import { getPolyglotText } from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface BadgeContentViewProps {
  badge: Badge;
}

export default function BadgeContentView({ badge }: BadgeContentViewProps) {
  const replaceEnterWithBr = (target: string) => {
    return target.split('\n').join('<br />');
  };

  return (
    <Segment className="full">
      <div className="badge-detail" data-area={Area.CERTIFICATION_PATH}>
        {badge !== undefined && (
          <>
            <OverviewField.List>
              {badge.description && (
                <OverviewField.Item
                  title={getPolyglotText(
                    '인증 내용',
                    'Certification-View-인증내용'
                  )}
                  contentHtml={parsePolyglotString(badge.description)}
                />
              )}
              <OverviewField.Item
                title={getPolyglotText(
                  '획득 조건',
                  'Certification-View-획득조건'
                )}
                contentHtml={replaceEnterWithBr(
                  parsePolyglotString(badge.acquisitionRequirements)
                )}
              />
              <OverviewField.Item
                title={getPolyglotText(
                  '자격 증명',
                  'Certification-View-자격증명'
                )}
                contentHtml={replaceEnterWithBr(
                  parsePolyglotString(badge.qualification)
                )}
              />
            </OverviewField.List>
            {badge.additionalRequirementsNeeded && (
              <OverviewField.List icon>
                <OverviewField.Item
                  titleIcon="addinfo"
                  title={getPolyglotText(
                    '추가 발급 조건',
                    'Certification-View-추가발급'
                  )}
                  contentHtml={getPolyglotText(
                    '해당 Badge는 학습 이수 외에도 추가 미션이 있습니다.\n학습 이수 완료 후, 발급 요청하시면 담당자가 추가 미션에 대해 안내 드릴 예정입니다.',
                    'Certification-View-발급안내'
                  )}
                />
              </OverviewField.List>
            )}
            <OverviewField.List icon className="course-area">
              <OverviewField.Item
                titleIcon="list24"
                title={getPolyglotText(
                  'Learning Path',
                  'Certification-View-학습경로'
                )}
                content={<BadgeCardListContainer />}
              />
            </OverviewField.List>
            {badge.tags && (
              <BadgeTagView tags={parsePolyglotString(badge.tags)} />
            )}
          </>
        )}
      </div>
    </Segment>
  );
}
