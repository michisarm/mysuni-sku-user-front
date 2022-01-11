import React, { useEffect } from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { Loadingpanel } from '../../../../shared';
import {
  getCheckableChannelsStore,
  setCheckableChannelsStore,
  useCheckableChannelsStore,
} from '../../../../shared/store/CheckableChannelsStore';
import { CheckableChannel } from '../../../../shared/viewmodel/CheckableChannel';
import {
  findByRdoCache,
  findRecommendCardsByChannelId,
  findRecommendCardsCache,
} from '../../../detail/api/cardApi';
import { CardRdo } from '../../../detail/model/CardRdo';
import {
  setRecommendCardRoms,
  useRecommendCardRoms,
  getRecommendCardRoms,
} from '../../../detail/store/RecommendCardRomsStore';
import { RecommendCardRom } from '../../../model/RecommendCardRom';
import {
  getRecommendPage,
  setRecommendPage,
  useRecommendPage,
} from '../../store/RecommendPageStore';
import ChannelsContentWrapperView from '../view/ChannelsContentWrapperView';
import { RecommendCardRomView } from '../view/RecommendCardRomView';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import { getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';

const CHANNELS_SIZE = 5;
const CARDS_SIZE = 8;

function onSelectChannel(channel: CheckableChannel) {
  const checkableChannels = getCheckableChannelsStore();
  if (checkableChannels === undefined) {
    return;
  }
  setCheckableChannelsStore(
    checkableChannels.map((c) => {
      if (c.id === channel.id) {
        return { ...c, checked: !c.checked };
      }
      return c;
    })
  );
}

function onConfirmCallback() {
  const checkableChannels = getCheckableChannelsStore();
  if (checkableChannels === undefined) {
    return;
  }
  setCheckableChannelsStore(
    checkableChannels.map((c) => {
      return { ...c, checked: false };
    })
  );
}

async function requestFindRecommendCards() {
  const recommendPageViewModel = getRecommendPage();
  if (recommendPageViewModel === undefined) {
    return;
  }
  const { allChannelPage, allChannelSelected } = recommendPageViewModel;
  if (allChannelSelected === true) {
    const channelLimit = allChannelPage * CHANNELS_SIZE;

    setRecommendPage({ ...recommendPageViewModel, allChannelLoading: true });
    const recommendCardRoms = await findRecommendCardsCache(
      channelLimit,
      CARDS_SIZE
    );
    setRecommendCardRoms(recommendCardRoms);
    const nextRecommendPageViewModel = getRecommendPage();
    if (nextRecommendPageViewModel === undefined) {
      return;
    }
    setRecommendPage({
      ...nextRecommendPageViewModel,
      allChannelLoading: false,
    });
  } else {
    const checkableChannels = getCheckableChannelsStore();
    if (checkableChannels === undefined) {
      return;
    }

    const recommendCardRoms:
      | RecommendCardRom[]
      | undefined = getRecommendCardRoms();

    setRecommendPage({ ...recommendPageViewModel, allChannelLoading: true });

    const checkedChannels = checkableChannels.filter((c) => c.checked);
    let findRecommendCard: any = {};

    /* eslint-disable no-await-in-loop */
    for (const channel of checkedChannels) {
      if (
        recommendCardRoms &&
        !recommendCardRoms.some((cardRoms) => cardRoms.channelId === channel.id)
      ) {
        findRecommendCard = await findRecommendCardsByChannelId(channel.id);
      }
    }

    if (recommendCardRoms && findRecommendCard.channelId) {
      recommendCardRoms.push(findRecommendCard);
    }

    const nextRecommendCardRoms =
      recommendCardRoms
        ?.filter((cardRoms) =>
          checkedChannels.some((c) => c.id === cardRoms.channelId)
        )
        .sort((a, b) => {
          return (
            checkableChannels.findIndex(
              (channel) => channel.id === a.channelId
            ) -
            checkableChannels.findIndex((channel) => channel.id === b.channelId)
          );
        }) || [];

    setRecommendCardRoms(nextRecommendCardRoms);
    const nextRecommendPageViewModel = getRecommendPage();
    if (nextRecommendPageViewModel === undefined) {
      return;
    }
    setRecommendPage({
      ...nextRecommendPageViewModel,
      allChannelLoading: false,
    });
  }
}

async function listMoreRequestFindRecommendCards() {
  const nextRecommendPageViewModel = getRecommendPage();
  if (nextRecommendPageViewModel === undefined) {
    return;
  }
  setRecommendPage({
    ...nextRecommendPageViewModel,
    allChannelPage: nextRecommendPageViewModel.allChannelPage + 1,
  });
  await requestFindRecommendCards();
}

export default function RecommendContentBodyContainer() {
  useEffect(() => {
    requestFindRecommendCards();
  }, []);
  const channels = useCheckableChannelsStore();

  useEffect(() => {
    if (channels === undefined) {
      return;
    }
    const allChannelSelected =
      channels.every((c) => c.checked) || channels.every((c) => !c.checked);
    const allChannelTotalCount = channels.length;
    const next = getRecommendPage();
    if (next == undefined) {
      return;
    }
    setRecommendPage({ ...next, allChannelSelected, allChannelTotalCount });
    requestFindRecommendCards();
  }, [channels]);
  if (channels === undefined) {
    return null;
  }

  return (
    <ChannelsContentWrapperView
      channels={channels}
      onSelectChannel={onSelectChannel}
      onConfirmCallback={onConfirmCallback}
    >
      <AllChannelsContainerView />
    </ChannelsContentWrapperView>
  );
}

function AllChannelsContainerView() {
  const recommendCardRoms = useRecommendCardRoms();
  const recommendPageViewModel = useRecommendPage();
  if (recommendPageViewModel?.allChannelLoading) {
    return (
      <div className="recommend-area">
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
          <Loadingpanel loading={true} color="#FFFFFF" />
        </Segment>
      </div>
    );
  }

  return (
    <div className="recommend-area">
      {Array.isArray(recommendCardRoms) &&
        recommendCardRoms.map((recommendCardRom) => {
          return (
            <RecommendCardRomView
              key={recommendCardRom.channelId}
              {...recommendCardRom}
            />
          );
        })}
      <ListMoreView />
    </div>
  );
}

function ListMoreView() {
  const recommendPageViewModel = useRecommendPage();
  if (recommendPageViewModel === undefined) {
    return null;
  }
  const {
    allChannelPage,
    allChannelTotalCount,
    allChannelSelected,
    allChannelLoading,
  } = recommendPageViewModel;
  if (!allChannelSelected) {
    return null;
  }
  if ((allChannelPage - 1) * CHANNELS_SIZE >= allChannelTotalCount) {
    return null;
  }

  return (
    <div className="more-comments">
      <Button
        icon
        className="left moreview"
        disabled={allChannelLoading}
        onClick={listMoreRequestFindRecommendCards}
      >
        <Icon className="moreview" />
        list more
      </Button>
    </div>
  );
}
