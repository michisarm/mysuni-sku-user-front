import React from 'react';
import {
  clearFindRecommendCards,
  findRecommendCardsCache,
} from '../../../detail/api/cardApi';
import { setRecommendCardRoms } from '../../../detail/store/RecommendCardRomsStore';
import {
  getRecommendPage,
  setRecommendPage,
  useRecommendPage,
} from '../../store/RecommendPageStore';
import SeeMoreButtonView from '../view/SeeMoreButtonView';

const CHANNELS_SIZE = 5;
const CARDS_SIZE = 8;

async function requestFindRecommendCards() {
  const recommendPageViewModel = getRecommendPage();
  if (recommendPageViewModel === undefined) {
    return;
  }
  const { allChannelPage } = recommendPageViewModel;
  const channelLimit = allChannelPage * CHANNELS_SIZE;

  setRecommendPage({ ...recommendPageViewModel, allChannelLoading: true });
  const recommendCardRoms = await findRecommendCardsCache(
    channelLimit,
    CARDS_SIZE
  );
  setRecommendCardRoms(recommendCardRoms);
  setRecommendPage({
    ...recommendPageViewModel,
    allChannelPage: allChannelPage + 1,
    allChannelLoading: false,
  });
}

export default function RecommendContentBodyContainer() {
  return (
    <>
      <ListMoreView />
    </>
  );
}

function ChannelsContainerView() {}

function ListMoreView() {
  const recommendPageViewModel = useRecommendPage();
  if (recommendPageViewModel === undefined) {
    return null;
  }
  const {
    allChannelPage,
    allChannelTotalCount,
    allChannelSelected,
  } = recommendPageViewModel;
  if (!allChannelSelected) {
    return null;
  }
  if (allChannelPage * CHANNELS_SIZE >= allChannelTotalCount) {
    return null;
  }

  return <SeeMoreButtonView onClick={requestFindRecommendCards} />;
}
