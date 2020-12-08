import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label, Icon, Rating, Card, Button } from 'semantic-ui-react';
import { SkProfileService } from '../../profile/stores';
import CategoryColorType from '../../shared/model/CategoryColorType';

import { useCard } from './SearchFilter';

function numberWithCommas(x: number | string | null | undefined) {
  let s = (x || 0).toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(s)) s = s.replace(pattern, '$1,$2');
  return s;
}

export function timeToHourMinuteFormat(x: number | string | null | undefined) {
  //
  const time = parseInt( (x||0).toString());
  const hour = Math.floor(time / 60) || 0;
  const minute = time % 60 || 0;

  if (hour < 1 && minute < 1) {
    return '00h 00m';
  }
  else if (hour < 1) {
    return `${minute}m`;
  }
  else if (minute < 1) {
    return `${hour}h`;
  }
  else {
    return `${hour}h ${minute}m`;
  }
}

function getColor(college_name: string) {
  let color = CategoryColorType.Default;

  switch (college_name) {
    case 'AI':
      color = CategoryColorType.AI;
      break;
    case 'DT':
      color = CategoryColorType.DT;
      break;
    case 'Global':
      color = CategoryColorType.Global;
      break;
    case 'Leadership':
      color = CategoryColorType.Leadership;
      break;
    case 'Management':
      color = CategoryColorType.Management;
      break;
    case 'SV':
      color = CategoryColorType.SV;
      break;
    case '행복':
      color = CategoryColorType.Happiness;
      break;
    case '반도체':
      color = CategoryColorType.SemicondDesign;
      break;
    case '혁신디자인':
      color = CategoryColorType.InnovationDesign;
      break;
    case '에너지솔루션':
      color = CategoryColorType.EnergySolution;
  }
  return color;
}

function Box({ item, index }: { item: any; index: number }) {
  const [hovered, setHovered] = useState<boolean>(false);

  const handleHovered = (hover: boolean) => {
    setHovered(hover);
  };
  const {
    service_type,
    service_id,
    college_id,
    cineroom_id,
    cube_id,
    course_plan_id,
    reqCom_id,
  } = item.fields;

  const path =
    service_type === 'CARD'
      ? `/lecture/cineroom/${cineroom_id}/college/${college_id}/cube/${cube_id}/lecture-card/${service_id}`
      : service_type === 'PROGRAM'
      ? `lecture/cineroom/${cineroom_id}/college/${college_id}/course-plan/${course_plan_id}/Program/${service_id}`
      : `lecture/cineroom/${cineroom_id}/college/${college_id}/course-plan/${course_plan_id}/Course/${service_id}`;

  return (
    <Card
      key={index}
      className={`card-h  ${hovered ? 'on' : ''}`}
      onMouseEnter={() => handleHovered(true)}
      onMouseLeave={() => handleHovered(false)}
    >
      {/*tag*/}
      <div className="card-ribbon-wrap">
        {reqCom_id !== undefined &&
          reqCom_id.indexOf !== undefined &&
          reqCom_id.indexOf(
            SkProfileService.instance.profileMemberCompanyCode
          ) > -1 && (
            <Label className="ribbon2">{/* Required */}핵인싸 과정</Label>
          )}
      </div>
      <div className="card-inner">
        {/*썸네일*/}
        <div className="thumbnail">
          <img
            alt="card-thumbnail"
            src={item.fields.icon_url}
            className="ui small image"
          />
        </div>

        <div className="title-area">
          <div className={`ui label ${getColor(item.fields.college_name)}`}>
            {item.fields.college_name}
          </div>
          <div className="header">{item.fields.card_name}</div>
        </div>
        <div className="icon-area">
          <div className="li">
            <Label className="bold onlytext">
              <Icon className="course" />
              <span>{item.fields.cube_type}</span>
            </Label>
          </div>
          <div className="li">
            <Label className="bold onlytext">
              <Icon className="time2" />
              <span>{timeToHourMinuteFormat(item.fields.learning_time)}</span>
            </Label>
          </div>
          <div className="li">
            <Label className="onlytext">
              <Icon className="complete" />
              <span>{numberWithCommas(item.fields.student_count)}</span>
            </Label>
          </div>
        </div>
        <div className="foot-area">
          <div className="fixed-rating">
            {/*  */}
            <Rating
              defaultRating={0}
              maxRating={5}
              rating={Math.round(item.fields.score / 100)}
              size="small"
              disabled
              className="rating-num"
            />
          </div>
        </div>
      </div>
      <div className="hover-content">
        <div className="title-area">
          <div
            className={`ui color label ${getColor(item.fields.college_name)}`}
          >
            {item.fields.college_name}
          </div>
          <div className="header">{item.fields.card_name_uni}</div>
        </div>
        <p className="text-area">{item.fields.description}</p>
        <div className="btn-area">
          {/* <Button icon className="icon-line">
            <Icon className="remove2 icon" />
          </Button> */}
          <Link
            to={path}
            className="ui icon button fix bg"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '13.75rem',
            }}
          >
            {/* View Details */} 상세보기
          </Link>
        </div>
      </div>
    </Card>
  );
}

const BoxCard: React.FC = () => {
  const card = useCard();

  return (
    <Card.Group className="box-cards">
      {card && card.map((item, index) => <Box item={item} index={index} />)}
    </Card.Group>
  );
};

export default BoxCard;
