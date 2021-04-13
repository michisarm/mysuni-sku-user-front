import React from 'react';
import { Link } from 'react-router-dom';
import { SkProfileService } from '../../../../profile/stores';
import { getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';
import { RecommendCardRom } from '../../../model/RecommendCardRom';
import CardView from '../../../shared/Lecture/ui/view/CardVIew';

export function RecommendCardRomView(props: RecommendCardRom) {
  const { channelId, cardCount, cardWithRelatedCountRoms } = props;
  return (
    <>
      <div className="section-head">
        <span className="channel">{getChannelName(channelId)}</span>
        {`채널에서 ${SkProfileService.instance.profileMemberName}님께 추천하는 과정입니다.`}
        <span className="channel">{`(${cardCount})`}</span>
        <div className="right">
          <Link to={`/lecture/recommend/channel/${channelId}`}>
            <button className="ui icon button right btn-blue">
              View all
              <i aria-hidden="true" className="icon morelink" />
            </button>
          </Link>
        </div>
      </div>
      <div className="scrolling">
        <ul className="belt">
          {Array.isArray(cardWithRelatedCountRoms) &&
            cardWithRelatedCountRoms.map(({ card, cardRelatedCount }) => {
              return (
                <li>
                  <div className="ui cards box-cards">
                    <CardView
                      key={card.id}
                      cardId={card.id}
                      {...card}
                      {...cardRelatedCount}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
