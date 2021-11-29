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
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

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
        <div
          className="sub-txt"
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{
            __html: hotTopicDetail.description,
          }}
        />
      </div>
      <div className="icon-area icon-box">
        <div className="f-left">
          <Label className="onlytext">
            <Icon className="coreses" />
            <span
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '총 <strong>{value}개</strong> 학습카드',
                  'hottopic-title-학습카드개수',
                  { value: hotTopicDetail.cards?.length + '' || '0' }
                ),
              }}
            />
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
            <span>
              <PolyglotText
                defaultString="공유하기"
                id="hottopic-title-공유하기"
              />
            </span>
          </Label>
        </div>
      </div>
    </>
  );
}
