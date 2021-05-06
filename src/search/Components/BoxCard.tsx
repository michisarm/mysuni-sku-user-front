import React from 'react';
import { Card } from 'semantic-ui-react';
import CardView from '../../lecture/shared/Lecture/ui/view/CardVIew';
import { Workspace } from '../../shared/api/Axios';
import { CardCategory } from '../../shared/model/CardCategory';
import CategoryColorType from '../../shared/model/CategoryColorType';
import { SearchCardCategory } from '../model/SearchCard';

import { useDisplayCard } from './SearchFilter';

const workspaces: { cineroomWorkspaces?: Workspace[] } =
  JSON.parse(localStorage.getItem('nara.workspaces') || '') || {};

export function timeToHourMinuteFormat(x: number | string | null | undefined) {
  //
  const time = parseInt((x || 0).toString());
  const hour = Math.floor(time / 60) || 0;
  const minute = time % 60 || 0;

  if (hour < 1 && minute < 1) {
    return '00h 00m';
  } else if (hour < 1) {
    return `${minute}m`;
  } else if (minute < 1) {
    return `${hour}h`;
  } else {
    return `${hour}h ${minute}m`;
  }
}

function getColor(college_id: string) {
  let color = CategoryColorType.Default;
  switch (college_id) {
    case 'CLG00001':
      color = CategoryColorType.AI;
      break;
    case 'CLG00002':
      color = CategoryColorType.DT;
      break;
    case 'CLG00006':
      color = CategoryColorType.Global;
      break;
    case 'CLG00007':
      color = CategoryColorType.Leadership;
      break;
    case 'CLG00008':
      color = CategoryColorType.Management;
      break;
    case 'CLG00004':
      color = CategoryColorType.SV;
      break;
    case 'CLG00003':
      color = CategoryColorType.Happiness;
      break;
    case 'CLG00019':
      color = CategoryColorType.SemicondDesign;
      break;
    case 'CLG00005':
      color = CategoryColorType.InnovationDesign;
      break;
    case 'CLG00020':
      color = CategoryColorType.BMDesign;
      break;
    case 'CLG0001c':
      color = CategoryColorType.EnergySolution;
  }
  return color;
}

const BoxCard: React.FC = () => {
  const card = useDisplayCard();

  return (
    <Card.Group className="box-cards">
      {card &&
        card.map(item => {
          const {
            id,
            name,
            categories,
            required_cinerooms,
            thumb_image_path,
            learning_time,
            stamp_count,
            additional_learning_time,
            type,
            simple_description,
            passed_student_count,
            student_count,
            star_count,
          } = item;
          const isRequired: boolean = required_cinerooms
            .split('|')
            .some(
              c =>
                Array.isArray(workspaces?.cineroomWorkspaces) &&
                workspaces.cineroomWorkspaces.some(d => d.id === c)
            );
          let mainCategory: CardCategory = {
            channelId: '',
            collegeId: '',
            mainCategory: true,
          };
          try {
            mainCategory = (JSON.parse(categories) as SearchCardCategory[])
              .map<CardCategory>(({ channelId, collegeId, mainCategory }) => ({
                channelId,
                collegeId,
                mainCategory: mainCategory === 1,
              }))
              .find(c => c.mainCategory === true) || {
              channelId: '',
              collegeId: '',
              mainCategory: true,
            };
          } catch {
            // console.log('Search Data Error:', item);
          }
          return (
            <CardView
              key={id}
              cardId={id}
              htmlName={name}
              name={name}
              starCount={parseInt(star_count)}
              stampCount={parseInt(stamp_count)}
              mainCategory={mainCategory}
              simpleDescription={simple_description}
              learningTime={parseInt(learning_time)}
              thumbImagePath={thumb_image_path}
              passedStudentCount={parseInt(passed_student_count)}
              type={type}
              isRequired={isRequired}
              capacity={parseInt(student_count)}
              studentCount={parseInt(student_count)}
              additionalLearningTime={parseInt(additional_learning_time)}
            />
          );
        })}
    </Card.Group>
  );
};

export default BoxCard;
