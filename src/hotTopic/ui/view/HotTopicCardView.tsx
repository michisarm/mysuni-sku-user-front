import { onClickHotTopicCard } from 'hotTopic/event/hotTopicEvent';
import { HotTopicCardViewModel } from 'hotTopic/viewmodel/HotTopicViewModel';
import React, { useMemo } from 'react';
import { Card, Icon, Label, Image } from 'semantic-ui-react';
import { LearningState } from 'shared/model';
import { getCollgeName } from 'shared/service/useCollege/useRequestCollege';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  card: HotTopicCardViewModel;
}

export function HotTopicCardView({ card }: Props) {
  //
  const passedStudentCount = useMemo(() => {
    if (card.passedStudentCount >= 10000) {
      const tenthousand = Math.floor(card.passedStudentCount / 10000);
      const textTenthousand = getPolyglotText('{value}만', 'hottopic-card-만', {
        value: tenthousand + '',
      });
      if (card.passedStudentCount / 10000 === tenthousand) {
        return textTenthousand;
      }
      return textTenthousand + '+';
    }
    return card.passedStudentCount + '';
  }, [card.passedStudentCount]);

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
                alt={card.name}
              />
            </div>
            <div className="thumb-info bottom">
              <Label>
                <span
                  dangerouslySetInnerHTML={{
                    __html: getPolyglotText(
                      '<strong>{value}개</strong> 과정',
                      'hottopic-card-과정개수',
                      { value: '??5' }
                    ),
                  }}
                />
              </Label>
            </div>
          </div>
          <div className="contents-area">
            <div className="contents-inner">
              <div className="topic-card-tit">
                <Label className="college-name">
                  <span>{getCollgeName(card.mainCollegeId)}</span>
                </Label>
                <div className="topic-card-title">{card.name}</div>
                <div className="tipic-card-txt">{card.simpleDescription}</div>
              </div>
              <div className="icon-area txticon-wrap">
                <Label>
                  <Icon className="custom-icon icon-user" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: passedStudentCount,
                    }}
                  />
                </Label>
                <Label>
                  <Icon className="custom-icon icon-star" />
                  <span>{card.starCount || '-'}</span>
                </Label>
                {card.learningState === LearningState.Progress && (
                  <Label className="my-stat learning">
                    <span>
                      <PolyglotText
                        defaultString="학습중"
                        id="home-Inprogress-Card진행중"
                      />
                    </span>
                  </Label>
                )}
                {card.learningState === LearningState.Passed && (
                  <Label className="my-stat completed">
                    <span>
                      <PolyglotText
                        defaultString="학습 완료"
                        id="home-Inprogress-Card완료"
                      />
                    </span>
                  </Label>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
