import React from 'react';
import { Link } from 'react-router-dom';
import { SkProfileService } from '../../../../profile/stores';
// import { getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';
import { RecommendCardRom } from '../../../model/RecommendCardRom';
import { getCheckableChannelsStore } from '../../../../shared/store/CheckableChannelsStore';
import CardView from '../../../shared/Lecture/ui/view/CardVIew';
import { find } from 'lodash';
import { NoSuchContentPanel } from 'shared';

export function RecommendCardRomView(props: RecommendCardRom) {
  const {
    channelId,
    cardCount,
    totalCardCount,
    cardWithRelatedCountRoms,
  } = props;
  const checkableChannels = getCheckableChannelsStore();

  const getChannelName = () => {
    const filterChannelName = find(checkableChannels, { id: channelId });

    return filterChannelName?.name;
  };

  const getCardCount = () => {
    if (totalCardCount !== undefined && totalCardCount >= 0) {
      return totalCardCount;
    }

    return cardCount;
  };

  return (
    <>
      <div className="section-head">
        <span className="channel">{getChannelName()}</span>
        {`채널에서 ${SkProfileService.instance.profileMemberName}님께 추천하는 과정입니다.`}
        <span className="channel">{`(${getCardCount()})`}</span>
        {Array.isArray(cardWithRelatedCountRoms) &&
          cardWithRelatedCountRoms.length > 0 && (
            <div className="right">
              <Link to={`/lecture/recommend/channel/${channelId}`}>
                <button className="ui icon button right btn-blue">
                  View all
                  <i aria-hidden="true" className="icon morelink" />
                </button>
              </Link>
            </div>
          )}
      </div>
      <div className="scrolling">
        <ul className="belt">
          {Array.isArray(cardWithRelatedCountRoms) &&
            (cardWithRelatedCountRoms.length ? (
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
              })
            ) : (
              <NoSuchContentPanel
                message={`${getChannelName()}채널에 해당하는 추천 학습과정이 없습니다.`}
              />
            ))}
        </ul>
      </div>
    </>
  );
}
