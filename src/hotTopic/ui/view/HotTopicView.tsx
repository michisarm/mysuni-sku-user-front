import { onClickHotTopic } from 'hotTopic/event/hotTopicEvent';
import { HotTopicDetailViewModel } from 'hotTopic/viewmodel/HotTopicViewModel';
import React, { useMemo } from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import Image from 'shared/components/Image/Image';

interface Props {
  hotTopic: HotTopicDetailViewModel;
}

export function HotTopicView({ hotTopic }: Props) {
  const hourMinuteFormat = useMemo(
    () => dateTimeHelper.timeToHourMinuteFormat(hotTopic?.learningTime || 0),
    [hotTopic?.learningTime]
  );

  return (
    <>
      <Card className="topic-item" onClick={() => onClickHotTopic(hotTopic.id)}>
        <div className="thumb-img-area">
          <Image
            src={hotTopic.imageUrl}
            className="thumb-img"
            alt={hotTopic.displayText}
          />
        </div>
        <div className="card-inner">
          <div className="topic-tit">
            <span>{hotTopic.displayText}</span>
          </div>
          <div className="topic-info-wrap">
            <Label className="topic-info course">
              <Icon className="list" />
              <span
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    '총 <strong>{value}개</strong> 학습카드',
                    'hottopic-title-학습카드개수',
                    { value: hotTopic.cardIds.length + '' || '0' }
                  ),
                }}
              />
            </Label>
            <Label className="topic-info time">
              <span>{hourMinuteFormat}</span>
            </Label>
          </div>
        </div>
      </Card>
    </>
  );
}
