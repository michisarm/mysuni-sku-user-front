import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import { Lecture } from 'lecture';
import { ContentWrapper } from '../MyLearningContentElementsView';
import ReactGA from 'react-ga';
import {
  findRequiredLearning,
  findCardFromCardBundle,
} from '../../../../lecture/detail/api/cardApi';
import CardGroup, {
  GroupType,
} from '../../../../lecture/shared/Lecture/sub/CardGroup';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  CardProps,
  LectureCardView,
  parseUserLectureCards,
} from '@sku/skuniv-ui-lecture-card';
import { parseLanguage } from '../../../../shared/viewmodel/PolyglotString';
import { SkProfileService } from '../../../../profile/stores';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';

interface Props extends RouteComponentProps {
  profileMemberName?: string;
}

const RQDLearning: React.FC<Props> = function RQDLearning({ history }) {
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const [title] = useState(
    getPolyglotText('Deep Change를 위한 권장과정', 'home-DeepChange-Title')
  );

  const fetchCardList = async () => {
    const userLanguage = parseLanguage(
      SkProfileService.instance.skProfile.language
    );
    const cardIds = await findRequiredLearning();

    if (cardIds) {
      const cardList = await findCardFromCardBundle(cardIds, 8, false);

      if (cardList !== undefined) {
        setCardList(parseUserLectureCards(cardList, userLanguage));
      }
    }
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  const onViewAll = () => {
    window.sessionStorage.setItem('from_main', 'TRUE');

    history.push(`/my-training/learning/Required/pages/1`);

    // react-ga event
    ReactGA.event({
      category: '권장 과정',
      action: 'Click',
      label: '권장 과정 전체보기',
    });
  };

  if (cardList.length === 0) {
    return null;
  }

  return (
    <ContentWrapper dataArea={Area.MAIN_REQUIRED}>
      <div className="section-head">
        <strong>{title}</strong>
        <div className="right">
          <Button icon className="right btn-blue" onClick={onViewAll}>
            View all <Icon className="morelink" />
          </Button>
        </div>
      </div>
      <Lecture.Group type={Lecture.GroupType.Line} dataActionName={title}>
        {cardList.map((item, i) => {
          return (
            <li key={i}>
              <CardGroup type={GroupType.Box}>
                <LectureCardView
                  {...item}
                  useBookMark={true} // bookMark 기능을 사용하면 true, 사용하지 않으면 false
                  dataArea={Area.MAIN_REQUIRED}
                />
              </CardGroup>
            </li>
          );
        })}
      </Lecture.Group>
    </ContentWrapper>
  );
};

export default withRouter(RQDLearning);
