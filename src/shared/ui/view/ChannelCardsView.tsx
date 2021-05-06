import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Loadingpanel, NoSuchContentPanel } from '../..';
import { Lecture } from '../../../lecture';
import CardView from '../../../lecture/shared/Lecture/ui/view/CardVIew';
import { SkProfileService } from '../../../profile/stores';
import { getChannelName } from '../../service/useCollege/useRequestCollege';
import { ChannelCards } from '../../viewmodel/ChannelCards';
import { Area } from 'tracker/model';

interface Props extends ChannelCards {
  isLoading: boolean;
}

interface CollegeParams {
  collegeId: string;
}

export function ChannelCardsView(props: Props) {
  const { collegeId } = useParams<CollegeParams>();
  const {
    isLoading,
    channelId,
    count,
    viewType,
    cardWithRelatedCountRoms,
  } = props;
  let path = `/lecture/college/${collegeId}/channel/${channelId}`;
  if (viewType === 'Recommend') {
    path = `/lecture/recommend/channel/${channelId}`;
  }
  return (
    <>
      <div className="section-head">
        <span className="channel">{getChannelName(channelId)}</span>
        {viewType === 'College' && <span>의 학습 과정 입니다.</span>}
        {viewType === 'Recommend' && (
          <span>
            채널에서 {SkProfileService.instance.profileMemberName}님께 추천하는
            과정입니다.{' '}
          </span>
        )}
        {count > 8 && (
          <div className="right">
            <Link to={path}>
              <Button icon className="right btn-blue">
                View all
                <Icon className="morelink" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      {isLoading ? (
        <Segment
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            height: 400,
            boxShadow: '0 0 0 0',
            border: 0,
          }}
        >
          <Loadingpanel loading={isLoading} />
        </Segment>
      ) : (
        (Array.isArray(cardWithRelatedCountRoms) && (
          <Lecture.Group type={Lecture.GroupType.Line}>
            {cardWithRelatedCountRoms.map(({ card, cardRelatedCount }) => {
              return (
                <li key={card.id}>
                  <div className="ui cards box-cards">
                    <CardView
                      cardId={card.id}
                      {...card}
                      {...cardRelatedCount}
                      dataArea={Area.MYPAGE_STAMP}
                    />
                  </div>
                </li>
              );
            })}
          </Lecture.Group>
        )) || <NoSuchContentPanel message="등록된 학습 과정이 없습니다." />
      )}
    </>
  );
}
