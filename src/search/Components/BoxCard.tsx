import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label, Icon, Rating, Card, Button } from 'semantic-ui-react';

import { useCard } from './SearchFilter';
// DUMMY

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
        <Label className="ribbon2">{/* Required */}핵인싸 과정</Label>
      </div>
      <div className="card-inner">
        {/*썸네일*/}
        <div className="thumbnail" />

        <div className="title-area">
          <Label color="green">{item.fields.college_name}</Label>
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
              <span>{item.fields.learning_time}</span>
            </Label>
          </div>
          <div className="li">
            <Label className="onlytext">
              <Icon className="complete" />
              <span>{item.fields.student_count}</span>
            </Label>
          </div>
        </div>
        <div className="foot-area">
          <div className="fixed-rating">
            {/*  */}
            <Rating
              defaultRating={item.fields.stamp_count}
              maxRating={5}
              size="small"
              disabled
              className="rating-num"
            />
          </div>
        </div>
      </div>
      <div className="hover-content">
        <div className="title-area">
          <div className="ui color green label">{item.fields.college_name}</div>
          <div className="header">{item.fields.card_name_uni}</div>
        </div>
        <p className="text-area">{item.fields.description}</p>
        <div className="btn-area">
          <Button icon className="icon-line">
            <Icon className="remove2 icon" />
          </Button>
          <Link
            to={path}
            className="ui icon button fix bg"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
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
