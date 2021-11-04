import { onClickHotTopic } from 'hotTopic/event/hotTopicEvent';
import { HotTopicDetailViewModel } from 'hotTopic/viewmodel/HotTopicViewModel';
import React, { useMemo } from 'react';
import { Card, Icon, Label, Image } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';

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
            alt="썸네일 이미지"
          />
        </div>
        <div className="card-inner">
          <div className="topic-tit">
            <span>{hotTopic.displayText}</span>
          </div>
          <div className="topic-info-wrap">
            <Label className="topic-info course">
              <Icon className="list" />
              <span>
                총 <strong>{hotTopic.cardIds.length}개</strong> 학습카드
              </span>
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
