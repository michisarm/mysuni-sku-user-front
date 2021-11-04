import classNames from 'classnames';
import { copyUrl } from 'hotTopic/event/hotTopicEvent';
import { likeHotTopic, unlikeHotTopic } from 'hotTopic/event/hotTopicLikeEvent';
import {
  HotTopicDetailViewModel,
  HotTopicLikeInfo,
} from 'hotTopic/viewmodel/HotTopicViewModel';
import React, { useMemo } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { dateTimeHelper } from 'shared';

interface Props {
  hotTopicDetail: HotTopicDetailViewModel;
  hotTopicLikeInfo?: HotTopicLikeInfo;
}

export function HotTopicTitleView({ hotTopicDetail, hotTopicLikeInfo }: Props) {
  const hourMinuteFormat = useMemo(
    () =>
      dateTimeHelper.timeToHourMinuteFormat(hotTopicDetail?.learningTime || 0),
    [hotTopicDetail?.learningTime]
  );

  return (
    <>
      <div className=" txt-box">
        <div className="page-tit">{hotTopicDetail.displayText}</div>
        <div className="sub-txt">{hotTopicDetail.description}</div>
      </div>
      <div className="icon-area icon-box">
        <div className="f-left">
          <Label className="onlytext">
            <Icon className="coreses" />
            <span>
              총 <strong>{hotTopicDetail.cards?.length || 0}개</strong> 학습카드
            </span>
          </Label>
          <Label className="onlytext">
            <Icon className="time2" />
            <span>{hourMinuteFormat}</span>
          </Label>
        </div>
        <div className="f-rgiht">
          {hotTopicLikeInfo && (
            <>
              <Label
                as="button"
                className={classNames('onlytext', { on: hotTopicLikeInfo.my })}
                onClick={hotTopicLikeInfo.my ? unlikeHotTopic : likeHotTopic}
              >
                <Icon className="like2" />
                <span>{hotTopicLikeInfo.count}</span>
              </Label>
            </>
          )}
          <Label
            as="button"
            className="onlytext"
            onClick={() => copyUrl(hotTopicDetail.id)}
          >
            <Icon className="share-comm line" />
            <span>공유하기</span>
          </Label>
        </div>
      </div>
    </>
  );
}
