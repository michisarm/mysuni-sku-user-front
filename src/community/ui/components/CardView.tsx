import React, { useCallback, useMemo, useState } from 'react';
import { Card, Icon, Label, Rating } from 'semantic-ui-react';
import { Image } from '../components/Image';
import { timeToHourMinutePaddingFormat } from '../app.formatters';
import numeral from 'numeral';

interface CardViewProps {
  cardId: string;
  cardTitle: string; // 카드 이름
  htmlName?: string; // 카드 설명
  cubeIcon: string;
  cubeName: string;
  learningTime: number; // 아래 시간이랑 더한 값이 총 학습 시간
  additionalLearningTime: number;
  thumbImagePath: string;
  isRequired: boolean;
  stampCount: number;
  passedStudentCount: number;
  collegeColor: string;
  collegeName: string;
  starCount: number;
  simpleDescription: string; // 호버시 보여주는 간단한 설명
}

export default function CardView({
  cardId,
  cardTitle,
  htmlName,
  cubeIcon,
  cubeName,
  learningTime,
  additionalLearningTime,
  stampCount,
  passedStudentCount,
  isRequired,
  collegeColor,
  collegeName,
  starCount,
  thumbImagePath,
  simpleDescription,
}: CardViewProps) {
  const [hovered, setHovered] = useState(false);

  const parseLearningTimeToHourMinite = useMemo(
    () => timeToHourMinutePaddingFormat(learningTime + additionalLearningTime),
    [learningTime, additionalLearningTime]
  );

  const parsePassedStudentCount = useMemo(
    () => numeral(passedStudentCount).format('0,0'),
    [passedStudentCount]
  );

  const onHoverIn = useCallback(() => {
    setHovered(true);
  }, []);

  const onHoverOut = useCallback(() => {
    setHovered(false);
  }, []);

  const cardUrl = `${window.location.protocol}//${window.location.host}/suni-main/lecture/card/${cardId}/view`;
  return (
    <Card
      className={`card-h ${hovered && 'on'}`}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <div className="card-ribbon-wrap">
        {isRequired && <Label className="ribbon2">핵인싸과정</Label>}
      </div>
      <div className="card-inner">
        <div className="thumbnail">
          {thumbImagePath && (
            <Image alt="card-thumbnail" src={thumbImagePath} />
          )}
        </div>
        <div className="title-area">
          <Label className={collegeColor}>{collegeName}</Label>
          {htmlName !== undefined && (
            <div
              className="header"
              dangerouslySetInnerHTML={{ __html: htmlName }}
            />
          )}
          {htmlName === undefined && <div className="header">{cardTitle}</div>}
        </div>

        <div className="icon-area">
          <div className="li">
            <Label className="onlytext bold">
              <Icon className={cubeIcon} />
              <span>{cubeName}</span>
            </Label>
          </div>
          {(learningTime || stampCount) && (
            <div className="li">
              <Label className="onlytext bold">
                <Icon className="time2" />
                <span>{parseLearningTimeToHourMinite}</span>
              </Label>
              {stampCount > 0 && (
                <Label
                  className={`onlytext bold ${learningTime && 'card-stamp'}`}
                >
                  <Icon className="stamp" />
                  <span>{`Stamp x${stampCount}`}</span>
                </Label>
              )}
            </div>
          )}
          <div className="li">
            <Label className="onlytext">
              <Icon className="complete" />
              <span>{`이수 ${parsePassedStudentCount}명`}</span>
            </Label>
          </div>
        </div>
        <div className="foot-area">
          <div className="fixed-rating">
            <Rating
              className="rating-num"
              size="small"
              disabled
              rating={starCount}
              maxRating={5}
            />
          </div>
        </div>
      </div>
      <div className="hover-content">
        <div className="title-area">
          <Label className={collegeColor}>{collegeName}</Label>
        </div>
        <p
          className="text-area"
          dangerouslySetInnerHTML={{ __html: simpleDescription }}
        />
        <div className="btn-area">
          <a href={cardUrl} target="_blank" rel="noreferrer">
            <button className="ui button fix bg" style={{ width: '13.5rem' }}>
              상세보기
            </button>
          </a>
        </div>
      </div>
    </Card>
  );
}
