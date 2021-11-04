import { onClickHotTopicCard } from 'hotTopic/event/hotTopicEvent';
import { HotTopicCardViewModel } from 'hotTopic/viewmodel/HotTopicViewModel';
import React from 'react';
import { Card, Icon, Label, Image } from 'semantic-ui-react';
import { LearningState } from 'shared/model';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  card: HotTopicCardViewModel;
}

export function HotTopicCardView({ card }: Props) {
  return (
    <>
      <Card
        className="card-item topic-list"
        onClick={() => onClickHotTopicCard(card.id)}
      >
        <div className="card-inner">
          <div className="thumbnail-area">
            <div className="thumb-img-area">
              <Image
                src={card.thumbnailImagePath}
                className="thumb-img"
                alt="썸네일 이미지"
              />
            </div>
            <div className="thumb-info bottom">
              <Label>
                <span>
                  <strong>??5개</strong> 강의
                </span>
              </Label>
            </div>
          </div>
          <div className="contents-area">
            <div className="contents-inner">
              <div className="topic-card-tit">
                <Label className="college-name">
                  <span>??collegeName</span>
                </Label>
                <div className="topic-card-title">{card.name}</div>
                <div className="tipic-card-txt">{card.simpleDescription}</div>
              </div>
              <div className="icon-area txticon-wrap">
                <Label>
                  <Icon className="custom-icon icon-user" />
                  <span>{card.studentCount}</span>
                </Label>
                <Label>
                  <Icon className="custom-icon icon-star" />
                  <span>{card.starCount}</span>
                </Label>
                <Label className="my-stat completed">
                  <span>
                    {card.learningState === LearningState.Progress && (
                      <PolyglotText
                        defaultString="학습중"
                        id="home-Inprogress-Card진행중"
                      />
                    )}
                    {card.learningState === LearningState.Passed && (
                      <PolyglotText
                        defaultString="학습 완료"
                        id="home-Inprogress-Card완료"
                      />
                    )}
                  </span>
                </Label>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
